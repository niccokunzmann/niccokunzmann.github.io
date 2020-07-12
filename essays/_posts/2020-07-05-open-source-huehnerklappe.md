---
layout: post
title: Automatische Hühnerklappe mit Zeitschalter zum Selberbauen
language: de
---

Wir wollen eine Hühnerklappe bauen, die automatisch öffnet und schließt.
Sie soll einfach nachzubauen sein.
Diese Bauteile kosten ca. 30€.
Es dauert ca. einen Tag, um alles zusammenzubauen.

![]({% include images %}/foto/alles.jpg)

## Bauteile

Diese Bauteile brauchen wir für unsere Klappe.

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
- 8x Elektroanschlussklemmen mit Schraube [z.B. diese](https://www.pollin.de/p/leiterplatten-anschlussklemme-xy301v-2-polig-450856)
- Einen hohlen Stab, der auf den Motor passt
- Holz
- Viel Klingeldraht (10m)
- Eine bestehende Hühnerklappe
- 1x Gewindeschraube als Gegenstück für das Rohr
- 1x Gewindeschraube, die das Rohr am Motor befestigt
- Werkzeuge:
    - Zangen, um die Drähte zu schneiden und ab zu isolieren
    - Holzbohrer, Metallbohrer, Bohrmaschine
    - Holzschrauben, Akkuschrauber
    - Lötkolben & Zinn für das Relais

## Mechanische Vorrichtung

<img src="{% include images %}/Konstruktion-einfach.png" width="49%">
<img src="{% include images %}/Konstruktion.png" width="49%">
**Links**: Ein einfaches Modell der Hühnerklappe. Diese wird nur durch den Motor hoch und runter gezogen.  
**Rechts**: Der Motor zieht am Seil und kann die Klappe heben und senken. Das Seil kann aber auch manuell eingestellt werden, sodass der Motor nur auf der Mittelstellung hoch und runter zieht. Man kann sie aber auch dauerhaft auf und zu machen.

Wir haben uns für die linke, einfache Vorrichtung entschieden, weil man mit den elektischen Schaltern sehr gut die Klappe steuern kann.

## Elektrische Vorrichtung

Die beiden Netzteile (1, 2) können getrennt geschaltet werden.
Wenn man beide so anschließen würde, würde der Strom von dem einen Netzteil durch das andere durchfließen und der Motor (5) sich nicht drehen.
Deswegen wird der Stromkreis mit einem Relais (6) unterbrochen und umgeschaltet.
Das Relais ist also so angeschlossen, dass, wenn es an ist, es den Stromkreis für das
Netzteil schließt, das an ist.

<div style="display: inline-block;">
    <img style="float: left;" src="{% include images %}/Schaltung-1.png" width="49%">
    <ol style="float: left; width: 40%;">
        <li>12V Stromversorgung zum Runterfahren</li>
        <li>12V Stromversorgung zum Hochfahren</li>
        <li>(rot) Hühnerklappe, die hoch und runter fährt</li>
        <li>(rot)Seilwinde mit Seil</li>
        <li>Motor</li>
        <li>Umschaltrelais</li>
        <li>optional: Öffnungsrelais, das den Motor stoppt, wenn beide Netzteile eingeschaltet sind</li>
        <li>Schalter für das Senken der Klappe - an der Klappe angebracht und geschlossen, bis die Klappe unten ist</li>
        <li>Schalter für das Heben der Klappe - an der Führung angebracht und geschlossen, bis die Klappe oben ist</li>
    </ol>
</div>

## Schalter an der Klappe

![]({% include images %}/foto/klappe.jpg)

Die Zeitschaltung ist recht ungenau.
Hochziehen geht schwerer als runterlassen.
Diese Das erzeugt Ungenauigkeiten mehrer Zentimeter.
Deswegen bringen wir Schalter (8, 9) an die Klappe (3) an.
Diese Schalter

<img src="{% include images %}/foto/schalter-1.jpg" width="49%">
<img src="{% include images %}/foto/schalter-2.jpg" width="49%">
Bilder oben: Diese Schalter sind **oben** an der Führungsschiene angebracht.
Sie bestehen aus einem dicken Draht, der unten festgeschraubt ist.
Sie schlagen sie an eine Schraube an, um die ein Klingeldraht gewickelt ist.
Dort, wo die dicken Drähte die Schraube berühren, ist auch ein Klingeldraht drumgewickelt.
Die dicken Drähte sind nach hinten über die Hühnerklappe gebogen, damit sie angehoben werden, wenn die Klappe eine bestimmte Höhe erreicht.
Durch das Anheben verlieren die gewickelten Klingeldrähte den Kontakt und der Stromfluss wird unterbrochen.

<img src="{% include images %}/foto/schalter-3.jpg" width="49%">
<img src="{% include images %}/foto/schalter-4.jpg" width="49%">
Bilder oben: Diese Schalter sind **unten** an der Hühnerklappe angebracht.
Sie sind analog zu den Schaltern oben mit dickem Draht und Klingendraht gebaut.
Dort, wo die Klappe unten ist, kommen Schrauben hin, die die Schalter dann öffnen.

Bei der Konstruktion der Schalter sollte beachtet werden, dass der Arm, der anstößt, solang ist, dass er selbsständig runterfällt und so den Kontakt selbstständig wieder herstellt.

Der Klingeldraht sollte auch lange genug sein, um ohne abzureißen bei geschlossener Klappe bis and die elektrische Schaltung zu gelangen.
Wir haben dafür alle Drähte, die die Schaltung am oberen Brett verlassen, um Schrauben gewickelt, damit ein Ziehen daran nicht an der Schaltung zieht, sondern an der Schraube.

Die Schalter sind beide doppelt, weil der Defekt eines Schalters nicht die Klappe offen lassen soll.
Das wäre gefährlich, da Marder und Fuchs dann kommen könnten.

## Seilwinde

![]({% include images %}/foto/winde.jpg)
**Links**: Das Seil ist aufgewickelt und die Klappe ca. 30cm nach oben gezogen.
Links steckt das Alurohr auf einer Gewindeschraube, die durch das Holz schaut.
Das Seil ist an einer Schraube festgeknotet, die durch ein Bohrloch in dem Alurohr schaut.  
**Rechts**: Der Motor ist an dem Holz festgeschraubt.
Das Alurohr ist eingebohrt und in dem Loch steckt eine kleine, 3mm breite Gewindeschraube.

Die Unterlegscheiben dienen dazu, dass das Seil sich nicht zu weit in eine Richtung aufwickelt sondernumgelenkt wird.

## Zeitschaltung

![]({% include images %}/foto/netzteile.jpg)

Die Netzteile sollte man beschriften, um eine Verwechslung zu vermeiden.
Diese stecken in einer Zeitschaltuhr.
Diese laufen dann synchron.
Dort, wo der rote Pfeil ist, wird die Zeit eingestellt.

## Zusammenfassung

Diese Seite beschreibt den Bau und die Teile einer zeitgesteuerten Hühnerklappe.

## FAQ

- **Kann sich der Motor automatisch zurückdrehen, sobald der Strom weg ist?**  
    Nein, das kann er nicht. Es ist ein Motor mit 1 Umdrehung/Minute (1U/min).
    Das braucht zu viel Kraft.


