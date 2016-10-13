---
layout: post
title: Das Freifunknetz aus dem Heimnetz erreichbar machen
language: de
---
{% assign images = site.baseurl | append:"/images" | append:page.url %}

Eigendlich habe ich diesen Blogpost nur [wegen dieser einen Zeile](#heimnetz-zu-freifunk-durchlassen) geschrieben:

    iptables --table nat --append POSTROUTING --out-interface br-dhcp -j MASQUERADE

Im Folgenden erkläre ich die Einstellungen, die ich für mein Heimnetz und den Server im Freifunk-Netz getroffen habe.

## Context

Zuhause habe ich einen Speedport und einen Freifunk-Router stehen.
Diese sind mit LAN verbunden.
Das ist hier dargestellt:

![aufbau.svg]({{ images }}/aufbau.svg)

Der Speedport ist mit dem Internet verbunden.
Der Freifunkrouter ist mit dem WAN-Anschluss an einem LAN-Anschluss des Speedport angeschlossen.


## Problem

Nun möchte ich Freifunk aus dem Heimnetz erreichbar machen und einen Server im Freifunk-Netz haben.

## Lösung

Dazu möchte ich

1. [Den Speedport weiter mit der Web-Adresse speedport.ip erreichen können.](#internet-durch-freifunk-router-leiten)
2. [Einstellen, dass ich vom LAN aus das Freifunk-Netz erreichen kann.](#heimnetz-zu-freifunk-durchlassen)
3. Einen Server direkt im Freifunknetz und auch aus dem Internet erreichbar machen.

## Internet durch Freifunk-Router leiten

### Context

Momentan, wenn ich das angeschlossen habe, fließt der Internetverkehr so:

    Laptop ----> Speedport ----> Internet

### Ziel

Jetzt möchte ich einstellen, dass der Verkehr so läuft:

    Laptop ----> TP-Link ----> Speedport ----> Internet
    Laptop ----> TP-Link ----> Freifunk

### Problem

Nun ist es aber so: Immer, wenn ich den Laptop zum Heimnetz verbinde,
sagt der Speedport meinem Laptop Bescheid, welche IP er bekommen soll und
wie er das Internet erreichen kann.
Das geschieht durch das [dynamic host configuration protocol](https://de.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol), kurz DHCP.
Nun kann aber der Speedport nicht Bescheid sagen, dass ich den TP-Link auch benutzen möchte.

Unter "Heimnetzwerk" → "Heimnetzwerk (LAN)" → "DHCP" erwarte ich Einstellungen, die ich nciht finde:

![speedport-dhcp.png]({{ images }}/speedport-dhcp.png)

Unter "Heimnetzwerk" → "Heimnetzwerk (LAN)" → "Name und Adresse des Routers" finde ich die IP-Adresse des Speedport-Routers:

![speedport-ip.png]({{ images }}/speedport-ip.png)

Diese ist bei mit `192.168.2.1`.
Die IP-Adresse brauchen wir im folgenden.

### Lösung

Damit ich den Rechnern im LAN nun mitteile, den TP-Link zu benutzen, treffe ich
erst die [Einstellungen im TP-Link](#tp-link-einstellungen) (Freifunk-Router), dass er der neue Internetzugang ist.
Danach erst [schalte ich DHCP beim Speedport](#speedport-einstellen) aus.
Durch diese Reihenfolge erhalte ich immer eine valide IP und Internet, auch wenn ich die Einstellungen mal unterbreche.

#### TP-Link Einstellungen

Über "Network" → "Interfaces" erreiche ich die Einstellungen des WAN-Interfaces auf dem TP-Link:

![wan.png]({{ images }}/wan.png)

Hier ist meine Konfiguration des WAN-Interfaces im TP-Link:

![wan-1.png]({{ images }}/wan-1.png)
Alle IP-Adressen im Heimnetz fangen bei mir mit "192.168.2" an.
Das hängt von den Einstellungen im Speedport ab.
![wan-2.png]({{ images }}/wan-2.png)
![wan-3.png]({{ images }}/wan-3.png)
![wan-4.png]({{ images }}/wan-4.png)
![wan-5.png]({{ images }}/wan-5.png)
![wan-6.png]({{ images }}/wan-6.png)
![wan-7.png]({{ images }}/wan-7.png)
![wan-8.png]({{ images }}/wan-8.png)

##### LAN-Ports Einstellen

Unter "Network" → "Interfaces" haben wir gefunden ([siehe oben](#tp-link-einstellungen)),
in welchem "LAN-Netz" sich der WAN-Anschluss befindet.
Man kann ja auch einstellen, dass bei einem LAN-Port das Heimnetz ist und auf anderen Freifunk oder das Meshnetz liegt.
Jetzt ist die Frage: welches V-LAN benutzt der WAN-Anschluss:

![wan-eth.png]({{ images }}/wan-eth.png)

bei mir benutzt der WAN-Anschluss den Virtuellen Anschluss `eth0.6`, also das V-LAN Nummer 6.
(eth0 heißt Ethernet-Gerät 0, man zählt von 0)

Jetzt stelle ich noch ein, dass der WAN-Anschluss und die anderen LAN-Anschlüsse alle das Heimnetz verbreiten.
Dazu gehe ich zu "Network" → "Switch".

![switch.png]({{ images }}/switch.png)

Ich habe bei mit VLAN 6 eingestellt, weil ich das oben herausgefunden habe.
Wichtig ist, CPU tagged und Port 1 untagged.
Die anderen sind die verbleibenden LAN-Anschlüsse, mit denen man auch anderes machen kann.
Wenn sie wie hier auf untagged gestellt werden, gelten sie als Heimnetz.

##### Speichern und Neustarten

Speichern reicht manchmal. Neustarten ist auch gut.

##### Testen

- Erreicht der Router das Internet?
  Dazu kann ich unter "Network" → "Diagnostics" einen Ping ausführen.
- Kann ich den Router erreichen? Dazu kann ich ihn anpingen.

#### Speedport einstellen

Jetzt können wir die DHCP-Funktion des Speedport deaktivieren.

![speedport.png]({{ images }}/speedport.png)

### Neue Hostnamen

Wenn man den Speedport unter seiner Adresse `speedport.ip` erreichen möchte,
muss der Freifunk-Router diese kennen.

Dazu kann ich unter "Network" → "Hostnames" die Hostnamen hinzufügen, unter Angabe der IP-Adresse.

![domains.png]({{ images }}/domains.png)

## Heimnetz zu Freifunk Durchlassen

Damit ich das Freifunknetz aus meinem Heimnetz erreichen kann,
füge ich eine Firewall-Regel hinzu:

    iptables --table nat --append POSTROUTING --out-interface br-dhcp -j MASQUERADE

Unter "Network" → "Firewall" → "Custom Rules" habe ich diese Zeile eingefügt:

![firewall.png]({{ images }}/firewall.png)





