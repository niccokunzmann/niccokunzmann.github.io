---
layout: post
title: Qubes mit WLAN verbinden und das WLAN-Symbol in die Taskleiste legen
language: de
---

Von Ubuntnu, Fedora und Windows bin ich gewohnt, in der Programmleiste auch ein Icon zu haben,
mit dem ich mich mit dem WLAN verbinden kann und die mir den WLAN-Status anzeigt.
So ein Icon möchte ich zu Qubes hinzufügen.

<!-- more -->

Dazu klicke ich 

1. oben links auf das Qubes Symbol
2. `System Tools`
3. `Sitzung und Startverhalten`

Es öffnet sich ein Fenster `[Dom0] Sitzung und Startverhalten`.
Dort klicke ich auf den dritten Reiter `Automatisch gestartetet Anwendungen`.
Unten kann ich durch Klick auf `+ Hinzufügen` ein neues Fenster öffnen.
Dort gebe ich folgendes ein:

- Name: `Network Manager Applet` - hier kann man sich was ausdenken, sodass man sich erinnert.
- Beschreibung: `` hier kann man etwas beschrieben, was dann mehr Text zum Erinnern ist.
- Befehl: `qvm-run sys-net nm-applet`

Nun auf `↩ OK` klicken und bei jedem Start wird WLAN-Applet in die Leiste eingefügt.

Um den Befehl vorher auszuführen, kann `qvm-run sys-net nm-applet` in das Terminal eingegeben werden.

