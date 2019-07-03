---
layout: post
title: Das Freifunknetz aus dem Heimnetz erreichbar machen
language: de
---

Eigendlich habe ich diesen Blogpost nur [wegen dieser einen Zeile](#heimnetz-zu-freifunk-durchlassen) geschrieben:

    iptables --table nat --append POSTROUTING --out-interface br-dhcp -j MASQUERADE

Im Folgenden erkläre ich die Einstellungen, die ich für mein Heimnetz und den Server im Freifunk-Netz getroffen habe.

## Context

Zu Hause habe ich einen Speedport und einen Freifunk-Router stehen.
Diese sind mit LAN verbunden.
Das ist hier dargestellt:

![aufbau.svg]({% include images %}/aufbau.svg)

Der Speedport ist mit dem Internet verbunden.
Der Freifunkrouter ist mit dem WAN-Anschluss an einem LAN-Anschluss des Speedports angeschlossen.


## Problem

Nun möchte ich Freifunk aus dem Heimnetz erreichbar machen und einen Server im Freifunk-Netz haben.

## Lösung

Dazu möchte ich

1. [Den Speedport weiter mit der Web-Adresse speedport.ip erreichen können.](#internet-durch-freifunk-router-leiten)
2. [Einstellen, dass ich vom LAN aus das Freifunk-Netz erreichen kann.](#heimnetz-zu-freifunk-durchlassen)
3. [Einen Server direkt im Freifunknetz und auch aus dem Internet erreichbar machen.](#server-einbinden)

## Internet durch Freifunk-Router leiten

### Kontext

Momentan, wenn ich meinen Laptop angeschlossen habe, fließt der Internetverkehr so:

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

Unter "Heimnetzwerk" → "Heimnetzwerk (LAN)" → "DHCP" erwarte ich Einstellungen, die ich nicht finde:

![speedport-dhcp.png]({% include images %}/speedport-dhcp.png)

Unter "Heimnetzwerk" → "Heimnetzwerk (LAN)" → "Name und Adresse des Routers" finde ich die IP-Adresse des Speedport-Routers:

![speedport-ip.png]({% include images %}/speedport-ip.png)

Diese ist bei mit `192.168.2.1`.
Die IP-Adresse brauchen wir im folgenden.

### Lösung

Damit ich den Rechnern im LAN nun mitteile, den TP-Link zu benutzen, treffe ich
erst die [Einstellungen im TP-Link](#tp-link-einstellungen) (Freifunk-Router), dass er der neue Internetzugang ist.
Danach erst [schalte ich DHCP beim Speedport](#speedport-einstellen) aus.
Durch diese Reihenfolge erhalte ich immer eine valide IP und Internet, auch wenn ich die Einstellungen mal unterbreche.

#### TP-Link Einstellungen

Über "Network" → "Interfaces" erreiche ich die Einstellungen des WAN-Interfaces auf dem TP-Link:

![wan.png]({% include images %}/wan.png)

Hier ist meine Konfiguration des WAN-Interfaces im TP-Link:

![wan-2.png]({% include images %}/wan-2.png)  
Alle IP-Adressen im Heimnetz fangen bei mir mit "192.168.2" an.
Das hängt von den Einstellungen im Speedport ab.

![wan-3.png]({% include images %}/wan-3.png)  
![wan-4.png]({% include images %}/wan-4.png)  
![wan-5.png]({% include images %}/wan-5.png)  
![wan-6.png]({% include images %}/wan-6.png)  
![wan-7.png]({% include images %}/wan-7.png)  
![wan-8.png]({% include images %}/wan-8.png)

##### LAN-Ports Einstellen

Unter "Network" → "Interfaces" haben wir gefunden ([siehe oben](#tp-link-einstellungen)),
in welchem "LAN-Netz" sich der WAN-Anschluss befindet.
(Es gibt mehrere Letze, die am LAN anliegen können.
 Andere Leute stellen vielleicht ein, dass bei einem LAN-Port das Heimnetz ist und auf anderen Freifunk oder das Meshnetz liegt.)
Jetzt ist die Frage: welches V-LAN benutzt der WAN-Anschluss:

![wan-eth.png]({% include images %}/wan-eth.png)

bei mir benutzt der WAN-Anschluss den Virtuellen Anschluss `eth0.6`, also das V-LAN Nummer 6.
(eth0 heißt Ethernet-Gerät 0, man zählt von 0)

Jetzt stelle ich noch ein, dass der WAN-Anschluss und die anderen LAN-Anschlüsse alle das Heimnetz verbreiten.
Dazu gehe ich zu "Network" → "Switch".

![switch.png]({% include images %}/switch.png)

Ich habe VLAN 6 eingestellt, weil ich oben herausgefunden habe, dass WAN das VLAN 6 benutzt.
Wichtig ist, CPU tagged und Port 1 untagged.
Die anderen sind die verbleibenden LAN-Anschlüsse, mit denen man auch anderes machen kann.
Wenn sie wie hier auf untagged gestellt werden, gelten sie als Heimnetz.

##### Speichern und Neustarten

Speichern reicht manchmal. Neustarten ist auch gut.

##### Testen

- Erreicht der Router das Internet?
  Dazu kann ich unter "Network" → "Diagnostics" einen Ping ausführen.
- Kann ich den Router erreichen?
  Dazu kann ich ihn anpingen.
- Ist das Heimnetz nicht von Freifunk aus erreichbar?
  Dazu kann ich mit mit Freifunk verbinden und versuchen, den Speedport anzupingen.

#### Speedport einstellen

Jetzt können wir die DHCP-Funktion des Speedport deaktivieren.

![speedport.png]({% include images %}/speedport.png)

##### Motivation

Wenn wir DHCP beim Speedport weiter aktiv lassen, rivalisieren der TP-Link und der Speedport bei der IP-Adressvergabe.
Der Speedport ist vielleicht schneller und dann kommen wir nicht ins Freifunknetz.

### Neue Hostnamen

Wenn man den Speedport unter seiner Adresse `speedport.ip` erreichen möchte,
muss der Freifunk-Router diese kennen.

Dazu kann ich unter "Network" → "Hostnames" die Hostnamen hinzufügen, unter Angabe der IP-Adresse.

![domains.png]({% include images %}/domains.png)

## Heimnetz zu Freifunk Durchlassen

Damit ich das Freifunknetz aus meinem Heimnetz erreichen kann,
füge ich eine Firewall-Regel hinzu:

    iptables --table nat --append POSTROUTING --out-interface br-dhcp -j MASQUERADE

Unter "Network" → "Firewall" → "Custom Rules" habe ich diese Zeile eingefügt:

![firewall.png]({% include images %}/firewall.png)

([Quelle](https://www.howtoforge.com/nat_iptables))

## Server Einbinden

Ich habe nun einen Heimrechner, der ein Server ist und sich im Heimnetz und im Freifunk-Netz befindet:

![aufbau-server.svg]({% include images %}/aufbau-server.svg)

### Ziele

Ich möchte folgendes erreichen:

1. [Der Server soll aus dem Internet erreichbar sein.](#port-forwarding)
2. [Wenn ich zu Hause oder im Freifunk-Netz bin, will ich nicht den Umweg über das Internet gehen, um den Server zu erreichen.](#hostnamen-eintragen)

### Hostnamen Eintragen

Um den Server lokal erreichbar zu machen, könnenzusätzliche Hostnamen unter "Network" → "Hostnames" hinzugefügt werden.
In meinem Falle handelt es sich um die Namen "quelltext.eu", "www.quelltext.eu", "gitlab.quelltext.eu" und "owncloud.quelltext.eu".
Diese füge ich mit der Freifunk-IP hinzu, weil diese Namensauflösung für alle Interfaces gilt und ich den Server auch aus dem Freifunk-Netz erreichen möchte.

![firewall.png]({% include images %}/firewall.png)

#### Testen

Nach dem Speichern und Neustarten, kann ich folgende Tests durchführen:

- Ist das Heimnetz nicht von Freifunk aus erreichbar?
  Dazu kann ich mit Freifunk verbinden und versuchen, den Speedport anzupingen.
- Ist das Freifunknetz vom Heimnetz aus erreichbar?
  Dazu kann ich mit dem Heimnetz verbinden und versuchen, etwas anderes als den TP-Link aus dem Freifunknetz anzupingen.


### Port-Forwarding

Um den Server aus dem Internet erreichbar zu machen, muss ich Ports freigeben.
Außerdem kann ich mit noch kostenlos eine Domäne holen oder was bezahlen.
Das geht alles im Speedport.
Der Speedport kann das Freifunk-Netz nicht erreichen also muss dort alles mit der Heimnetz-Adresse gemacht werden.


## Zusammenfassung

In diesem Blogpost habe ich gezeigt, wie man Freifunk vom Heimnetz aus erreichbar macht und einen Server in beide Netze einbindet.

## Diskussion

**Wie kann ich erreichen, dass bei einem Mesh mit mehreren Gateways mein quelltext.eu immernoch über das Freifunknetz aufgelöst wird?**

[Antwort von Carsten][ffp-carsten-1]:

> Es gibt noch ein olsr-DNS mit dem wir uns aber noch nicht auskennen. Hier wäre auf jeden Fall der Ansatz.

**Kann ich immer den Server über die Domain lokal auflösen?**

[Antwort von Carsten][ffp-carsten-1]:

> Zu der Erreichbarkeit... Ist nicht ganz so einfach. Wenn das Endgerät die öffentliche IP bereits gecachet hat wird es nicht versuchen über das FF-Netz eine Verbindung hinzubekommen. Sven hatte da mal eine harte Lösung für das Setup auf dem Winzerberg gefunden gehabt, welche er in den iptables eingerichtet hatte.






[ffp-carsten-1]: https://lists.freifunk-potsdam.de/pipermail/users/2016-October/003477.html
