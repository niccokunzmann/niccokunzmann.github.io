---
layout: post
title: Dynamic Frequency Selection (DFS), Radar und WLAN im 5GHz-Band
language: de
---

Für WLAN gibt es das 2.4 GHz Band, das alte, langsame und das 5GHz-Band für schnelle WLAN-Verbindungen.
Auf dem 5GHz-Band sind aber nicht nur WLANs unterwegs sondern z.B. auch der Wetterradar.

Motivation
----------

Selbst bin ich bei den Freifunkern in Potsdam unterwegs, die große WLAN-Meshnetzwerke aufbauen
([siehe Karte][apmap-potsdam]).
Zumindest das Netz in Potsdam operiert nur im 2.4GHz Spektrum auf Kanal 5.
Geräte können nur miteinander kommunizieren, wenn sie den selben Kanal haben.
Also haben wir uns in Potsdam auf Kanal 5 geeinigt.
In Berlin nutzen sie meines Wissens Kanal 13.

Da das 5GHz-Spektrum auch vom Radar genutzt wird und dieser
[von den WLAN-Geräten gestört wird][tristant], wurde Dynamic Frequency Selection (DFS) eingeführt.
Die Radare scheinen vor der Freigabe von 5GHz an WLAN da gewesen zu sein [[tristant]][[wirednot]].
Laut [Wirednot][wirednot] ist dort nicht nur der Wetterradar sondern auch in den USA die
NASA, Hurricane-Tracker, Militär und mehr.
Laut [tristant] haben die Wetteradare in der EU es versäumt, Regulierungen mitzubestimmen und
sind nun ziemlich gestört.
Laut [traistant] sind die Wetteradare von 5600-5650MHz unterwegs.
DFS haben wir aber auf allen Frequenzen von 5470MHz bis 5725MHz [[WAS-WLAN-DE]] das sind alle Frequenzen, die auf 5GHz für WLAN draußen genutzt werden können.
In [[EN301893], Seite 104, Tabelle D.1] sind die Channel-Availability-Check-Zeit (CAC-Zeit), die Zeit, um zu testen, ob der Kanal wieder frei ist, ist höher als bei den anderen Kanälen.

Beschränkungen
--------------

Die Nutzung von 5GHz WLAN außerhalb von Räumen ist auf 1 Watt bzw. durchschnittlich ca. 0.5 Watt beschränkt [[WAS-WLAN-DE]].
Außerdem müssen WLAN-Geräte bei der Erkennung eines Radars das Senden auf dem Kanal für
einen gewissen Zeitraum unterlassen.

Implementierungen
-----------------

OpenWRT/LEDE beinhalten Module, um auf dem Atheros Chipsatz DFS umzusetzen [[openwrt-dfs]].
Gesetzeslagen scheinen sind bis 2011 dokumentiert [[linux-wireless]].
Laut [wireless-db] sind die CAC-Zeiten nicht aufgeführt.
In [nl80211.h] werden die Events für den Radar beschrieben und die Kanaleigenschaften.
`NL80211_ATTR_DFS_CAC_TIME` beschreibt die Zeit, die für den CAC genutzt werden soll.
In [reglib.h] wird die `ieee80211_reg_rule` beschrieben.
Diese enthält auch eine Zeit für die DFS `dfs_cac_ms`.
In [reglib.c] wird die `dfs_cac_ms` gesetzt, in Klammern `()`.
Diese sind in der [wireless-db] aber nicht auf die Werte aus [EN301893] gesetzt.
Das [erfrage ich mal][mail-wireless-db].


Meshing
-------

Das Meshing über 802.11s ist im 5GHz Band möglich.
Allerdings kann es auf allen Kanälen, die außerhalb von Räumen verwendet werden dürfen,
zu Radarstörungen kommen.
Laut Gesetz sind diese Radare zu schützen und das Senden einzustellen.
Es gibt Möglichkeiten, einen Kanalwechsel zu initiieren.
Allerdings ist es schwierig, einen Kanalwechsel für ein ganzes, dezentrales Meshnetz zu initiieren.
Das wird vorerst zu Spaltung führen.
Es ist interessant, einen Algorithmus zu entwerfen, der es erlaubt,
dass die ein 5GHz Mesh wieder zu einem Kanal konvergiert.



[apmap-potsdam]: https://monitor.freifunk-potsdam.de/ff/apmap
[openwrt-dfs]: https://openwrt.org/docs/guide-user/network/wifi/basic#dfsradar_detection
[tristant]: https://www.itu.int/md/dologin_md.asp?id=R09-SEM.WMO-C-0019!!PDF-E
[wirednot]: https://wirednot.wordpress.com/2014/01/07/what-else-is-in-the-5-ghz-spectrum-hint-its-not-just-weather-radar/
[EN301893]: http://www.etsi.org/deliver/etsi_en/301800_301899/301893/02.00.07_20/en_301893v020007a.pdf
[WAS-WLAN-DE]: https://www.bundesnetzagentur.de/SharedDocs/Downloads/DE/Sachgebiete/Telekommunikation/Unternehmen_Institutionen/Frequenzen/Allgemeinzuteilungen/2010_07_WLAN_5GHz_pdf.pdf?__blob=publicationFile&v=3
[linux-wireless]: https://wireless.wiki.kernel.org/en/developers/DFS
[wireless-db]: https://git.kernel.org/pub/scm/linux/kernel/git/sforshee/wireless-regdb.git/tree/db.txt#n368
[nl80211.h]: https://git.kernel.org/pub/scm/linux/kernel/git/mcgrof/crda.git/tree/nl80211.h#n3988
[reglib.h]: https://git.kernel.org/pub/scm/linux/kernel/git/mcgrof/crda.git/tree/reglib.h#n31
[reglib.c]: https://git.kernel.org/pub/scm/linux/kernel/git/mcgrof/crda.git/tree/reglib.c#n846
[mail-wireless-db]: http://lists.infradead.org/pipermail/wireless-regdb/2018-March/001162.html

