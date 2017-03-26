---
layout: post
title: Fix OLSR "jsoninfo" plugin not loaded
language: en
---

> ### OLSR Daemon
> Unable to connect to the OLSR daemon!
> Make sure that OLSRd is running, the "jsoninfo" plugin is loaded, configured on port 9090 and accepts connections from "127.0.0.1".

How to resolve this
-------------------

1. Connect to your router  
   `ssh root@frei.funk`
2. find the jsoninfo plugin  
   ```
   root@frei.funk:~# find / | grep jsoninfo.so
   /rom/usr/lib/olsrd_jsoninfo.so.1.1
   /usr/lib/olsrd_jsoninfo.so.1.1
   ```
   The version numer `1.1` is important to know.
3. Edit the file `/var/etc/olsrd.conf`  
   `vi /var/etc/olsrd.conf`
4. Go to a blank line and press `i`.
5. Insert this text:
  ```
  LoadPlugin "olsrd_jsoninfo.so.1.1"
  {
   PlParam "accept" "0.0.0.0"
  }
  ```

  Note that I am using the version number 1.1 here.
  You may have a different one in Step 2.
6. Save the file: Press Escape, then `:q` and Enter.
7. Now you can restart the router.

If this did not work, chances are, somehing went wrong.
In this case, you can look at [OLSR debuggen][olsr].


[olsr]: ../../2017-03-06/olsr

