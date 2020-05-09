---
layout: post
title: "How to develop applications on Android"
language: en
---

Since I will be on the move for some
time, I will mainly use my Android
phone to develop applications.
In this post, I would like to show the
tools I use to work as a developer on
Android.

## Phone

I am usung a Samsung GT-I9100 running
Lineage OS 16 with a 32GB SD-Card.

## Tools

So, here is a list of tools I use to
develop applications.

### Blutooth-Keyboard

I reaally appcreiate the typing speed of
the Bluetooth keyboard.
One can swith languages to EN_US, to
allow typing some brakets and slashes
more easily.

Shortcuts:

- Alt+Tab - switch between apps
- Control+C, Ontrol+V, Control+X,
    Control+A
- Alt to open the on-screen keyboard
- Control+Space to switch languages

### Termux

Termux is a terminal application.
There, I have access to

- `pkg` - the package manager.  
    I can install many packages, such as `wget`, `python` (Python 3) and
    `ruby` with it.
- `nano` - a simple editor  
    I use this frequently in the
    console. The reason: When I use VIM
    I can not press ESC. 
- `git` - the versioning system  
    this allows me to ull code from
    [GitHub] and [GitLab].
- `python` - Python 3 programming
    language  
    This allows me i.e. to start a web
    server using
    `python -m http.server`.
- `jekyll` - the templating engine  
    I could install this through
    installing Ruby and bundler.
    This allows editing and serving
    GitHub Pages.

### FastHub-libre

FastHub-libre allows me to cnnect to
my [GitHub] account and open issues
and more.

## Programming Environments

There are severeal kinds of allications which an be developed
on the phone.

### GitHub/GitLab Pages

GitHub and GitLab pages are an easy way to host the website online
and develop it on the Android phone.

You need
- a GitHub/GitLab acount
- Termux, git, ruby and jekyll



## Further Reading

- [Post about some tools](https://blog.usejournal.com/setting-up-a-web-development-environment-on-your-android-device-dfb26b6ca06)
- [Post about programming with a feature phone and becoming a developer](https://www.freecodecamp.org/news/how-i-went-from-programming-with-a-feature-phone-to-working-for-an-mit-startup-40ca3be4fa0f/)

[GitHub]: https://github.com/niccokunzmann
[GitLab]: https://gitlab.com/niccokunzmann
