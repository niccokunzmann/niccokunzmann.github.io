---
layout: post
title: Freifunk-Technologie zur Breitbandversorgung von Schulen und Tagungszentren - Konzept
language: de
---

Um mit der Digitalisierung Schritt zu halten, ist an den Schulen eine
Vernetzung der Geräte untereinander und mit dem Internet hilfreich.
Schnelles Internet mit großer Bandbreite an Schulen hilft dabei, zentralisierte Dienste
für viele Schulen bereit zu stellen.

Eine Mögliche Lösung, die das Land bereit stellen kann, ist der Ausbau der Infrastruktur durch Glasfasernetze, die an die Schulen gelegt werden.
Das kann lange dauern und kostspielig sein.

In diesem Artikel möchte ich nicht in die Politik und Wirtschaft schauen sondern zivilgesellschaftliche Lösungen untersuchen.
Warum diese nicht in die Diskussion einbezogen werden, könnte daran liegen, dass die
Politik und Verwaltung klare Zuständigkeiten haben, die sie nicht abgeben oder vermischen können.
Aus den getrennten aber gleichen Zuständigkeiten wie Hardware, Software, Inhalte schlussfolgere
ich einen nötigen Mehraufwand an Kommunikation, der gleichzeitig durch eine Kultur der
Nichtkooperation erhöht wird.
Diese machen es auch schwer, an Lösungen der Zivilgesellschaft heranzutreten.

Gleichzeitig gibt es Schwierigkeiten der Politik an bestehende Gemeinschaften heranzutreten und
selten Willen ehrenamtlicher Freifunker, etwas zu garantieren.
Der Ansatz ist ein anderer: Man kann den Zugang zur Gemeinschaft nicht kaufen sondern muss selbst 
Teil der Gemeinschaft werden.
Wartung ist kein Vertrag sondern eine wechselseitige Beziehung.
Mit Geld und Beschlüssen kann Kooperation auf Augenhöhe schwerlich erwirkt werden.


Freifunk
--------

[Freifunknetzwerke](https://freifunk.net/) existieren in vielen Städten.
Diese sind dezentral. Jede Person kann mitmachen, wenn sie die Hardware hat.
Ziel ist es ein örtliches, freies, unkontrollierbares Netz neben dem Internet zu schaffen und
auch lokale Dienste anzubieten.

Die Mesh-Netzwerke zeichnet aus, dass sie viele Router beinhalten, die teilweise durch
Funk oder Kabel miteinander verbunden sind.
Sobald eine Verbindung gekappt wird oder schlechter wird, wird der Kommunikationsfluss umgeleitet.

Gleichzeitig befinden sich im Netz auch mehrere Uplinks zum Internet.
Solang im gesamten Netz irgendwer eine Internetverbindung bereit stellt, können alle diese benutzen.
Wenn ein Uplink wegbricht, dann wählen die Router auch wieder neue Routen ins Internet.

Die Stärke der Netze liegt auch im dezentralen Aufbau und der Gemeinschaft:
Ich muss nicht fragen, um mit meinem Nachbarn zusammen das Netz aufzubauen.
Wenn die Router sich anfunken können, dann bilden sie ein gemeinsames Netz.
Ich kann mit anderen Reden und so zusammen ein großes Netz aufbauen.

Die Freifunkgemeinschaften benutzen auch unterschiedliche Software auf ihren Routern.
Oftmals benutzen angrenzende Gemeinschaften die selbe Software, um interoperabel zu sein.
Es gibt auch Schulen, die an das Freifunk-Netz ihrer Gemeinschaft angegliedert sind.

Beispiellösung mit Freifunk an einer Schule
-------------------------------------------

Im Folgenden möchte ich kurz vorstellen, wie wir Freifunk an einer Schule verwenden können, was es kostet, welche Bandbreite wir erreichen und wie es umgesetzt werden kann.

Auf diesem Bild sehen wir eine Schule im Zentrum.
Diese ist durch das Meshnetzwerk an einige Nachbarn angegliedert.
Dadurch werden die Up-Links dieser Nachbarn auch für die Infrastruktur in der Schule bereit gestellt.

![]({% include images %}/aufbau.png)

Wenn das Schul-Internet ausfällt, wird das Internet der Nachbarn das auffangen.
Gleichzeitig ist es, so, dass die Eltern die Schule unterstützen können und vielleicht auch wollen,
um zeitgemäße Bildung zu ermöglichen.

Was ist mit so einem freien Netz möglich:
- Hohe Datenraten. Je mehr Leute mitmachen
- Ausfallsicherheit
- Infrastruktur für die Umgebung

Wenn man Glasfaser-Geschwindigkeit mit 200Mbit/s erreichen möchte, dann braucht man 13 Anschlüsse
mit 16Mbit/s in einem Dorf, wo es nur DSL gibt.
Nachbarn, die die Verbindungen bereit stellen, können unter anderem auch Kilometer weit weg stehen.
Es gibt Richtfunk-Antennen, die die Verbindung auch zu weiten Orten über Kilometer erlauben.

### Softwareüberlegungen

Wenn ein Routing so wie bei den Freifunkern in Berlin auf der IP-Ebene stattfindet,
wird jeder Router bestimmen, dass die Pakete, die für das Internet gedacht sind,
über einen vom Router bestimmten Gateway verlaufen.
Im Bild heißt das, das der Router unten, die drei Uplinks hat, nur einen der drei Uplinks nutzt.
Zur Erklärung: Jedes IP-Paket hat nur Ziel und Quelle aber nicht das Gateway als Inhalt.

Ein Ethernet-Mesh ermöglicht, dass die Gateways gezielt über ihre Mac-Adresse angesprochen werden.
Dabei kann der DHCP-Server unter Einbeziehung der Geschwindigkeit und Verbindungsqualität die Gateway-IP vergeben.

[Der Vortrag über Babel][babel1] mit [Source-Specific-Routing][source-specific-routing] addressiert die Möglichkeit, 
verschiedene Gateways zu nutzen.

Zusammenfassung
---------------

Es ist möglich und sicherlich gibt es Interesse dafür, den Breitbandausbau voranzutreiben.
Gleichzeitig ist die Infrastruktur schon teilweise vorhanden, um an schwierigen Stellen auf eine
zentrale Anbindug zu verzichten.
Bestehende Technologien, die in der Gesellschaft entwickelt werden ermöglichen das Schließen ewiger Lücken.


[babel1]: https://www.youtube.com/watch?v=1zMDLVln3XM
[source-specific-routing]: https://www.youtube.com/watch?v=1zMDLVln3XM

