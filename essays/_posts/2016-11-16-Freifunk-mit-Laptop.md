---
layout: post
title: Freifunk mit Laptop
language: de
---

{% assign images = site.baseurl | append:"/images" | append:page.url %}

Ich möchte gerne ein Freifunk ausstrahlen, wenn ich mit meinem Laptop unterwegs bin und Zugriff auf Netzwerke habe, auf die nicht alle Zugriff bekommen sollen. Dabei kann es sich z.B. um ein eduroam oder einen Hotspot eines Großunternehmens handeln. Sozusagen ein mobiles Freifunk ohne Router.

Dafür möchte ich eine VM-Erstellen, die für mich den Hotspot macht. Probleme, die ich vorraussehe, sollte ich keine VM benutzen, sind:

- Das lokale Netz ist nicht erreichbar, weil ich ein VPN benutze.
- Der Hotspot ist ein Ad-Hoc Netz
- Der Hotspot vergibt keine IP-Adressen
- Ich kann kein Tutorial schreiben, weil die Betriebssysteme unterschiedlich sind.

Kommen wir nun zur Einrichtung des Hotspots.
Auf dieser Seite steht, wie du die HotSpot-VM selbst einrichten magst oder auch nach dem Runterladen der VM die Konfiguration selbst übernehmen.

Es wird benötigt und dauert länger zu erhalten:

- Ein USB-WLAN-Stick, z.B. [so einer](http://www.pollin.de/shop/dt/MjE1NzgyOTk-/Computer_Informationstechnik/Netzwerktechnik/WLAN_USB_Adapter/Nano_WLAN_Stick_2_LINK_MM024_150_Mbps.html) oder [so einer](http://www.pollin.de/shop/dt/Mzg3NzgyOTk-/Computer_Informationstechnik/Netzwerktechnik/WLAN_USB_Adapter/WLAN_USB_Stick_NETGEAR_WG111_54_Mbps.html) oder andere.
- Ein Zertifikat für das Freifunk-VPN, z.B. [von hier](http://ca.berlin.freifunk.net/). 

HotSpot VM erstellen
--------------------

Ich benutze VM-Ware unter Windows, um die VM darin zu erstellen.
[Download VM-Ware](http://www.vmware.com/go/downloadplayer/)

1. **VMWare Workstation starten**:  
   ![]({{ images }}/01%20VMWare%20Workstation-splash.png)

2. **ISO-Datei auswählen**: Ich habe dazu [Ubuntu Server runtergeladen](https://www.ubuntu.com/download/server), da das keine Oberfläche hat und dementsprechend weniger RAM braucht.  
   ![]({{ images }}/02%choose%20iso.png)

3. **Nutzername und Passwort eingeben:**  
   ![]({{ images }}/03%20choose%20user%20name%20and%20password.png)

4. **Nutzername und Passwort eingeben:**  
   ![]({{ images }}/04%20choose%20vm%20name.png)

5. **Die Größe der VM wählen:** Das ist die maximale Größe der VM-Festplatte, wenn alles verwendet wird. Da reichten 20GB. Es wird nur so viel Speicher auf dem Laptop verwendet, wie auch von der Festplatte mal belegt wurde.  
   ![]({{ images }}/05%20choose%20vm%20size.png)

6. **Die Hardware anpassen:** Im folgenden öffnet sich noch ein Menu, in dem wir RAM und Prozessorenanzahl ändern können.      
   ![]({{ images }}/06%20customize%20hardware.png)

7. **RAM verändern:** Für die Installation setze ich den RAM gerne hoch, damit alles glatt geht und der Swap auf der Platte nciht gebraucht wird. Später kann mit dem Befehlt `top` der RAM-Verbrauch gemessen werden und dann entsprechend runtergestellt werden.   
   ![]({{ images }}/07%20choose%20ram.png)

8. **Prozessorenzahl auswählen:** Auch hier schadet es nciht, bei der Installation mindestens 2 Prozessoren zu haben. Dann geht alles schneller.     
   ![]({{ images }}/08%20choose%20processors.png)

9. **Installation:** Das dauert jetzt ein paar Minuten zum Installieren.  
   ![]({{ images }}/09%20installing%20vm.png)

10. **Einloggen:** Um einen HotSpot zu erstellen, müssen wir uns einloggen.    
    ![]({{ images }}/10%20login.png)

11. **WIFI-Stick verbinden:** Oben über der VM ist eine Liste von Gräten, also auch von USB-Geräten, die wir direkt zur V; verbinden können, damit Ubuntu mit dem WLAN-Stick ein.      
    ![]({{ images }}/11%20connect%20wifi%20stick.png)

Jetzt ist die VM soweit installiert und kann konfiguriert werden.

1. **Optionalen SSH-Server installieren:**  
   Wenn ich nicht alle Befehle über die Kommandozeile eingeben möchte, kann ich einen SSH-Zugang zur VM gebrauchen. Das ist aber nicht nötig für das Folgende. Auf dem Server folgendes ausführen:
   ```
   sudo apt-get install openssh-server
   ip addr
   ```
   Und dann mit ssh Nutzer@IP verbinden.
   ```
   ssh freifunk@192.168.71.139
   ```

2. **ap-hotspot installieren:**  
   Ich folge dazu [diesem Tutorial auf stackoverflow](http://unix.stackexchange.com/a/251296/27328).
   ```
   sudo apt-get -y install git make hostapd dnsmasq-base haveged
   git clone https://github.com/oblique/create_ap
   cd create_ap
   sudo make install
   ```

3. **Hotsppot aktivieren:**  
   Mit `ip addr` bekommt man die Namen der Netzwerk-Interfaces raus.
   Danach kann man mit "sudo create_ap WLAN-Interface LAN-Interface WLAN-Name" ein WLAN erstellen, z.B. so:
   ```
   sudo create_ap wlx7cdd9058f352 eno16777736 Freifunk
   ```

4. **VPN einrichten:**  
   ```
   sudo apt-get install openvpn
   ```
   und die tgz-Datei entpacken, die [beantragt wurde](http://ca.berlin.freifunk.net/).
   ```
   tar zxvf fileNameHere.tgz
   ```
   Dann OpenVPN starten:
   ```
   openvpn *udp.ovpn
   ```
   
5. **Hotsppot mit VPN starten:**  
   Das VPN erstellt ein Interface names "tun0".
   Dieses kann für die Weiterletung der Internet-Hotspots genutzt werden:
   ```
   sudo create_ap wlx7cdd9058f352 tun0 Freifunk
   ```

Dazu habe ich [eine VM erstellt](https://github.com/niccokunzmann/freifunk-vm).