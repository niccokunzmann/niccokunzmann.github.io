---
layout: post
title: Crowd-Leihe
language: de
---

Tom gesehen:
- für Werkzeug
- für Sportgeräte
- Pfandsystem für Kurze Veranstaltungen
- Bedenken:
  - digitales system
  - datenschutz, Kinder an System anmelden

Hier wird ein Leih- und Verwaltungssystem für Ressourcen und Gegenstände
beschrieben.

Ziel ist es, dass jeder jedem geben kann, in unter 5 Sekunden

- Generell
  - alles offen
  -> Lizenz!

- man kann sich identifizieren
  - Anmelden
  - hat seinen Account
  - eine Geschichte von Leihungen
  - Ein Markdown-Freitextfeld
  - Man ist durch andere Nutzer verifiziert
    -> signaturen wären super, wie git, nur offline
    -> QR-code scannen zum Übertragen der Signatur

- Leihen:
  - Man scannt die Inventarnummer
  - der andere stimmt der Übergabe zu
  - eventuell wird ein foto gemacht
    - egal
    - wäre gut - vorgabe vom Eigentümer
  
- Die Inventarnummer kann jeder für sich anlegen.
  - Form: QR-Code, Text, Zahl, Scan-code, ISBN
  - man bekommt eine kürzeste, freie Inventarnummer vorgeschlagen
  - man kann gleich ganz viele bekommen
  - Zeug ist unter crowd-leihe.de/i/<inventarnummer> erreichbar
    - html
    - json

- Es gibt einen Eigentümer
  - dieser verfolgt die Ware
  - Eigentum kann übertragen werden
  - Man kann sehen
    - wer es hat und zurückfordern,
    - sehen, über welche Personen man mit der anderen Verbunden ist.
  
- Waren verfolgen
  - man kann sie gelistet angezeigt bekommen

- Zeug
  - hat ein foto
  - hat eine ID=Inventarnummer
  - eine Beschreibung
  - die Beschreibung kann verändert werden

Probleme:

- zwei oder mehr Leute tauschen die selben breadboards miteinander  
  -> herausfinden, ob beide dann neue Eigentümer werden können