---
layout: post
title: Programmierung und Selbst
language: de
---

Ich habe beim Schul-Cloud Meetup ein Gespräch mit Jonas Wanke darüber, dass er an einer Roboterolmpiade teilnehmen will.
Ziel ist es, auf einer Karte zu Zielen zu gelangen.
Die Karte besteht aus 30cm mal 30cm Stücken und hat zwei Etagen.
Wir haben verschiedene Lösungen besprochen, die man nehmen kann.

Ein Video zeigt einen Roboter, der gerade fährt, sich um 90° dreht und weiß, wo er ist und wo er hin will. Er deht sich perfekt und stößt an, um die Wand zu bemerken.
Das erinnerte mich an die Roboterimplementierungen bei HCI2, einer Lehrveranstaltung am HPI.
Gewonnen hatte hier nicht der Roboter sondern der Algorithmus, weil dieser den ersten und den zweiten Platz im Finale gleichzeitig ins Ziel
beförderte. Das Ziel ist die Mitte vieler Ringe mit selbem Zentrum, die das Muster weiß grau schwarz haben.
Der Algorithmus geht wie folgt:
1. Wenn du falsch fährst, fahre in eine andere Richtung.
2. Wenn du richtig fährst, fahre weiter.
Er funtioniert, wenn man umkehrt und er funktioniert, wenn man eine kleine Kurve fährt, wenn man falsch fährt und eine große, wenn man richtig fährt.

Andere Algorithmen funktionieren so, dass sie einen Ring entlangfahren,
ausrechnen, wo die Mitte ist, sich um 90° drehen und dann dorthin fahren. Sie haben nicht gewonnen.

Es gibt einen grundlegenden Unterschied zwischen diesen Lösungen, den ich nochmal am Beispiel des Robocups verdeutlichen möchte:
Ein anderer Roboter würde z.B. so aussehen: Es gibt eine Basisstation, die viele Roboter aussendet. Diese haben nur Fühler, dass sie wissen, ob sie festhängen oder nicht. Sie können damit Hindernisse umschiffen.
Es gibt viele solcher Roboter und sie machen laute Geräusche.
In der ersten Phase schwärmen sie aus und suchen sich einen ruhigeren Raum, fernab von den anderen, fahren aber immer herum. Darum breiten sie sich aus.
In der zweiten Phase, wenn sie etwas gefunden haben, suchen sie die Basisstation, indem z.B. diese laut ist und sie zu ihr zurück fahren.
Hier zeigt sich der Unterschied: Es ist unklar, wie sie sich bewegen, was sie tun und wo sie sind. Dieser Prozess umarmt die Unwissenheit und Ungenauigkeit, die besteht.

Aus diesen extremen Gegensätzen lassen sich Charakterfragen ableiten:
Wähle ich den Weg der Kontrolle oder den Weg der Angst und des Ungewissen?
Das ist eine grundlegende Frage, die den Charakter eines Menschen zeigt, die Bereitschaft, sich verletztlich zu machen, seine Grenzen zu erfahren und an ihnen zu leben oder die Augen vor dem Selbst zu verschließen.

Schlussfolgerungen
------------------

In der Normopathie kann es gut klingen, wenn viele den Weg der Kontrolle wählen, auch den Weg der Kontrolle zu wählen. In HCI2 war der Weg der Kontrolle der Holzweg. Sich klar darüber zu sein, was man alles nicht beeinflussen kann, der Weg des Sieges.
Es war nicht der Roboter, der siegte - es war der Algorithmus, das Gedankenmodell des Programierers. Algorithmen als Problemlösungen unterliegen seinen Ängsten und Verdrängungen.

Lösungen, die auf Kontrolle bauen, haben oft den Anspruch, nicht sehen zu wollen, dass sie etwas nicht sehen können und in einer, wenn Menschen involviert sind, Überheblichkeit weisen sie respektlos jedes Anzeichen einer Schwäche in ihrem Modell zurück.
Das ist die Angst, eine Schutzreaktion, die viele Menschen, so auch Pogrammierer, davor bewahren soll, verletzt zu werden.
In der Programmierung äußert sie sich z.B. so wie beschrieben.

---

Dank an Jonas, dass er mit mir gesprochen hat, dazu zu kommen, das zu schreiben.
