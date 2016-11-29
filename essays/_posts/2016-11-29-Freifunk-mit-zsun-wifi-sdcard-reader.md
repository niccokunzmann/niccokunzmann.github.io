---
layout: post
title: Freifunk mit ZSUN WIFI SDCard Reader
language: de
---

{% assign images = site.baseurl | append:"/images" | append:page.url %}

![][image-splash]

Freifunk Selbst Flashen
-----------------------

[Diesem Tutorial][ffdresden] nachgehen und ersatzweise diese
[SD100-update.tar.gz][first-flash] verwenden.

Links zum Thema
---------------

- [Freifunk Dresden][ffdresden]
- Hackerspace Warschau:
  - [Format-Ersteller][formater]
  - [wiki post about zsun][wiki]
- [Zsun-Openwrt][zsun-openwrt]
- [Amazon][amazon]
- [Zsun-Branch der Firmware][firmware-nicco]
- Downloads:
  - [kathleen-0.2.0-beta+9227220-zsun-sdreader-kernel.bin][kernel]
  - [kathleen-0.2.0-beta+9227220-zsun-sdreader-rootfs-squashfs.bin][rootfs]
  - [kathleen-0.2.0-beta+9227220-zsun-sdreader-sysupgrade.bin][sysupgrade]
  - [SD100-update.tar.gz][first-flash]

Freifunk Firmware auf dem Zsun-Stick
------------------------------------

Der Zsun-Stick ist recht kostengünstig: 10€.
Deswegen wollte ich ihn mal als Freifunk-Router austesten.

Im [Wiki des Freifunk Dresden][ffdresden] fand ich eine Beschreibung, wie
der Zsun-Stick mit OpenWRT bespielt werden kann.
Im letzten Post habe ich das FF-OpenWRT für den Raspberry Pi gebaut.
Deswegen ging das Bauen für den Zsun-Stick recht schnell.
([Einen Commit zu cherry-picken][commit] hat mich Stunden gekostet, weil ich einen Patch mergen musste.)

Das gebaute kann man hier finden:

- Zum ersten Flashen die
  - [SD100-update.tar.gz][first-flash] - mit dieser Datei flasht man das
    Freifunk-Image drauf (ungetestet).
  - [Der Freifunk Dresden][ffdresden] beschreibt, wie man das Image flasht.
    Als Beispiel haben sie das OpenWRT vom [Hackerspace Warschau][wiki],
    welche OpenWRT ohne Freifunk beinhaltet.
- Wenn man also schon OpenWRT auf dem Stick hat, kann man damit zu Freifunk
  upgraden:
  - [kathleen-0.2.0-beta+9227220-zsun-sdreader-sysupgrade.bin][sysupgrade]
- Die Dateien gitb es auch noch, mit [zsun-fw-tools][formater] kann man daraus
  die [SD100-update.tar.gz][first-flash] machen:
  - [kathleen-0.2.0-beta+9227220-zsun-sdreader-kernel.bin][kernel]
  - [kathleen-0.2.0-beta+9227220-zsun-sdreader-rootfs-squashfs.bin][rootfs]

Bewertung
---------

Der Zsun-Stick hab 18db Funkleisung, andere Router haben Antennen und 21db.
Der Stick ist also schwächer.


[image-splash]: {{ images }}/zsun-splash.jpg
[ffdresden]: http://wiki.freifunk-dresden.de/index.php/Zsun_Wifi-Kartenleser
[amazon]: https://www.amazon.de/drahtloser-Datenaustausch-Datentr%C3%A4ger-wireless-Kartenleser/dp/B01LY8SPML/ref=sr_1_3?ie=UTF8&qid=1479804243&sr=8-3&keywords=Zsun+Wifi-Kartenleser
[formater]: https://code.hackerspace.pl/informatic/zsun-fw-tools
[zsun-openwrt]: https://github.com/niccokunzmann/openwrt-zsun/tree/zsun4
[firmware-nicco]: https://github.com/niccokunzmann/firmware/tree/zsun
[wiki]: https://wiki.hackerspace.pl/projects:zsun-wifi-card-reader
[commit]: https://github.com/niccokunzmann/openwrt-zsun/commit/f5284f9f9ad80e50ec37c31915ee69c5a1f7fac6

[kernel]: {{ images }}/kathleen-0.2.0-beta+9227220-zsun-sdreader-kernel.bin
[rootfs]: {{ images }}/kathleen-0.2.0-beta+9227220-zsun-sdreader-rootfs-squashfs.bin
[sysupgrade]: {{ images }}/kathleen-0.2.0-beta+9227220-zsun-sdreader-sysupgrade.bin
[first-flash]: {{ images }}/SD100-update.tar.gz
