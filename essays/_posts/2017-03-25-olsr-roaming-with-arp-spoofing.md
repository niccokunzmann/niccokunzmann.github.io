---
layout: post
title: OLSR Roaming mit ARP Spoofing
language: de
---

![]({%include images%}/Outline.svg)

Die Zeichnung zeigt, was ich mir vorgestellt habe.
Wie kann man das umsetzen?
In der [Problemstellung][Problemstellung] git es das, womit ich Hilfe brauche.

Roaming
-------

Roaming funktioniert so, dass sich ein Client das für ihn Stärkste Netz auswählt.

Die Access Points und die Clients können über die Netze hinweg nicht miteinander reden:
`192.168.99.1` ist mein Gateway, `192.168.99.2` ist ein anderes.
Jetzt kann ich das eine Pingen, das andere nicht:
```
>ping /t 192.168.99.1

Pinging 192.168.99.1 with 32 bytes of data:
Reply from 192.168.99.1: bytes=32 time=1ms TTL=64
Reply from 192.168.99.1: bytes=32 time=1ms TTL=64

>ping /t 192.168.99.2

Pinging 192.168.99.2 with 32 bytes of data:
Reply from 192.168.99.18: Destination host unreachable.
Reply from 192.168.99.18: Destination host unreachable.
Reply from 192.168.99.18: Destination host unreachable.
Reply from 192.168.99.18: Destination host unreachable.
Reply from 192.168.99.18: Destination host unreachable.
```
Jetzt mache ich meinen Access Point aus:
```

>ping /t 192.168.99.2

Pinging 192.168.99.2 with 32 bytes of data:
PING: transmit failed. General failure.
PING: transmit failed. General failure.
PING: transmit failed. General failure.
PING: transmit failed. General failure.
PING: transmit failed. General failure.           
Reply from 192.168.99.2: bytes=32 time=6ms TTL=64
Reply from 192.168.99.2: bytes=32 time=31ms TTL=64
Reply from 192.168.99.2: bytes=32 time=3ms TTL=64
Reply from 192.168.99.2: bytes=32 time=1ms TTL=64
```

Scenario 1 Freifunk + Arp Spoof
-------------------------------

Gerade bekommen alle Clients eine IP aus einem eigenen Adressraum.
Also muss jeder Router, der am Roaming teil nimmt, sich als Gateway
für die Clients, die wechseln, ausgeben.

Dafür muss zusätzliche Software entstehen.
  
Hiermit sagt der Freifunk-Router allen Clients im DHCP-Netz, dass die IP
des andere Freifunk-Routers `10.22.73.129` unter seiner MAC-Addresse erreichbar ist.
```
echo 1 > /proc/sys/net/ipv4/ip_nonlocal_bind
arping -A -U -s 10.22.73.129 -I br-dhcp 0.0.0.0 &
```
[Quelle](http://serverfault.com/a/175806)

Das ist meine Client-Konfiguration von einem anderen Freifunk-Router:   
![]({% include images %}/client-roaming.png)


**Es funktioniert:**
```
>ping -t 8.8.8.8

Pinging 8.8.8.8 with 32 bytes of data:
Reply from 8.8.8.8: bytes=32 time=515ms TTL=45
Reply from 8.8.8.8: bytes=32 time=25ms TTL=45
```
Ein ähnliches Script kann für alle Knoten laufen, die irgendwie als Freifunk Router erkannt werden.
Datenbasis:

> Alle `/32` Adressen -> dann kann jeder Knoten, der roaming mag, sich so announcen.
> ![]({% include images %}/hna.png) (sinnloser Traffic)

Alle HNA ist eine effizientere Quelle, da nur von dort die Clients Anfragen können:
![]({% include images %}/hna-announcements.png)

So stelle ich fest, dass sich ein Client verbunden hat:
```
root@254-121-heinrich-von-kleist:~# ip neigh
10.22.73.155 dev br-dhcp lladdr 7c:7a:91:4b:ca:6c REACHABLE
```
Dieser Arp-Eintrag zeigt deutlich, dass sich ein Client aus einem fremden
Netz verbunden hat, welches gleichzeitig auch in den HNA steht.
Der Algorithmus ist klar:
Sollte sich ein Client verbinden, der aus einem anderen Netz kommt, so
kann ihm proaktiv alles angeboten werden.
Das verursacht vielleich viel Traffic?

Traffic begrenzen:
Um den Traffic effektiv zu begrenzen, kann man die ARP-Requests benutzen,
die von dem neuverbundenen Client reinkommen.

### Algorithmus

Dieser Algorithmus kann auf jedem Freifunk-Router laufen, um HNA-Roaming anzuschalten:

- Lausche auf dem lokalen HNA interface, z.B. DHCP
- Immer wenn eine ARP-Request kommt:
  - Wenn sie aus einem fremden  HNA-Netz stammt:
     - Beantworte die Anfrage mit der eigenen Router IP
     
### Problemstellung
[Problemstellung]: #problemstellung

Ich kann es als (1) Shellscript machen, das (2) proaktiv alle IPs der HNA spooft.
- (1) Ein Shell-Script ist wahrscheinlich nicht der Weg, wie man es machen würde.
  - Wie erstelle ich ein Plug-In?
  - Wäre ein Shell-Script nicht auch cool, weil portabel und muss nicht kompiliert werden?
- (2) proaktive die ganze Zeit zu senden ist aufwändig und unnötig.
      Wie kann ich auf ARP-Requests reagieren?
      
  - Wie mache ich das in der shell?
  - Wie mache ich das in einem Plug-In?
  - Wie mache ich das in der Sprache C?
- (3) Was macht [OLSR-ARPRoaming][olsr-arproaming]?
  - Macht es genau das?

Related Work
------------

Es gibt [OLSR-ARPRoaming][olsr-arproaming].
Der Algorithmus steht in der [C-Datei][arp-source].
- Was genau macht das?
  - Es hält eine Liste von Clients.
  - [Es hat ein ARP-Socket](https://sourceforge.net/p/olsr-arproaming/code/HEAD/tree/src/olsrd_arproaming.c#l340)
  - [Es tested, b clients da sind](https://sourceforge.net/p/olsr-arproaming/code/HEAD/tree/src/olsrd_arproaming.c#l244)
  - Die wichtigsten Methoden sind:
    - [`void arproaming_client_add(struct arproaming_nodes **l)`](https://sourceforge.net/p/olsr-arproaming/code/HEAD/tree/src/olsrd_arproaming.c#l244)
    - [`int arproaming_client_probe(char *ip)`](https://sourceforge.net/p/olsr-arproaming/code/HEAD/tree/src/olsrd_arproaming.c#l207)
    
    Was tun sie?
- [Da steht][olsr-arproaming], dass der Code in den OpenWRT-packages weilen soll.
  Ich habe im da gesucht und nichts gefunden:
  - [OpenWRT-Repo][openwrt-repo-suche]
  - [OLSRD-Organization](https://github.com/search?q=org%3AOLSR+arproaming)
  
  Wo finde ich den?
  
Auf [die Anfrage in der Mailingliste gab es Antworten][mail].
[Mehr Diskussion März 2018](https://lists.berlin.freifunk.net/pipermail/berlin/2018-March/037451.html).
In [Potsdam gibt es eine Anleitung][roaming-potsdam].

[olsr-arproaming]: http://olsr-arproaming.sourceforge.net/
[arp-source]: https://sourceforge.net/p/olsr-arproaming/code/HEAD/tree/src/olsrd_arproaming.c
[openwrt-repo-suche]: https://github.com/search?q=org%3Aopenwrt+arproaming
[mail]: https://lists.berlin.freifunk.net/pipermail/berlin/2017-March/035415.html
[roaming-potsdam]: https://wiki.freifunk-potsdam.de/Roaming
  
Fails
=====

Die nachfolgenden Versuche haben nicht geklappt.

Scenario 2 Freifunk + eigenes Roaming Netz
------------------------------------------

Da die Roaming APs und clients sich nicht sehen können, können wie ein gleiches
Roaming Netz für alle einrichten. Das wäre z.B. 192.168.X.X.
Dann brauchen wir uns nicht um die DHCP-IP-Vergabe kümmern.
Clients wechseln und haben Internet, sind aber nicht mehr wirklich über das Freifunk-Meshnetz aus
erreichbar.

Scenario 3 Ansatz vereinigen (fail)
----------------------------

Um Roaming erfolgreich in einem OLSR-Netz zu machen braucht es diese (zusätzlichen)
Einstellungen zum [Potsdamer Freifunknetz](https://wiki.freifunk-potsdam.de/Kathleen):

1. Wir brauchen eine einheitliche SSID
2. Wir brauchen eine einheitliche Gateway IP, z.B. `10.22.0.1`.
   Wir können zwei Gateways angeben, DHCP-Option 3 (siehe nächster Schritt).
   Dieses Gateway-Interface akzeptiert auf `255.255.0.0`.
3. DHCP: Der Router gibt den Clients die Möglichkeit den Router zu erreichen:
   - Durch eine erweiterte Netzmaske: `255.255.0.0`. Dann können die Clients
     keine anderen Freifunkgeräte mehr erriechen, weil sie nicht das Gateway für
     Freifunk benutzen.
   - Durch eine Zusätzliche Route mit der DHCP-Option 121.
     [Dieser Artikel](https://tmgblog.richardhicks.com/2009/01/08/using-dhcp-to-assign-static-routes/)
     beschreibt das für Windows Server 2009. Es werden wohl nicht alle Clients
     diese Option verstehen.  
     Diese ermöglicht also alten Geräten einen stationären Gebrauch und neuen
     Geräten ein Roaming.
     
Static Route mit DHCP
---------------------

Reading:
- [DHCP Option 33](https://tools.ietf.org/html/rfc2132#section-5.8) Static Route  
  obsoleted by option 121. Hier wird einer IP ein Router zugewiesen.
  Das ist nicht nützlich für diesen Nutzfall.
- [DHCP Option 121](https://tools.ietf.org/html/rfc3442) Classless Static Route  
  Suchprozess:
  - Kann option nicht eingeben
  - [udhcpc](https://github.com/openwrt/openwrt/blob/de7f81f1713e1fb2f4ae895f84d0051bc3fc3ce2/package/network/config/netifd/files/lib/netifd/proto/dhcp.sh)
    sollte ein [kommando sein](http://www.linuxcertif.com/man/8/udhcpc/).
    [Kommentar zeigt, wie man es setzt](https://dev.openwrt.org/ticket/6435#comment:19)
- [DHCP Option 249](https://msdn.microsoft.com/en-us/library/cc227282.aspx) Microsoft Classless Static Route  

![]({% include images %}/dhcp_options.png)

```
121,10.22.0.1/32,0.0.0.0
249,10.22.0.1/32,0.0.0.0
3,10.22.0.1,10.22.DHCP.IP
```

Fail: Die Routen werden beim Client richitg angelegt. Das Problem:
Der Fall von Scenario 2 tritt wieder in Kraft.

Notizen
-------

TODO:
- Hat IPv6 da andere Mechanismen?
- Zwei Freifunk Access Points mit selber SSID
  - können die sich pingen?
  - nehmen sie sich die clients weg?
  - Wenn nein:
    - Arp spoof ausführen für OLSR 255 addressen in 255.255-Bereich
    
DONE
- Gelesen:
  - [SSID stärke gibt ausschlag](https://documentation.meraki.com/MR/WiFi_Basics_and_Best_Practices/Seamless_Roaming_with_MR_Access_Points)
- [Diskussion auf wireless LAN Berlin](https://lists.berlin.freifunk.net/pipermail/berlin/2017-March/035415.html)
  

```
user@ubuntu:~$ ip route
default via 192.168.99.1 dev wlx7cdd9058f352  proto static  metric 600 
169.254.0.0/16 dev docker0  scope link  metric 1000 linkdown 
172.17.0.0/16 dev docker0  proto kernel  scope link  src 172.17.0.1 linkdown 
192.168.99.0/24 dev wlx7cdd9058f352  proto kernel  scope link  src 192.168.99.20  metric 600 

user@ubuntu:~$ ip neighbor
192.168.99.1 dev wlx7cdd9058f352 lladdr a6:03:8f:71:c1:00 STALE
```
Go to other roaming wifi.
```
user@ubuntu:~$ ip neighbor
192.168.99.2 dev wlx7cdd9058f352 lladdr a6:03:8f:71:c1:1d STALE

user@ubuntu:~$ sudo ip neighbor add 192.168.99.1 lladdr a6:03:8f:71:c1:1d nud permanent dev wlx7cdd9058f352

user@ubuntu:~$ ping 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=45 time=84.9 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=45 time=72.4 ms
```


