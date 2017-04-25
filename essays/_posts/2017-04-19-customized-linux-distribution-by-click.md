---
layout: post
title: Bringing Linux Customization to the End User
language: en
---

{% assign images = site.baseurl | append:"/images" | append:page.url %}

Various flavors of linux exist.
Ubuntu has a lot of derivates for different use cases:
education, office, low-memory, ... .

How can we allow the average users to customize their own linux distribution?

The User Interface
------------------

A simple user interface can be a website as prototyped by [codersos/create][create].
The users can choose among different flavors of the UI, programs an packages.
Next, they submit their customization to a server and get feedback about the build.
When the build is done, they get notified or download the file automatically.

Architecture
------------

The architecture consists of several components:

- The website for the user
- The logic (proxy) to create a build
- The build services (Travis, self-hosted, gitlab-ci, ...)
- The repository with the linux build
- The meta packages to keep older builds updated

[![Picture of the Architecture]({{ images }}/architecture.jpg)]({{ images }}/architecture.jpg)

Walkthrough
-----------

### (1) Customization

The user goes to the github pages served website.
A specification is created.
This spec can be downloaded, loaded, sent to the proxy.
A proxy is chosen by the website based on availability.

### (2) Build Server is Chosen

The proxy chooses a build sever to send the spec to.

- **Travis and Gitlab-CI**  
  In these cases the proxy passes the specification to the repository
  by creating a commit with a tag and pushing this.
- **Heroku**  
  This is an own build service.

A way to recognize whether a build was successful/which state it has, ... is
communicated back to the website.

### (3) Image Build

The repository is built by the build service.
The correspnding image and output is pushed to a release somewhere.

During the build, the meta packages are used.
They allow updating the resulting distribution in the future.

Collaborating
-------------

Problems are discussed in issues.

In order to spread the knowledge, students can not merge their own
pull-requests but those others. ([Inspiration](https://rfc.zeromq.org/spec:42/C4))

The APIs are defined and discussed first:
- We keep the architecture clean
- development details do not creep through several repostories and increase required expert knowledge for contribution
- The development speed is constant
- We document and talk wich is a basis for collaboration

Possible Customizations
-----------------------

- **Hotel**  
  See [meilix][meilix]
- **Events**  
  - connect to wifi
  - turn notifications off
  - browser start page is event
  - presentation tools like libre office are installed
  - owncloud/nextcloud to share files and slides, authenticated
    - onedrive, dropbox?
  - same user/password
- **Programming clubs?**  
  - environments and languages
  - see [CoderDojoOs](coderdojoos)
- **Home & Office**  
  not sure if this is important as there is so much

Related Work
------------

Tools like [customizer][customizer] exist as a GUI and can be automated using
continuous integration servers such as [Travis][travis].
[The pager about the live-addon-maker][live-addon-maker-paper] provides further research.

**[View the discussion][discussion]**








[customizer]: https://github.com/kamilion/customizer
[travis]: http://travis-ci.org
[live-addon-maker-paper]: https://github.com/CodersOS/live-addon-maker-paper/#readme
[create]: https://codersos.github.io/create/
[meilix]: http://meilix.fossasia.org/
[coderdojoos]: https://github.com/CoderDojoPotsdam/CoderDojoOS/
[discussion]: https://github.com/fossasia/meilix/issues/47
