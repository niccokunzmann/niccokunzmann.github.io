---
layout: post
title: Find Packge for Linux Command
language: en
---

I want to find the package which installed the command
`xfce4-display-settings`.

<!-- more -->

To find out, where the command is located, I can use the `which` command.

    $ which xfce4-display-settings
    /usr/bin/xfce4-display-settings

Now, I want to know which package installed the command.

- Fedora:  
  ```
  $ dnf repoquery -f /usr/bin/xfce4-display-settings
  xfce-settings-0:4.12.0-6.fc23.x86_64
  ```
  ([Source](http://dnf.readthedocs.io/en/latest/command_ref.html),
  search for "Display package name that owns the given file")
- Debian/Ubuntu:
  ```
  dpkg --search /usr/bin/xfce4-display-settings
  ```
  ([Source](file:https://www.debian.org/doc/manuals/debian-faq/ch-pkgtools.en.html#s-filesearch),
   Section 8.5)

Now, I can [search for the package](https://duckduckgo.com/?q=xfce-settings+fedora+package&t=ffab&ia=web)
and [find the website of the package](https://admin.fedoraproject.org/pkgdb/package/rpms/xfce4-settings/).
There is also the source code available in a [repository](http://pkgs.fedoraproject.org/cgit/rpms/xfce4-settings.git/).
