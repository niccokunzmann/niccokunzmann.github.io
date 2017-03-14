---
layout: post
title: Freifunk auf dem A5-V11 3G/4G Router
language: de
---

{% assign images = site.baseurl | append:"/images" | append:page.url %}

![]({{ images }}/router.jpg)

Der Router ist [billig][ali], 8USD.
[Dieser Blogpost von OpenWrt][blog] beschreibt,
wie man OpenWrt auf den A5-V11 3G/4G Router flasht.
Das heißt: Freifunk mit dem Router ist möglich.

Status
------

Das Image funktioniert für die Besucher des Freifunks.

### Neuer Branch

Auf dem Branch [new-3g-router][new-branch] befindet sich ein neues Image.
Der restliche Blogpost kann mit "new-3g-router" statt "3g-router" durchgeführt werden.
Hier sind die Resultate:
- [Factory Image][new-factory]
- [Upgrade Image][new-upgrade]



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
   IP: `192.168.42.1`
2. Sollte es nicht angenommen werden, was bei mir der Fall war, kann zuerst das
   [OpenWrt-Image][openwrt-image] verwendet werden und dann das
   [Freifunk-Sysupgrade-Image][sysupgrade].
   IP: `192.168.1.1` danach `192.168.42.1`.

Probleme
--------

- Branch `3g-router`
  - Siehe [known, device-specific problems][blog-problems]:  
    Es können weitere LEDs angeschaltet werden und Energie gespart werden.
  - [OLSRd lädt gerade keine Plugins][pull-request]:  
    OLSR funktioniert aber in der Weboberfläche wird nichts angezeigt.
  - Es gibt eine LAN-Anschluss aber OpenVPN ist nicht dabei, weil nur 4MB
    Flashspeicher zur Verfügung stehen. [OpenVPN reduzieren][ovpn]?
  - [Privater Access Point wird verlangt][pap]:  
    Der Einrichtungsassistent braucht verlangt die Eingabe eines privaten
    Access-Points.
    Vielleicht kann man den Assistenten nicht bis zum Ende benutzen und muss
    [auf Werkseinstellungen zurücksetzen][reset].

- Branch `new-3g-router`
  - ![]({{ images }}/plugins.png)
    Ich musste nochmal nachsehen, dass alle Plugins geladen werden.
    Menu → Services → OLSR IPv4 → Menupunkt "Plugins"
  - Es gibt keinen Freifunkassistenten. [Issue][issue-ff-assist]
    
[blog]: https://wiki.openwrt.org/toh/unbranded/a5-v11
[blog-problems]: https://wiki.openwrt.org/toh/unbranded/a5-v11#known_device-specific_problems
[openwrt-image]: http://downloads.openwrt.org/chaos_calmer/15.05/ramips/rt305x/openwrt-15.05-ramips-rt305x-a5-v11-squashfs-sysupgrade.bin
[commit]: https://github.com/niccokunzmann/firmware/commit/9372d44302fc793566ec9614a74950132ab9453f
[factory]: {{ images }}/freifunk-berlin-0.3.0-alpha-75933e3-a5-v11-factory.bin
[sysupgrade]: {{ images }}/freifunk-berlin-0.3.0-alpha-75933e3-a5-v11-sysupgrade.bin
[pull-request]: https://github.com/freifunk-berlin/firmware/pull/430
[ovpn]: https://github.com/freifunk-berlin/firmware/issues/428
[pap]: https://github.com/freifunk-berlin/firmware/issues/427
[ali]: https://www.aliexpress.com/w/wholesale-3G%252F4G-Router.html?initiative_id=SB_20161128132303&site=glo&groupsort=1&SortType=price_asc&g=y&SearchText=3G%2F4G+Router
[reset]: https://wiki.openwrt.org/doc/howto/generic.failsafe#wiping_jffs2_file_system_factory_reset_to_default_config

[new-branch]: https://github.com/niccokunzmann/firmware/commits/new-3g-router
[new-factory]: {{ images }}/freifunk-berlin-1.0.0-routing-master-alpha-78992fe-a5-v11-factory.bin
[new-upgrade]: {{ images }}/freifunk-berlin-1.0.0-routing-master-alpha-78992fe-a5-v11-sysupgrade.bin
[issue-ff-assist]: https://github.com/freifunk-berlin/firmware/pull/430