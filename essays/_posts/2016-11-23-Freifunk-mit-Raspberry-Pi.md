---
layout: post
title: Freifunk mit Raspberry Pi
language: de
---

## Update 1.4.2018

Bei diesem Image handelt es sich um das Image für den Raspberry Pi 1 Modell B.
In den [Release Notes für Version Hedy 1.0.2](https://github.com/freifunk-berlin/firmware/tree/v1.0.2#release-note-102-hedy---2019-01-21) steht, dass man das Image für Raspberry Pi und Raspberry Pi 3 selber kompilieren kann.
Der Code hier verwendet den Code von Kathleen, was die Version der Freifunk Firmware ist, die vor Hedy released wurde.

---

[Gebautes Kathleen-Image für Freifunk runterladen.][image]

Warum mache ich Freifunk mit dem Raspberry Pi?

- Ich habe alte Raspberry Pi rumliegen.
- Im Haus haben alle Wohnungen einen USB-Anschluss.
- Der Raspberry Pi verbraucht mit USB-Adapter ca. 1A bei 5V, macht so 8-16€ im Jahr Stromkosten.
- Ich kompiliere OpenWRT mal selbst.
- Ich möchte den Raspi vielleicht bei anderen aufstellen und ihnen Freifunk beibringen.


Warum der Blogpost:

- Es ist jetzt Tag 3 und ich habe es geschafft.
  Ich hoffe, andere finden das und es dauert nicht so lang.

![{% include images %}/raspi.jpg]({% include images %}/raspi.jpg)

Verwandte Bemühen
-----------------

Ich habe recherchiert und 
einen [Blogpost von 2013][openwrt-raspi-blog]
gefunden.
Dieser beschreibt, wie man ein fertiges OpenWRT-Image auf den Raspberry Pi spielt.
Das hat funktioniert und sagt mir, dass der Raspberry Pi unterstützt wird.
Allerdings ist das Image veraltet.

[Hier][raspi-build]
habe ich einen offiziellen OpenWRT-Build für den Raspberry Pi gefunden.
Jetzt ist nur noch die Frage, wie kann ich das mit der Freifunk-Firmware verwenden?
Dann habe ich den Wizard, die Anleitungen und kann es auch anderen schmackhafter machen.

[Steffen Volkmann][volkmann1] setzte sich auf Basis dieses Blogposts mit der
Firmware weiter auseinander.
Es steht ein [Freifunk-Raspi in der Isoldenstraße in Werder][volkmann2].
Folgendes Feedback gab er:

> Das Image habe ich jetzt wie folgt gebaut:
> ```
> git clone https://github.com/niccokunzmann/firmware.git -b RaspberryPi
> cd firmware
> make TARGET=brcm2708 PACKAGES_LIST_DEFAULT=default_pi
> ```
> 
> Das funktioniert allerdings erst einigen Anpassungen:
> 1. in der `firmware/packages/default_pi.txt` habe ich die Zeile `kmod-usb2-kmod-rt2800-lib` auskommentieren.
> 2. Die Packete `linux-3.18.44.tar.xz` und `ethtool-3.18.tar.xz` konnten nicht geladen werden. Beide habe ich manuell geladen und im `./firmware/openwrt/dl` folder abgelegt:
>   - wget [https://www.kernel.org/pub/linux/kernel/v3.x/linux-3.18.44.tar.xz](https://www.kernel.org/pub/linux/kernel/v3.x/linux-3.18.44.tar.xz)
>   - wget [https://sources.lede-project.org/ethtool-3.18.tar.xz](https://sources.lede-project.org/ethtool-3.18.tar.xz) --no-check-certificate
> 
> Auf Basis dieses Images kann ich meine Experimente Fortsetzen.

- [Raspberry Pi Performance-Vergleich für VPN][performance]
- [Weiteres von Steffen Volkmann][volkmann-further]

Das Image selber bauen
----------------------

Ich habe also ein Image selbst gebaut.

Über das [Buildbot-Repository](https://github.com/freifunk-berlin/buildbot)
bin ich zum [Firmware-Repository](https://github.com/freifunk-berlin/firmware)
gekommen.

Dieses hat eine [Development-Section][fff-dev],
in der alles steht, wie man die Firmware baut.

Meine Änderungen
----------------

Die Ändernugen, die ich gemacht habe, sind verfügbar auf
[niccokunzmann/firmware auf dem RaspberryPi branch][pi_branch].
Man kommt so ran:

    git clone https://github.com/niccokunzmann/firmware.git -b RaspberryPi

Es gibt nur [einen Commit][pi_commit], den ich gemacht habe.
Dadurch sind die Änderungen im nächsten Abschnitt alle zu einem Commit
zusammengefasst, den man sich für neue Kathleen-Versionen holen kann.
So könnte es aussehen (ungesteted, bitte Feedback):

    git clone https://github.com/freifunk-berlin/firmware.git
    cd firmware
    git fetch https://github.com/niccokunzmann/firmware.git 
    git cherry-pick 6be684ff9460cb8370d6e87d5d0b5f0d1d984a56

Danach kann man den üblichen [Build-Prozess][build_process] anstoßen.

Änderungen Selber machen
------------------------

Ich habe folgende Änderungen vorgenommen:

- Eine Datei `firmware/configs/brcm2708.config` erstellt:

        CONFIG_TARGET_brcm2708=y
        CONFIG_TARGET_brcm2708_bcm2708=y
        CONFIG_TARGET_brcm2708_bcm2708_Default=y
        CONFIG_KERNEL_RELAY=y
        CONFIG_PACKAGE_MAC80211_DEBUGFS=y
        CONFIG_PACKAGE_MAC80211_MESH=y
        CONFIG_PACKAGE_kmod-ath=y
        CONFIG_PACKAGE_kmod-ath10k=y
        CONFIG_PACKAGE_kmod-ath5k=y
        CONFIG_PACKAGE_kmod-ath9k=y
        CONFIG_PACKAGE_kmod-ath9k-common=y
        CONFIG_PACKAGE_kmod-ath9k-htc=y
        CONFIG_PACKAGE_kmod-rt2800-lib=y
        CONFIG_PACKAGE_kmod-rt2800-usb=y
        CONFIG_PACKAGE_kmod-rt2x00-lib=y
        CONFIG_PACKAGE_kmod-rt2x00-usb=y

        CONFIG_DEFAULT_kmod-rt2800-lib=y
        CONFIG_DEFAULT_kmod-rt2800-usb=y
        CONFIG_DEFAULT_kmod-rt2x00-lib=y
        CONFIG_DEFAULT_kmod-rt2x00-usb=y



    Im der [Diskussion][diskussion] finden sich weitere Hinweise.
        
- Eine Datei `firmware/profiles/brcm2708.profiles` erstellt:

        RaspberryPi

- Eine Datei `firmware/packages/default_pi.txt` erstellt.
  Diese ist eine Kopie der Datei `firmware/packages/default.txt`.
  Darin stehen die Packages und Treiber, die verwendet werden sollen.
  Dadurch kann man dafür sorgen, dass der Teiber für den WIFI-Stick schon
  in OpenWRT vorhanden ist.
  Folgendes habe ich an den Inhalt der `default.txt` angehängt:

        # usb WIFI Sticks
        kmod-usb-core
        kmod-usb2-kmod-rt2800-lib
        kmod-rt2800-usb
        kmod-rt2x00-lib
        kmod-rt2x00-usb
  
  Den gesamten Inhalt der Datei kann man [hier][default_pi] sehen.
        
- Die Datei `firmware/config.mk` in der Zeile mit `TARGET=` geändert:

        # default parameters for Makefile
        SHELL:=$(shell which bash)
        TARGET=brcm2708
        PACKAGES_LIST_DEFAULT=default backbone
        OPENWRT_SRC=git://github.com/openwrt/openwrt.git
        OPENWRT_COMMIT=1b6dc2e48ce654a004a7d0b98d7070a515424595
        MAKE_ARGS=

    Das muss man nicht machen und kann auch die Parameter verwenden, die in der
    Development-Dokumentation stehen:
    
        make TARGET=brcm2708 PACKAGES_LIST_DEFAULT=default_pi

Dann konnte ich das Image bauen, mit 4 genutzen Kernen (`-j4`),
Debug-Output (`V=s`)
und den zusätzlichen Treibern (`PACKAGES_LIST_DEFAULT=default_pi`):

    make -j4 V=s PACKAGES_LIST_DEFAULT=default_pi
    
Dieses ist dann im Ordner `firmware/firmwares/brcm2708/default_pi/` erhältlich.

### Gelerntes

Zum Kompilieren habe ich folgendes gelernt:

- Es gibt noch andere Packages für WIFI-Sticks: [1][stick2], [2][stick3]
  

- Welche Profiles gibt es noch außer `Default`? ([Quelle][profiles], [Kopie][profiles-kopie])

- ```
  CONFIG_TARGET_brcm2708_bcm2708_Default=y
                |        |       + profiles http://pastebin.com/WbudpBDJ
                |        + folder firmware/openwrt/target/linux/brcm2708/bcm2708
                + folder firmware/openwrt/target/linux/brcm2708
  ```

- `brcm2708.profiles`
  → `firmware/openwrt/target/linux/``brcm2708/bcm2708/profiles/RaspberryPi.mk`

- These:

        CONFIG_PACKAGE_kmod-rt5370-lib=m
        CONFIG_PACKAGE_kmod-rt5370-usb=m
         
    bringen nichts. Das sind nur Variablen.

- In der default_pi.txt kann ich zusätzliche treiber installieren, sodass ich
  diese nicht extra installieren brauche.

Image auf SD-Karte tun
----------------------

[Gebautes Kathleen-Image für Freifunk runterladen.][image]

Make machte ich in einer Linux-VM, Bespielen auf **Windows**:

Durch einen Hinweis vom OpenWRT-Wiki, habe ich 
[Win32DiskImager][Win32DiskImager] heruntergeladen und installiert.
Dieser kann .img-Dateien direkt auf die SD-Karte spielen.

Zusätzlich brauchte ich noch [SDFormatter][SDFormatter], um die SD-Karte ab
und zu zu formatieren.

Verbinden
---------

Jetzt habe ich die Software noch für Freifunk angepasst.
Jedes Freifunk hat dort eine eigene Anleitung.
Ich bin der [Anleitung von Potsdam][kathleen] gefolgt.

Die IP-Adresse, die nach dem Boot am Ethernet-Port anliegt, ist

    192.168.42.1

Dorthin konnte ich mich verbinden, nachdem ich mir die IP `192.168.42.2`
gegeben hatte.

OpenVPN automatisch starten
---------------------------

Ich habe festgestellt, dass OpenVPN nach dem Neustart immer aus war.
Man kann einstellen, dass es automatisch gestartet wird.

Das macht folgender Befehl ([Quelle][openvpn]):

    /etc/init.d/openvpn enable

Weiteres
--------

Danach habe ich den Freifunk-Wizard benutzt und ein `WAN`-Netzwerk einrichtet,
das über `eth0` als DHCP-Client nach einer IP-Adresse fragt.
    
- [Gebautes Kathleen-Image für Freifunk runterladen.][image]
- [Diskussion][diskussion]

Purgatory
=========

Zu schade zum Löschen aber auch nicht nützlich:

WLAN-Stick installieren
-----------------------

**Erledigt: Kann man das Package auch schon gleich mitinstallieren, wenn man
das Image baut?** - Ja, das geschieht oben schon deswegen brauchen wir diese Section nicht mehr.

Um den Logilink-Wifi Stick mit Namen WL0084B für OpenWRT zu installieren,
habe ich die [packages][packages] entpackt mit einem HTTP-Server geserved:

    cd packages
    py -3 -m http.server

Danach habe ich die Konfiguration für den Raspberry Pi auf meine IP-Adresse
und Port umgeändert. `System` → `Software` → `???`

So war es:

    src/gz kathleen_base http://buildbot.berlin.freifunk.net/buildbot/stable/0.2.0-beta+9227220/brcm2708/packages/base
    src/gz kathleen_packages http://buildbot.berlin.freifunk.net/buildbot/stable/0.2.0-beta+9227220/brcm2708/packages/packages
    src/gz kathleen_routing http://buildbot.berlin.freifunk.net/buildbot/stable/0.2.0-beta+9227220/brcm2708/packages/routing
    src/gz kathleen_luci http://buildbot.berlin.freifunk.net/buildbot/stable/0.2.0-beta+9227220/brcm2708/packages/luci
    src/gz kathleen_packages_berlin http://buildbot.berlin.freifunk.net/buildbot/stable/0.2.0-beta+9227220/brcm2708/packages/packages_berlin

So habe ich es geändert:

    src/gz kathleen_base http://192.168.42.2:8000/base
    src/gz kathleen_packages http://192.168.42.2:8000/packages
    src/gz kathleen_routing http://192.168.42.2:8000/routing
    src/gz kathleen_luci http://192.168.42.2:8000/luci
    src/gz kathleen_packages_berlin http://192.168.42.2:8000/packages_berlin

Jetzt konnte ich die Packages vom [Tutorial][adapter] installieren:

    opkg update  
    opkg install kmod-rt2800-lib kmod-rt2800-usb kmod-rt2x00-lib kmod-rt2x00-usb  

Die packages `kmod-rt2800-lib`, `kmod-rt2800-usb`, `kmod-rt2x00-lib` und 
`kmod-rt2x00-usb` kann man sicher auch über die Weboberfläche installieren.






[openwrt-raspi-blog]: https://computers.tutsplus.com/articles/installing-openwrt-on-a-raspberry-pi-as-a-new-home-firewall--mac-55984
[raspi-build]: http://downloads.openwrt.org/chaos_calmer/15.05.1/brcm2708/bcm2709/
[fff-dev]: https://github.com/freifunk-berlin/firmware#development
[image]: {% include images %}/kathleen-0.2.0-beta+9227220-brcm2708-bcm2708-sdcard-vfat-ext4.zip
[Win32DiskImager]: https://netix.dl.sourceforge.net/project/win32diskimager/Archive/Win32DiskImager-0.9.5-install.exe
[SDFormatter]: https://www.raspberrypi.org/learning/software-guide/quickstart/
[packages]: {% include images %}/packages.zip
[kathleen]: https://wiki.freifunk-potsdam.de/Kathleen
[adapter]: https://www.andrewklau.com/openwrt-and-a-4-usb-wifi-adapter/
[openvpn]: https://wiki.openwrt.org/inbox/vpn.howto
[stick2]: https://computers.tutsplus.com/articles/installing-openwrt-on-a-raspberry-pi-as-a-new-home-firewall--mac-55984
[profiles]: http://pastebin.com/WbudpBDJ
[profiles-kopie]: {% include images %}/profiles.txt
[stick3]: http://www.linux-hardware-guide.de/2013-09-15-logilink-wl0084b-wlan-nano-adapter-150mbps-usb-2-0
[diskussion]: https://lists.freifunk-potsdam.de/pipermail/users/2016-November/007037.html
[default_pi]: {% include images %}/default_pi.txt
[pi_branch]: https://github.com/niccokunzmann/firmware/tree/RaspberryPi
[pi_commit]: https://github.com/niccokunzmann/firmware/commit/6be684ff9460cb8370d6e87d5d0b5f0d1d984a56
[build_process]: https://github.com/niccokunzmann/firmware/tree/RaspberryPi#development
[volkmann1]: http://www.volkmann.com/cms/index.php/howto/raspberry-pi/29-freifunkrouter
[volkmann2]: https://monitor.freifunk-potsdam.de/ff/apinfo/16-12-isoldenstrasse
[performance]: http://www.volkmann.com/cms/index.php/howto/raspberry-pi/33-openwrt-hardware-vergleich
[volkmann-further]: http://www.volkmann.com/cms/index.php/howto/raspberry-pi
