---
layout: post
title: Freifunk auf dem A5-V11 3G/4G Router
language: de
---

{% assign images = site.baseurl | append:"/images" | append:page.url %}

![]({{ images }}/router.jpg)

[Dieser Blogpost von OpenWrt][blog] beschreibt,
wie man OpenWrt auf den A5-V11 3G/4G Router flasht.
Das heißt: Freifunk mit dem Router ist möglich.

Implementierung
---------------

Um Freifunk auf den Router zu bekommen, musste dieser kompiliert werden.
Das Image heißt
[`openwrt-15.05-ramips-rt305x-a5-v11-squashfs-sysupgrade.bin`][openwrt-image].

    openwrt-15.05-ramips-rt305x-a5-v11-squashfs-sysupgrade.bin
                  |      |      |
                  |      |      +-- profile
                  |      +-- target
                  +-- architecture?

Dieses Wissen hilft, die Parameter für das Bauen einzustellen.
Der [Commit][commit] fasst das zusammen.

Selber Bauen
------------

Um das Image selber zu bauen, können folgende Befehle ausgeführt werden.

    git clone --branch 3g-router https://github.com/niccokunzmann/firmware.git
    cd firmware
    make TARGET=ramips-rt305x V=s j=4 PACKAGES_LIST_DEFAULT=default_4MB

Dabei entstehen Dateien in `firmwares/ramips-rt305x/default_4MB/`:

- [freifunk-berlin-0.3.0-alpha-75933e3-a5-v11-factory.bin][factory]
- [freifunk-berlin-0.3.0-alpha-75933e3-a5-v11-sysupgrade.bin][sysupgrade]

Flashen
-------

Dazu gibt es den [Blogpost von OpenWrt][blog].
Folgende Kombinationen ergeben sich:

1. Das [Freifunk-Factoryimage][factory] kann verwendet werden.
2. Sollte es nicht angenommen werden, was bei mir der Fall war, kann zuerst das
   [OpenWrt-Image][openwrt-image] verwendet werden und dann das
   [Freifunk-Sysupgrade-Image][sysupgrade].

Probleme
--------

- Siehe [known, device-specific problems][blog-problems]:  
  Es können weitere LEDs angeschaltet werden und Energie gespart werden.
- [OLSRd lädt gerade keine Plugins][pull-request]:  
  OLSR funktioniert aber in der Weboberfläche wird nichts angezeigt.
- Es gibt eine LAN-Anschluss aber OpenVPN ist nicht dabei, weil nur 4MB
  Flashspeicher zur Verfügung stehen. [OpenVPN reduzieren][ovpn]?
- [Privater Access Point wird verlangt][pap]:  
  Der Einrichtungsassistent braucht verlangt die Eingabe eines privaten
  Access-Points. Vielleicht kann man den Assistenten nicht bis zum Ende
  benutzen.

[blog]: https://wiki.openwrt.org/toh/unbranded/a5-v11
[blog-problems]: https://wiki.openwrt.org/toh/unbranded/a5-v11#known_device-specific_problems
[openwrt-image]: http://downloads.openwrt.org/chaos_calmer/15.05/ramips/rt305x/openwrt-15.05-ramips-rt305x-a5-v11-squashfs-sysupgrade.bin
[commit]: https://github.com/niccokunzmann/firmware/commit/9372d44302fc793566ec9614a74950132ab9453f
[factory]: {{ images }}/freifunk-berlin-0.3.0-alpha-75933e3-a5-v11-factory.bin
[sysupgrade]: {{ images }}/freifunk-berlin-0.3.0-alpha-75933e3-a5-v11-sysupgrade.bin
[pull-request]: https://github.com/freifunk-berlin/firmware/pull/430
[ovpn]: https://github.com/freifunk-berlin/firmware/issues/428
[pap]: https://github.com/freifunk-berlin/firmware/issues/427