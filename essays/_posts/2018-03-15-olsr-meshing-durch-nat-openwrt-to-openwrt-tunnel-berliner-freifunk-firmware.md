---
layout: post
title: OLSR Meshing durch ein NAT-Gateway mit der Berliner Freifunk-Firmware
language: de
---

Die [Berliner Freifunk-Firmware][firmware] basiert auf OpenWRT/LEDE.
Es gibt einen [Blog-Post über die Performance von Tunneling-Protokollen][perf], 
der verschiedene Methoden vorstellt, einen Tunnel zwischen OpenWRT-Instanzen aufzubauen.
Hier möchte ich zeigen, wie ich es geschafft habe, durch ein NAT ein Meshing mit OLSR herzustellen.

<!-- more -->

Hardware-Setup
--------------

Wir haben die Router so zusammengestöpselt:

    OpenWRT-1 → NAT → OpenWRT-2

OpenWRT-1 kann den Router OpenWRT-2 durch ein Gateway erreichen, das NAT macht.
OpenWRT-2 kann den Router OpenWRT-1 nicht selbst erreichen.

IP-Verbindungen von OpenWRT-1 nach OpenWRT-2 würden diesen Weg gehen:

    OpenWRT-1 ⇄ LAN (172.16.0.X) ⇄ Fritzbox → NAT → LAN (192.168.0.X) ⇄ Internet-Gateway ⇄ LAN (192.168.0.X) ⇄ OpenWRT-2

Beispiel:
Also kann der OpenWRT-1 eine Verbindung zu OpenWRT-2 aufbauen, indem er sich mit 192.168.0.10 verbindet.
OpenWRT-2 sieht, dass diese Verbindung nicht von 172.16.0.3 kommt sondern von 192.168.0.2, der Fritzbox.

Tunnel durch NAT
----------------

Man kann durch dieses NAT nicht meshen, weil

- OLSR von der einen Seite nicht durch kommt.
- Weil IP-Pakete von der einen Seite nicht durch das NAT kommen.

Die Idee ist, hier einen Tunnel aufzubauen.
Dazu bietet die vorhandene Firmware die Möglichkeit,
einen unsicheren OpenVPN-Tunnel herzustellen.

Hier die Kommandos für die Router aus [dem Blog-Post][perf]:

- OpenWRT-1 verbindet sich als Client:
  ```
  openvpn --dev tun --remote <VM-IP> --proto udp --mssfix 1472 --comp-lzo no --ifconfig 10.5.5.1 10.5.5.2
  ```
- OpenWRT-2 erstellt einen Server:
  ```
  openvpn --dev tun --proto udp --mssfix 1472 --comp-lzo no --fast-io --ifconfig 10.5.5.2 10.5.5.1
  ```

Diese Kommandos können mit Services→OpenVPN nachgebildet werden, siehe [Zusatz] oder in System→Startup mit einem `&` dahinter (Start im Hintergrund) in das das Feld "Local Startup" kopiert werden.
In beiden Fällen können die Verbindungen beim Start hergestellt werden.

Dann können die beiden sich einander anpingen.

- OpenWRT-1:
  ```
  ping 10.5.5.2
  ```
- OpenWRT-2:
  ```
  ping 10.5.5.1
  ```

Die IP-Adressen 10.5.5.2 und 10.5.5.1 sind außerhalb des IP-Adressbereiches 10.22.0.0/16, der
für das Meshing der Freifunk-Communty im Potsdam genutzt wird.
Ich habe versucht, über IP-Adressen aus diesem Bereich einen Ping durchzuführen, der mir nicht gelungen ist.

Tunnel in der Weboberfläche Anzeigen
------------------------------------

Der Tunnel erstellt ein Gerät namens `tun0`.
Das sollte mit dem Befehl `ip addr` sichtbar werden.
Um dieses über Luci, die Router-Weboberfläche zu konfigurieren, muss dieser erstmal als Gerät sichtbar gemacht werden.

Dazu editiere ich die Luci-Einstellungen für das Netzwerk: `vi /overlay/upper/etc/config/network` bei beiden Routern. `i` zum Einfügen. 

```
config interface 'tunnelmesh'
        option ifname 'tun0'
        option proto 'none'
```

`Escape` und dann `:wq` zum Schreiben und Schließen.

Nun taucht unter Network→Interfaces das Gerät "tunnelmesh" auf.
Dort auf "Edit" klicken und unter "Firewall Settings" die Zone "Freifunk" auswählen.
Speichern und Anwenden.

Mesh über den Tunnel
--------------------

Nun kann ich OLSR einstellen, über den Tunnel zu meshen.
Unter Services→OLSR IPv4 kann ich auf `Add` ein neues Interface hinzufügen.
Bei beiden Routern sind die Einstellungen fast gleich:

- OpenWRT-1 (10.5.5.1)
  - General Settings
    - Network: tunnelmesh
    - Mode: mesh
  - IP Addresses
    - IPv4 Broadcast: 10.5.5.**2**
    - IPv4 Source: 10.5.5.**1**
- OpenWRT-2 (10.5.5.2)
  - General Settings
    - Network: tunnelmesh
    - Mode: mesh
  - IP Addresses
    - IPv4 Broadcast: 10.5.5.**1**
    - IPv4 Source: 10.5.5.**2**

Speichern und Anwenden.

Über Status→OLSR→Neighbors sollte jetzt ein neuer Nachbar hinzugekommen sein.
Die beiden Router sehen sich.


Missglückte Versuche
--------------------

Wie oben beschrieben habe ich noch anderes ausprobiert.

Der [Blog-Post][perf] beinhaltet mehrere Techniken:

- IPIP-Tunneling ist mir nicht durch das NAT gelungen und auch nicht mit einer
  Freifunk-Mesh-Adresse aus 10.22.0.0/16 über den bestehenden Tunnel.
- GRE ist nicht gestartet, weil das device nicht eingerichtet werden konnte.
- Der open beschriebene Tunnel ist mit einer Adresse aus 10.22.0.0/16 aufgebaut worden
  aber der Ping kam nicht durch.
- Andere Varianten brauchten Pakete, die ich nicht mit `opkg install` installieren
  konnte, ohne sie selbst zu kompilieren, schätze ich.

Zusatz: OpenVPN über die Nutzeroberfläche konfigurieren
-------------------------------------------------------
[Zusatz]: #zusatz-openvpn-über-die-nutzeroberfläche-konfigurieren

Die folgenden Einstellungen sind aus der Datei `vi /tmp/etc/openvpn-NAME.conf`, wobei
`NAME` mit dem Namen zu ersetzen ist, den Du bei Services→OLSR IPv4→Add eingibst.
Das kann bei beiden Routern der selbe sein.

- OpenWRT-1 Einstellungen als Client:  
  Services→OLSR IPv4→Add und "Simple client configuration for a routed point-to-point VPN"
  ```
  comp-lzo no
  dev tun
  ifconfig 10.5.5.1 10.5.5.2
  keepalive 10 60
  port 2222
  verb 3
  remote 192.168.0.10
  ```
  `192.168.0.10` ist dabei die Adresse des WAN-Ports und kann bei
  OpenWRT-2→Status→Overview unter
  "IPv4 WAN Status"→"Address" eingesehen und ersetzt werden.
- OpenWRT-2 Einstellungen als Server:  
  Services→OLSR IPv4→Add und "Simple server configuration for a routed point-to-point VPN"
  ```
  comp-lzo no
  dev tun
  ifconfig 10.5.5.2 10.5.5.1
  keepalive 10 60
  port 2222
  verb 3
  ```

Die Konfiguration über die Weboberfläche habe ich für den Server durchgeführt.
Die Konfiguration für den Client habe ich über das Kommando durchgeführt.
Es ist nur nötig, entweder die Oberfläche zu benutzen oder das Kommando in Local Startup zu kopieren.

Wenn die VPNs bei Neustart nicht aufgebaut werden, dann mal System→Startup untersuchen,
ob openvpn aktiviert ist. Es muss aktiviert sein.

Quellen
-------

Dank an Hannes, der mich mit [einer Mail][hannes] in andere Richtungen gestoßen hat.
Der [Blog Post über Performance][perf] hat eine gute Übersicht gegeben.
Ich hatte ein [VPN-Konzept] geschrieben, das aber noch einen zusätzlichen Rechner
erfordern würde.

[firmware]: https://github.com/freifunk-berlin/firmware/
[perf]: https://justus.berlin/2016/02/performance-of-tunneling-methods-in-openwrt/
[hannes]: https://lists.freifunk-potsdam.de/pipermail/users/2018-March/018479.html
[VPN-Konzept]: https://github.com/niccokunzmann/decentral-community-vpn/

