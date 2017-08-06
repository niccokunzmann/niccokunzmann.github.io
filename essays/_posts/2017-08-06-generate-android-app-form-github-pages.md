---
layout: post
title: Generate Android app from Jekyll/Github Pages
language: en
---

This post proposes an App for offline Jekyll/GitHub Pages.

<!-- more -->

As Myk Melez states [in the blog post][myk],
Github Pages or Jekyll Blogs are well-suited to be used offline.
The sites are static and generated.
Here, I propose a App generator,
in this case Android but it can be any other app, too, which generates an Android
app from a Jekyll page.

Maintainance
------------

When I am a GitHub pages developer, I want to focus on the page itself.
I do not want to put much work into the google play store.
As such, it should be easy to keep your app updated.
There are two ways to do that:

1. You can have a generated app with an update button which downloads the
   current GitHub Pages source and builds it. [Example: Flapy SVG][flappy]
   You put this app on the app store once and it is done.
2. There is an app on he app store. In this app, you can choose from several
   GitHub pages. By creating a pull-request, your app is added to the in-app
   list of GitHub pages you can choose from.
3. Once you have this app, you can register a certain link which can be opened
   by this app. Te workflow is as follows:
   1. You install the universal GitHub-pages-app from the app-store.
      The app registeres a certain kind of link.
   2. On your webpage, you add this certain kind of link which says
      "open with GitHub Pages App". Once you open it with this app, the app
      saves your offline tutorial.
   These steps may be combined to one step where a webpage can be opened by
   an app or by the website.

Further Reading:

- [App Links][applinks]

Appeal
------
   
If you like to implement this, go ahead.
Please let me know so we could join forces.
I would like to use it for tutorials such as the [regex-tutorial](https://coderdojopotsdam.github.io/regex-tutorial/).


[myk]: https://mykmelez.github.io/offline-web-apps-on-github-pages/#my-octocat
[flappy]: http://fossasia.github.io/flappy-svg/
[applinks]: https://developer.android.com/training/app-links/index.html
