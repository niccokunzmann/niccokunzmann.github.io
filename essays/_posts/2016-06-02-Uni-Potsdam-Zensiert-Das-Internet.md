---
layout: post
title: Die Uni Potsdam Zensiert das Internet
language: de
---

Ich suche nach Leuten, die auch Informationen sammeln und mitschreiben wollen. Besonders [Beschwerden](#Beschwerden), die in letzter Zeit, seit Mai ungefähr, mit dem Internet auftreten, sollten wir sammeln, da sie vielleicht etwas damit zu tun haben.

---------

Dieses Bild bietet sich, wenn man die Webseite [http://rotespotsdam.tk](http://rotespotsdam.tk) im Netz der Uni Potsdam besucht. (Anmerkung fluepke: Stichproben zeigen, dass jegliche Anfragen an .tk Domain blockiert werden. Endet der HOST im Requestheader auf .tk (ganz egal, ob eine solche Seite existiert) wird die Anfrage blockiert.)

![zensur.png]({% include images %}/zensur.png)

Mit "Netz der Uni Potsdam" meine ich

- eduroam
- Uni VPN Cisco
- Studentendorf Stahnsdorfer Straße

Wenn man [https](https://rotespotsdam.tk) benutzt, kommt ein [ungültiges Zertifikat]({% include images %}/chrome-inside.png).

Was ist diese Seite? Eine Veranstaltungsseite für alternative, linke Veranstaltungen.

[![rotespotsdam.tk-unzensiert.png]({% include images %}/rotespotsdam.tk-unzensiert.png)](https://rotespotsdam.tk)

## HTTP-Requests

**These 1 - Falsch** 
Die Domain wird auf eine fremde IP aufgelöst.

Wenn man sich die Inhalte abfragt, dann stellt sich heraus, dass `91.203.147.147` tatsächlich die IP vom roten Potsdam ist.

<script src="https://gist.github.com/niccokunzmann/c3fdde98b3bdca3e1fc7a23e81f5e2a5.js"></script>

Wer das Script aufmerksam liest, stellt fest, dass ich, um zu sehen, ob `91.203.147.147` eine IP eines Zensurbereitstellers ist, auch google.de an dieser IP angefragt habe.

Wenn sie nicht die IP blocken und wenn sie nicht die Domain Blocken, wie machen sie es dann?
Das einzige, was mit da noch einfällt ist Deep-Packet-Inspection.

**These 2 - nicht zu widerlegen**

Gehen wir mal die Punkte durch:

1. Google.de wird angefragt, gibt die Seite zurück, bei beiden.
2. Der Host google.de wird an der IP von rotespotsdam.tk angefragt, in beiden Fällen ist die Antwort, dass mehrere Domänen diese IP verwenden können und google.de keine davon ist.
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

Am 2.06.2016 um 10:50 bekam ich plötzlich keinen Zugriff per Ping mehr auf diese Seite und alle Versuche, die Seite zu laden, timten aus. 
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

Schaun wir nach: Der Traceroute von Google.de:

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

## <a name="tcptraceroute"></a>tcptraceroute

Traceroute haben wir schon gesehen und wissen, wo die Pakete langhüpfen. 
Hier ein anderes Script, das http-traceroute macht und schaut, ab wann keine HTTP-Antwort mehr kommt.

<script src="https://gist.github.com/niccokunzmann/7045a65226cd3246f3cc95ebaa0d7fc3.js"></script>

`output-from-outside.txt` zweigt die Ausgabe außerhalb der Uni Potsdam. Es kann festgestellt werden, dass in diesem Fall bei 11 Hops keine Antwort mehr vom Server kommt.

`output-from-inside.txt` zeigt wieder die Ausgabe innerhalb der Uni Potsdam. Wir bekommen wieder den Block der Seite für rotespotsdam.tk und eine "keine Ahnung" Antwort für google.de. Das geht so weiter bis ttl 10. Dort bekommen wir wir eine Antwort für rotespotsdam.tk und ein Timeout für google:

    Traceback (most recent call last):
      File "httpttl.py", line 23, in httpttl
        print(s.recv(1024))
    TimeoutError: [WinError 10060] A connection attempt failed 
                  because the connected party did not properly 
                  respond after a period of time, or established 
                  connection failed because connected host has 
                  failed to respond

Das heißt: Die Antworten mit der Blocknachricht werden vor dem Server an uns gesendet, kommen nicht von der IP-Adresse `91.203.147.147`.
Das geht so weiter bis zu Hop 4. Bei Hop 4 kommt unsere Anfrage noch bei dem Server an, der uns über die Blockade informiert. Bei Hop 3 kommt unsere Anfrage nicht mehr an.

Zitat von oben:

     4  xr-pot1-te1-3.x-win.dfn.de (188.1.33.149)  4.333 ms  4.156 ms  4.204 ms

Dieser Hop 4, [188.1.33.149](http://www.ipvoid.com/scan/188.1.33.149/), ist es, der über eine Antwort entscheidet, ob geblockt wird oder nicht.
`188.1.33.149` gehört zum Deutschen Forschungsnetz. Tatsächlich kann eine Blockade in jedem Hop dazwischen geschehen. Stellen wir uns vor, dass Hop 3, wahrscheinlich der Gateway der Uni Potsdam, den Verkehr zu einer SORM-Box dupliziert, dann wird diese als Hop 4 gelten und von uns als Hop 4 empfunden werden. Das ist also Implementierungsdetail.

[Ip-lookup.net](http://ip-lookup.net) hat eine große Auflistung von Informationen über die einzelnen IPs.

## Gründe für das Blocken

Wie auf einer Mailingliste diskutiert wurde:

> Die Top-Level-Domain .tk ist international dafür bekannt, besonders gerne von Betrügern genutzt zu werden. Insbesondere im Bereich Phishing geht von der Endung eine besonders große Gefahr aus, da nach einer im Herbst 2012 freigegebenen Studie mehr als die Hälfte aller derartigen Angriffe von .tk-Domains aus durchgeführt werden.[11] Schon im Jahr 2008 hat der Sicherheitsspezialist McAfee die Adresse auf der Weltkarte der gefährlichsten Top-Level-Domains geführt, zusammen mit der von Hongkong: .hk.
> [[Wikipedia, 02.06.2016](https://de.wikipedia.org/wiki/.tk#Betrugsversuche)]

Das könnte einer der Beweggründe für das Blocken sein. Z.B. ist die Webseite von der Domainvergabestelle [dot.tk](http://dot.tk) auch geblockt. Diese sollte nicht böswillig sein.

## <a name="ssl"></a>SSL, HTTPS, sichere Verbindungen

Wenn man HTTPS benutzt, kann man z.B. [https://www.google.tk](https://www.google.tk) aufrufen. [http://google.tk](http://google.tk) ist aber geblockt.
Das Abrufen des SSL-Zertifikates funktioniert auch in beiden Fällen:

<script src="https://gist.github.com/niccokunzmann/db333891a4a764a27ef31cfc28896b59.js"></script>

## <a name="Beschwerden"></a>Beschwerden

- Bei mir treten ab und zu Verbindungsabbrüche bei https auf. 
- Bei einem anderen kann erschwert eine VPN-Verbindung aufgebaut werden. (Flüpke)

## Fragen, die sich auftun

- Wer hat verfügt, Deep-Paket-Inspection einzubauen?
- Wer betreut die Server?
- Wer entscheidet darüber, was blockiert wird? 
- Was sind die Gründe für eine Blockierung?
- Was wird alles geblockt?
- Was kann alles geblockt werden?
- Welche gemeinschaftlichen Folgen hat das? Kann sich da ein Soziloge für interessieren und melden?

## Politisch Betrachtet

Wir erleben einen politischen Rechtsruck überall in Europa und in Deutschland. Wenn wir erlauben, dass Forschungseinrichtungen diese Tiefenanalyse einsetzen, weichen wir das Postgeheimnis auf, liefern Leute ans Messer oder sorgen dafür, dass sie sich selbst zensieren. Solche Deep-Packet-Inspection wird auch von Russlands Regierung eingesetzt. Sie ist Wirksam, darin unerwünschtes Wissen online zu bekämpfen. Die Frage ist, ob wir solche Werkzeuge bei uns an der Uni dulden wollen. Sie sind

- Mißbrauchbar
- Gegen offenes Wissen
- Nicht kontrolliert durch unabhängige Instanzen und Transparenz.
- Eventuell nicht kontrollierbar, da von Externen eingerichtet/mit proprietärer Software
  - Externe können die "Metadaten", also dein super-detailiertes Tagebuch einsehen
  - Nicht nur deins, das aller Studenten
  - Wann du Emails abrufst, wann du wach bist, wann du in der Uni bist, wo du wohnst (durch IP oder E-Mails zuordenbar).
- Erlauben es, jeden, unverschlüsselten Verkehr mitzuschneiden, von allen Studenten der Uni Potsdam
- Können Verschlüsselung unterdrücken und somit zu Zensierbarkeit zwingen.
- Sind eine crackbare Superwaffe
- Diese Zensur wird dich in allen Eduroams begleiten.

Positives:

- Weniger Leute werden über .tk Domains angegriffen
- [Ein lustiges Video](https://www.youtube.com/watch?v=WY6KkRsS26M)

## Eduroam

Kurze Zusammenfassung basierend auf [Wikipedia](https://de.wikipedia.org/wiki/Eduroam#Technische_Umsetzung): Wenn man sich be Eduroam einloggt, macht man das mit `Nutzername@Universität` und dem Uni-Kennwort. 
Es wird dann eine verschlüsselte Verbindung zur Universität aufgebaut und dort wird erst Nutzername und Passwort überprüft. 
Dann ist man im Uni-Netz und kann das Internet erreichen. 
Also egal, wo auf der Welt man sich als Uni-Potsdam-Student in das Eduroam einloggt, sieht man das Internet aus der Sicht der Uni Potsdam und Blockaderegeln bleiben bestehen.

## Eingehende Analyse von Deep Packet Inspection

Mit dem Thema Deep Packet inspection hat sich [Mark Bedner befasst](http://kobra.bibliothek.uni-kassel.de/bitstream/urn:nbn:de:hebis:34-2009113031192/5/BednerDeepPacketInspection.pdf) ([Alternativlink](https://github.com/niccokunzmann/uploads/raw/master/blog/BednerDeepPacketInspection.pdf)).

## Ergebnisse

>    IO Prof. Lucke sagt es gab eine intensive Welle von Cyberattacken
>        das Sperren ist eine pauschale Verteidigungsmaßnahme
>
>    neben .tk auch .pn Domians gesperrt
>
>    Vorübergehende Sperrung denkbar aber bisher nicht geplant
>         Präsi ist auch sehr unzufrieden mit der Situation und wünscht sich "weniger einscheidene Maßnahmen von der ZEIK"
>
>    gibts das auch an anderen Hochschulen? globale Sperrung von Top-Level-Domains
>        Auftrag an uns als Studierendenschaft - so können wir uns vielleicht vernünftige Strategien von anderen Uni abgucken

2016/06/21 Es wurden mehrere Anfragen an die Techniker der Uni Potsdam gestellt.
Diese werde noch beantwortet.
