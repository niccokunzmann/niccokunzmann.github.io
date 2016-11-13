---
layout: post
title: Demokratische Gesetzgebung
language: de
---
{% assign images = site.baseurl | append:"/images" | append:page.url %}

Eine motivative These:

> Gesetze und Prgrammcode sind fast das selbe.
> Das, was sie unterscheidet ist der Interpreter - Computer oder Mensch.
> - Nicco Kunzmann

Gerade nehme ich an einem Hackathon für Jugendliche Teil, [Jugend Hackt][jugendhackt].
Über ein Wochenende beschäftigen sich Jugendliche damit, wie man mit Programmen
die Welt verbessern kann. 

Ein Beispiel Hackathon
----------------------

**Freitag:** [Jugend Hackt][jugendhackt] beginnt mit einer Brainstorming Phase - hier werden Ideen entwickelt.
Danach werden diese auf Plakate gebracht und ausgehängt.
Jetzt können alle Jugendlichen sich Ideen, die nicht von ihnen sein müssen,
zuordnen. Die Gruppen, die sich so bilden, fangen dann an zu Programmieren.

**Samstag:** Der gesamte Tag ist für die Gruppen, um ihre Idee weiterzuentwickeln.
Dabei reden sie miteinander oder formulieren vertieft Programmtexte.
Mentoren stehen ihnen zur Seite und helfen, wenn es fragen gibt, und im Teamprozess.

**Sonntag:** Vormittags werden Präsentationen geübt.
Jede Gruppe hat etwas getan und stellt vor, was das Problem und das Ziel war,
welche Lösung sie gefunden haben und welche Werkzeuge sie verwendet haben.
Nachmittags werden vor internationalem Publikum, auch über Livestream die Ergebnisse präsentiert.

Rechtshackathon
---------------

Wenn ich diesen Ablauf ansehe, denke, dass dieser auch auf gesetzgebung angewendet werden kann.
Die Leute selbst brainstormen zu Problemen und entwickeln Gesetzesvorschläge.
Diese sind Prototypen und können in Zukunft weiter entwickelt werden.
Das breite Publikum wird auf gesellschaftliche Probleme und Lösungen aufmerksam.





Werkzeug Versonskontrolle
-------------------------

Ich bemerke ein Werkzeug, das unseren Hackathon prägt.
Dieses ist die Versionskontrolle.
Die Verwendung möchte ich hier zusammenfassen:


Intent, Motivation, Applicability, Structure, Participants, Collaborations, Consequences, Implementation, Sample Code, Known Uses, and Related Patterns

### Kontext

Viele Leute arbeiten zusammen an Text.
Sie wollen Änderungen austauschen und diese in ihren Text einpflegen.
Ihnen ist wichtig, welches Problem eine Änderung löst und wie sie die Lösung umsetzt.

### Problem

Ganze Texte austzutauschen, vor allem große, kann verwirren und anstrengen.
Man weiß nicht, wo Änderungen sind und ein Einpflegen erfolgt manuell.

### Lösung

Eine Versionsverwaltung wie git kann uns dabei helfen.
Leute erstellen kleine Änderungen.
Diese können dargestellt werden, wird z.B. hier wird eine Überschrift geändert:

    
    -TODO: Überschrift ausdenken
    ----------------------------
    +Diskussion
    +----------
    
Wie wäre es, das gesamte BGB auf solche Änderungen überprüfen zu können?
Man muss nicht mehr alles nebeneinander legen und suchen.
Es ist offensichtlich.

### Verwandte Arbeiten

Es gibt das [Bundesgit][bundesgit].
Dieses verwendet die Versionskontrollsoftware "git".
Auf [Github](https://github.com/bundestag/gesetze) werden die Gesetzestexte verwaltet.
Eine [Änderung](https://github.com/bundestag/gesetze/commit/01dfc35b7ec16cec048d2626dc5e2194a485f40f) sieht z.B. so aus:

[![{{ images }}/bundesgit-diff.png]({{ images }}/bundesgit-diff.png)](https://github.com/bundestag/gesetze/commit/01dfc35b7ec16cec048d2626dc5e2194a485f40f)

Ausblick
--------

Durch die in den letzten Jahren entstendene Software ist es und möglich,
auch Gesetzesänderungen transparenter zu gestalten.

Mit Hackathons zu Gesetzen können wir aufmerksamkeit auf Probleme richten und
an vielen Stellen Bürger mit in die Gesetzgebung einbringen.
Das ist ein straker demokratischer Prozess, der die Probleme mit den Betroffenen bespricht.


[jugendhackt]: https://jugendhackt.org
[bundesgit]: http://okfnlabs.org/blog/2012/12/13/bundesgit-german-laws-on-github.html