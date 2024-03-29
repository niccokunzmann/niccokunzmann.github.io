---
layout: post
title: "Weitere Images für die Berliner Freifunk-Firmware"
language: de
---

Ich habe die Firmware der Berliner auf meinem Debian für diese Router gebaut:
- D-Link [DIR-615](https://openwrt.org/toh/d-link/dir-615)
- D-Link [DIR-600 B](https://openwrt.org/toh/d-link/dir-600)
- Netgear [N300 WNR2000v5](https://openwrt.org/toh/netgear/wnr2000)
- Netgear [N600 WNDR3400v3][N600]
- TP-Link [TL-WA901nd][tl-wa901nd]
- TP-Link [Archer C50](https://openwrt.org/toh/tp-link/archer-c50)
- TP-Link [Archer D50][Issue 695]


Wie in der [README] beschrieben, muss man dazu Pakete installieren.

## DIR-615 D

[Branch][DIR-615]

Hier musste ich nur die Konfigurationsdateien erstellen.
Bauen kann man das dann mit

    make TARGET=ramips-rt305x PACKAGES_LIST_DEFAULT=default_4MB

Zum flashen von OpenWRT auf den Router muss man die RESET-Taste beim Starten
lange drücken, damit man in den Failsafe-Modus kommt.
Dieser öffnet eine Webseite zum Hochladen unter 192.168.0.1.

Images:

- [hedy-1.0.1-dir-615-d-factory.bin]({% include images %}/hedy-1.0.1-dir-615-d-factory.bin)
- [hedy-1.0.1-dir-615-d-sysupgrade.bin]({% include images %}/hedy-1.0.1-dir-615-d-sysupgrade.bin)

## DIR-600 B

[Branch][DIR-615]

Verwendet die selbe Datei [configs/ramips-rt305x.config](https://github.com/niccokunzmann/firmware/blob/0015f119dc6aca4663dd8f038e72eee82aa96490/configs/ramips-rt305x.config)
wie der DIR-615 D.
Kompiliert mit folgendem Befehl. `-j7` steht für die Nutzung von
7 CPU-Kernen.

```
make PACKAGES_LIST_DEFAULT=default_4MB PROFILES=dir-600-b1 \
     -j7 TARGET=ramips-rt305x
```

- [hedy-1.0.2-rc1-52c60b6-dir-600-b1-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-dir-600-b1-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-dir-600-b1-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-dir-600-b1-sysupgrade.bin)

## WNR2000v5

Es stellt sich heraus, dass dieser nicht in OpenWRT eingeflossen ist.
Allerdings gibt es Pull Request [1256], die die Änderungen beinhaltet.

Die [config.mk]-Datei beinhaltet den Commit von OpenWRT, auf dem
der Hedy-1.0.1-Release aufbaut.
Die Änderungen aus der Pull-Request [1256] habe ich auf diesen draufgesetzt,
sodass die Firmware für diesen Router gebaut wird, siehe [Branch][wnr-lede].

Bauen geht mit 

    make PACKAGES_LIST_DEFAULT=default_4MB

Images:

- [hedy-1.0.1-ar71xx-generic-wnr2000v5-squashfs-dni.img]({% include images %}/hedy-1.0.1-ar71xx-generic-wnr2000v5-squashfs-dni.img)
  Es gibt kein Sys-Upgrade-Image und dieses Image kann man nicht mit OpenWRT
  über die Webseite upgraden.

Mir fällt auf, dass der Name in der Datei `firmware/openwrt/build_dir/target-mips_24kc_musl-1.1.16/freifunk-berlin-imagebuilder-1.0.1-ar71xx-generic.Linux-x86_64/Makefile` anders aussieht:

```
REALWNR1000V2:
    NETGEAR WNR1000V2
    Packages: 
WNR1000V2_VC:
    NETGEAR WNR1000V2-VC
    Packages: 
WNR2000:
    NETGEAR WNR2000V1
    Packages: 
WNR2000V3:
    NETGEAR WNR2000V3
    Packages: 
WNR2000V4:
    NETGEAR WNR2000V4
    Packages: 
wnr2000v5:
    NETGEAR WNR2000V5
    Packages: kmod-block2mtd kmod-gpio-nxp-74hc164
WNR2200:
    NETGEAR WNR2200
    Packages: kmod-usb-core kmod-usb2 kmod-usb-ledtrig-usbport
```

Was ich lernte: Kernel Packages muss man, wenn sie fehlen, in der 
config-Datei als Modul (=m) oder als eingebunden (=y) markieren, damit diese
auch gefunden werden, wenn die packages in das Image installiert werden.
Also: Wenn opkg die Packages nicht installieren kann, kann man sie
in der Config-Datei aktivieren. 

## Netgear N600

Der [N600] hat folgenden Image-Namen:
`brcm47xx/mips74k/openwrt-18.06.1-brcm47xx-mips74k-netgear-wndr3400-v3-squashfs.chk`

Deswegen muss ich diese Dateien erstellen:
```
configs/brcm47xx-mips74k.config
profiles/brcm47xx-mips74k.profiles
```

Die Änderungen zum Bau sind im Branch [wndr3400v3].

```
~/firmware/openwrt/build_dir/target-mipsel_74kc_musl-1.1.16/freifunk-berlin-imagebuilder-1.0.1-brcm47xx-mips74k.Linux-x86_64$
grep -ri 3400
```
hat mir das gezeigt:
```
target/linux/brcm47xx/image/Makefile:define Device/netgear-wndr3400-v3
```

Deswegen ist das Target `netgear-wndr3400-v3`.

```
opkg_install_cmd: Cannot install package kmod-usb2.
```

Bedeutet, dass ich 
```
CONFIG_DEFAULT_kmod-usb2=y
CONFIG_PACKAGE_kmod-usb2=y
```
in der Konfiguration hinzugebe.
Weil das dann nicht klappt, habe ich mich entschlossen, in die Pakete `-kmod-usb2` geschrieben,
weshalb kein USB2-Support da ist.

Es stellt sich heraus, dass **[keine WLAN-Unterstützung für den 3400v3](https://openwrt.org/toh/netgear/wndr3400)** da ist.
Hier also die Firmware-Images:

- [hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3400-v1-squashfs.chk]({% include images %}/hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3400-v1-squashfs.chk)
- [hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3400-v2-squashfs.chk]({% include images %}/hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3400-v2-squashfs.chk)
- [hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3400-v3-squashfs.chk]({% include images %}/hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3400-v3-squashfs.chk)
- [hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3700-v3-squashfs.chk]({% include images %}/hedy-1.0.1-brcm47xx-mips74k-netgear-wndr3700-v3-squashfs.chk)

## TP-Link TL-WA901ND

Dieser Router wird nicht so empfohlen, weil er nur 4mb Flash hat.

Kompiliert mit

```
git checkout Hedy-1.0.2-rc1
make PACKAGES_LIST_DEFAULT=default_4MB PROFILES=tl-wa901nd-v2
```

- [hedy-1.0.2-rc1-52c60b6-tl-wa901nd-v2-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wa901nd-v2-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wa901nd-v2-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wa901nd-v2-sysupgrade.bin)

## TP-Link TL-941ND

Dieser Router wird nicht so empfohlen, weil er nur 4mb Flash hat.

Kompiliert mit

```
git checkout Hedy-1.0.2-rc1
make PACKAGES_LIST_DEFAULT=default_4MB PROFILES=tl-wr941nd-v6 TARGET=ar71xx-generic
```

- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v2-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v2-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v2-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v2-sysupgrade.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v3-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v3-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v3-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v3-sysupgrade.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v4-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v4-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v4-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v4-sysupgrade.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v5-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v5-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v5-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v5-sysupgrade.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v6-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v6-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v6-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-tl-wr941nd-v6-sysupgrade.bin)

## TP-Link Archer C50 v1

Kompiliert mit

```
make PACKAGES_LIST_DEFAULT=default PROFILES='ArcherC50' TARGET=ramips-mt7620
```

- [hedy-1.0.2-rc1-52c60b6-ArcherC50-factory.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-ArcherC50-factory.bin)
- [hedy-1.0.2-rc1-52c60b6-ArcherC50-sysupgrade.bin]({% include images %}/hedy-1.0.2-rc1-52c60b6-ArcherC50-sysupgrade.bin)

## TP-Link Archer D50

Für diesen Router gibt es seit April 2019 eine Firmware.
Stand Juni 2019 gibt es noch kein Factory-Image.
Der Router kann also nicht über die Weboberfläche geflasht werden.

```
git checkout daily/upstream-master
echo "tplink_archer-d50-v1" > "profiles/ath79-generic.profiles"
make PACKAGES_LIST_DEFAULT=notunnel TARGET=ath79-generic
```

- [freifunk-berlin-dev-daily-82ab7eb-tplink_archer-d50-v1-sysupgrade.bin]({% include images %}/freifunk-berlin-dev-daily-82ab7eb-tplink_archer-d50-v1-sysupgrade.bin)
- [Issue 695]

## Weitere Firmwares

- [Freifunk auf dem Raspi](https://niccokunzmann.github.io/blog/2016-11-23/Freifunk-mit-Raspberry-Pi)
    erklärt auch mehr, was die einzelnen Sachen bedeuten.
- [ZSUN](https://niccokunzmann.github.io/blog/2016-11-29/Freifunk-mit-zsun-wifi-sdcard-reader)
- [3G-Router](http://niccokunzmann.github.io/blog/2017-03-04/Freifunk-auf-3G-Router)
  

[README]: https://github.com/freifunk-berlin/firmware/#readme
[DIR-615]: https://github.com/niccokunzmann/firmware/tree/dir-615
[1256]:https://github.com/lede-project/source/pull/1256
[config.mk]: https://github.com/niccokunzmann/firmware/blob/wnr2000v5/config.mk
[wnr-lede]: https://github.com/niccokunzmann/source/tree/wnr2000v5-ff-berlin
[N600]: https://openwrt.org/toh/netgear/wndr3400
[wndr3400v3]: https://github.com/niccokunzmann/firmware/tree/wndr3400v3
[tl-wa901nd]: https://oldwiki.archive.openwrt.org/toh/tp-link/tl-wa901nd#version_2x
[Issue 695]: https://github.com/freifunk-berlin/firmware/issues/695

