---
layout: post
title: Automatische Hühnerklappe mit Zeitschalter zum Selberbauen
language: de
---

Wir wollen eine Hühnerklappe bauen, die automatisch öffnet und schließt.
Sie soll einfach nachzubauen sein.
So kommt hier die Geräteliste.

- 2x [Zeitschaltuhr ZU-9A](https://www.pollin.de/p/zeitschaltuhr-zu-9a-870162)  
    Diese Zeitschaltuhr hat kleine Schalter für je 15 Minuten, in denen der Strom läuft.
- 1x [Gleichstrom-Getriebemotor TDY-12, 12 V-, 0,18 A, 1 U/min](https://www.pollin.de/p/gleichstrom-getriebemotor-tdy-12-12-v-0-18-a-1-u-min-310760)  
    Der Motor hat 1 Umdrehung/Minute. Die Klappe wird ca. 23-43cm hochgezogen.
    Bei 30cm/15min macht das 2cm/min, also einen Durchmesser von ca. 6mm der Welle (2cm/3), die die Schnur aufrollt, um die Klappe zu heben und zu senken.
- 2x [Stecker-Schaltnetzteil, 12V-/2,5A, weiß](https://www.pollin.de/p/stecker-schaltnetzteil-shenzen-frecom-f30l2-120250spav-12v-2-5a-weiss-352547)  
    Es reicht so gut wie jedes Netzteil, da der Motor nur 0.18A zieht und nicht 2A.
    Oft liegen solche Netzteile rum bzw. sind an vielen alten Geräten verbaut.
    Die Voltzahl muss mit der des Motors übereinstimmen: 12V in diesem Falle.
    Die Netzteile werden so angeschlossen, dass das eine Netzteil den Motor
    in die eine und das andere Netzteil den Motor in die andere Richtung dreht.
- 1x [Steckdosenleiste DAYHOME SLK-3/W, 3-fach, weiß](https://www.pollin.de/p/gleichstrom-getriebemotor-tdy-12-12-v-0-18-a-1-u-min-310760)
- 1x [Relais OMRON G2R1E-12, print, 1xUM, 12 V-, 16 A](https://www.pollin.de/p/relais-omron-g2r1e-12-print-1xum-12-v-16-a-340849)  
    Die beiden Netzteile werden gegenpolig angeschlossen.
    Dadurch kann der Strom von dem einen Netzteil durch das andere abfließen und der
    Motor dreht sich nicht mehr.
    Deswegen sollte es ein Relais (elektrischer Schalter) geben, der den Stromkreis auswählt,
    der am Motor angeschlossen ist.
    Ein Relais, das zwischen zwei Kontakten wählen kann ist bestens geeignet.
- 1x [Steckdosenleiste mit min 4 Steckplätzen](https://www.pollin.de/p/steckdosenleiste-dayhome-slk-4-w-4-fach-weiss-452030)  
    Die Zeitschaltuhren sind sehr groß.
    Drei Steckplätze reichen nicht.
- 1x optional: [KFZ-Relais RAYEX LA-12DW](https://www.pollin.de/p/kfz-relais-rayex-la-12dw-340367)  
    Dieses Relais kann benutzt werden, damit die Klappe sich nicht bewegt, wenn beide Netzteile angeschaltet sind.

## Mechanische Vorrichtung

<img src="{% include images %}/Konstruktion-einfach.png" width="49%">
<img src="{% include images %}/Konstruktion.png" width="49%">
**Links**: Ein einfaches Modell der Hühnerklappe. Diese wird nur durch den Motor hoch und runter gezogen.
**Rechts**: Der Motor zieht am Seil und kann die Klappe heben und senken. Das Seil kann aber auch manuell eingestellt werden, sodass der Motor nur auf der Mittelstellung hoch und runter zieht. Man kann sie aber auch dauerhaft auf und zu machen.

Wir haben uns für die linke, einfache Vorrichtung entschieden, weil man mit den elektischen Schaltern sehr gut die Klappe steuern kann.

## Elektrische Vorrichtung

<div style="display: inline-block;">
    <img style="float: left;" src="{% include images %}/Schaltung-1.png" width="49%">
    <ol style="float: left; width: 40%;">
        <li>12V Stromversorgung zum Runterfahren</li>
        <li>12V Stromversorgung zum Hochfahren</li>
        <li>(rot) Hühnerklappe, die hoch und runter fährt</li>
        <li>(rot)Seilwinde mit Seil</li>
        <li>Motor</li>
        <li>Umschaltrelais</li>
        <li>optional: Öffnungsrelais</li>
        <li>Schalter für das Senken der Klappe - an der Klappe angebracht und geschlossen, bis die Klappe unten ist</li>
        <li>Schalter für das Heben der Klappe - an der Führung angebracht und geschlossen, bis die Klappe oben</li>
    </ol>
</div>




FAQ
---

- **Kann sich der Motor automatisch zurückdrehen, sobald der Strom weg ist?**  
    Nein, das kann er nicht. Es ist ein Motor mit 1 Umdrehung/Minute (1U/min).
    Das braucht zu viel Kraft.

