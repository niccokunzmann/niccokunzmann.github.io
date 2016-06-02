---
layout: post
title: Die Uni Potsdam Zensiert das Internet
---

{% assign images = site.baseurl | append:"/images" | append:page.url %}

Dieses Bild bietet sich, wenn man die Webseite [http://rotespotsdam.tk](http://rotespotsdam.tk) im Netz der Uni Potsdam besucht.

![zensur.png]({{ images }}/zensur.png)

Mit "Netz der Uni Potsdam" meine ich

- eduroam
- Uni VPN cisco
- Studentendorf Stahnsdorfer Straße

Wenn man [https](https://rotespotsdam.tk) benutzt, ich das Zertifikat verständlicher Weise ungültig aber wenn man es akzeptiert, kommt die selbe Seite.

Was ist diese Seite? Eine Veranstaltungsseite für alternative, linke Veranstaltungen.

[![rotespotsdam.tk-unzensiert.png]({{ images }}/rotespotsdam.tk-unzensiert.png)](https://rotespotsdam.tk)

## HTTP-Requests

**These 1 - Falsch** 
Die Domain wird auf eine fremde IP aufgelöst.

Wenn man sich die Inhalte abfragt, dann stellt isch heraus, dass `91.203.147.147` tatsächlich die IP vom roten Potsdam ist.

<script src="https://gist.github.com/niccokunzmann/c3fdde98b3bdca3e1fc7a23e81f5e2a5.js"></script>

Wer das Script aufmerksam liest, stellt fest, dass ich, um zu sehen, ob `91.203.147.147` eine IP eines Zensurbereitstellers ist, auch google.de an dieser IP angefragt habe.

Wenn sie nicht die IP blocken und wenn sie nicht die Domain Blocken, wie machen sie es dann?
Das einzige, was mit da noch einfällt ist Deep-Packet-Inspection.

**These 2 - nicht zu widerlegen**

Gehen wir mal die Punkte durch:

1. Google.de wird angefragt, gibt die Seite zurück, bei beiden.
2. Der Host google.de wird an der IP von rotespotsdam.tk angefragt, in beiden Fällen ist die Anwort, dass mehrere Domänen diese IP verwenden können und google.de keine davon ist.
3. rotespotsdam.tk wird angefragt - hier wird die Seite geblockt, wie es auch im Webbrowser der Fall ist.
4. <a name="Punkt4"></a>rotespotsdam.tk wird an der IP von google angefragt - wieder die selbe Blocknachricht.

Wir können davon ausgehen, dass das Blocken

1. Nicht über die Domänenauflösung geschieht.
2. Nicht über die IP geschieht.
3. In diesem Fall das Blocken auf der HTTP-Ebene entschieden wird.

## traceroute

Wo wird dann geblockt? Selbst der Netzwerkzugriff per Ping und Traceroute sind frei:

### rotespotsdam.tk from inside the University of Potsdam:

    traceroute to rotespotsdam.tk (91.203.147.147), 30 hops max, 60 byte packets
     1  172.16.0.1 (172.16.0.1)  3.137 ms  3.747 ms  3.530 ms
     2  141.89.251.62 (141.89.251.62)  239.591 ms  240.859 ms  240.644 ms
     3  gw.wlan.rz.uni-potsdam.de (172.16.6.254)  3.809 ms  3.889 ms  3.829 ms
     4  xr-pot1-te1-3.x-win.dfn.de (188.1.33.149)  4.333 ms  4.156 ms  4.204 ms
     5  xr-pep1-te2-1.x-win.dfn.de (188.1.144.53)  4.228 ms  4.814 ms  4.495 ms
     6  cr-tub2-te0-0-0-7-4.x-win.dfn.de (188.1.146.30)  4.895 ms  236.165 ms  236.125 ms
     7  de-cix1.RT.ACT.FKT.DE.retn.net (80.81.192.73)  251.609 ms  251.752 ms  251.569 ms
     8  ae0-6.RT.BH.HRK.UA.retn.net (87.245.233.193)  274.069 ms  275.349 ms  275.445 ms
     9  GW-MaxNet.retn.net (87.245.243.210)  276.418 ms  274.761 ms  275.870 ms
    10  79-171-122-170-kh.maxnet.ua (79.171.122.170)  275.669 ms  275.909 ms  45.453 ms
    11  * * *
    [...]
    30  * * *

### rotespotsdam.tk from outside the University of Potsdam (Android Hotspot):

    traceroute to rotespotsdam.tk (91.203.147.147), 30 hops max, 60 byte packets
     1  192.168.43.1 (192.168.43.1)  5.000 ms  4.755 ms  4.569 ms
     2  * * *
     3  10.81.85.5 (10.81.85.5)  213.920 ms  213.773 ms  213.607 ms
     4  10.81.123.109 (10.81.123.109)  213.451 ms  213.561 ms  213.411 ms
     5  10.81.123.89 (10.81.123.89)  212.391 ms  212.252 ms  212.038 ms
     6  * * *
    [...]
    30  * * *

### google.de from inside the University of Potsdam:

    traceroute to google.de (216.58.213.3), 30 hops max, 60 byte packets
     1  172.16.0.1 (172.16.0.1)  3.176 ms  3.881 ms  4.429 ms
     2  141.89.251.62 (141.89.251.62)  21.847 ms  21.986 ms  22.059 ms
     3  gw.wlan.rz.uni-potsdam.de (172.16.6.254)  3.981 ms  4.141 ms  4.187 ms
     4  xr-pot1-te1-3.x-win.dfn.de (188.1.33.149)  5.543 ms  5.842 ms  5.877 ms
     5  xr-pep1-te2-1.x-win.dfn.de (188.1.144.53)  6.365 ms  6.331 ms  6.501 ms
     6  cr-tub2-te0-0-0-7-4.x-win.dfn.de (188.1.146.30)  6.732 ms  4.247 ms  4.560 ms
     7  google.bcix.de (193.178.185.100)  5.501 ms  5.841 ms  6.048 ms
     8  209.85.249.182 (209.85.249.182)  33.623 ms  34.173 ms  33.737 ms
     9  216.239.41.119 (216.239.41.119)  11.976 ms  12.682 ms  12.607 ms
    10  ber01s14-in-f3.1e100.net (216.58.213.3)  12.520 ms  12.774 ms  10.895 ms


## Und dann kein Ping mehr.

Am 2.06.2016 um 10:50 bekam ich plötzlich keinen Zugriff per Ping mehr auf diese Seite und alle Versuche, die Seite zu laden, timeten aus. 
Nach eine weile ging es dann wieder.

### Ping an rotespotsdam.tk von außerhalb der Uni Potsdam (Android Hotspot)

    Pinging rotespotsdam.tk [91.203.147.147] with 32 bytes of data:
    Reply from 91.203.147.147: bytes=32 time=148ms TTL=52
    Reply from 91.203.147.147: bytes=32 time=155ms TTL=52
    Reply from 91.203.147.147: bytes=32 time=250ms TTL=52
    Reply from 91.203.147.147: bytes=32 time=111ms TTL=52

    Ping statistics for 91.203.147.147:
        Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
    Approximate round trip times in milli-seconds:
        Minimum = 111ms, Maximum = 250ms, Average = 166ms

### Ping an rotespotsdam.tk von innerhalb der Uni Potsdam (Studentendorf Stahnsdorfer Straße)

    Pinging rotespotsdam.tk [91.203.147.147] with 32 bytes of data:
    Request timed out.
    Request timed out.
    Request timed out.

    Ping statistics for 91.203.147.147:
        Packets: Sent = 3, Received = 0, Lost = 3 (100% loss),
        
### Ping an google.de von innerhalb der Uni Potsdam (Studentendorf Stahnsdorfer Straße)

    Pinging google.de [216.58.213.3] with 32 bytes of data:
    Reply from 216.58.213.3: bytes=32 time=10ms TTL=51
    Reply from 216.58.213.3: bytes=32 time=235ms TTL=51

    Ping statistics for 216.58.213.3:
        Packets: Sent = 2, Received = 2, Lost = 0 (0% loss),
    Approximate round trip times in milli-seconds:
        Minimum = 10ms, Maximum = 235ms, Average = 122ms

## <a name="These3"></a>These 3: Blockiert RotesPotsdam.tk die Uni-Adressbereiche?

Die IP `91.203.147.147` ist aus der Ukraine[[ipvoid.com](http://www.ipvoid.com/scan/91.203.147.233/)].
In der Ukraine laufen russische SORM-Boxen, die Deep-Packet-Inspection anwenden[[The Red Web](http://www.amazon.com/The-Red-Web-Dictators-Revolutionaries/dp/1610395735#reader_1610395735)].
Da könnte ein Zusammenhang bestehen. 

Schaune wir nach: Der Traceroute von Google.de:

- [193.178.185.100](http://www.ipvoid.com/scan/193.178.185.100/) (DE) Germany
- [209.85.249.182](http://www.ipvoid.com/scan/209.85.249.182/) (US) United States
- [216.239.41.119](http://www.ipvoid.com/scan/216.239.41.119/) (US) United States
- [216.58.213.3](http://www.ipvoid.com/scan/216.58.213.3/) (US) United States

Die Route, die die Pakete nehmen geht von Deutschland direkt in die USA. 
Es kann also ausgeschlossen werden, dass die Webseite rotespotsdam.tk allein auf Ukrainischer Seite für z.B. das deutsche Forschungsnetz gesperrt ist.
Die Ukraine allein erklärt nicht [Punkt 4](#Punkt4).

## Fragen:

- Schnüffelt die Uni Potsdam tatsächlich in unserem Verkehr rum? 
- Ist es die Uni oder der Anschluss der Uni?
