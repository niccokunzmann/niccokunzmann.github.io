---
layout: post
title: Readme-Driven Development, API first design and Contracts
language: en
---

This night I solved a problem of mine.
I am entusiastic about this solution.
I think, it will solve a problem for other people, too.

Everyone uses the travis build badges to show their build status.  
![][travis-badge]  
But I did not find one for docker automated builds.
So, I created one.  
[![][docker-badge]][docker-badge]

For me it solves the need to know if my builds run.
Not always do I test them with travis before.
Not always does this mean [they build on docker, when they build on travis][commit].

Readme-Driven Development
-------------------------

When I started implementing, it was already late.
I wanted to

- be able to stop any time
- not forget where I was heading
- allow other who would search for it continue my work

So, I started with [Readme-Driven Development][rdd].
I documented all I needed to work on the project,
links to the undocumented dockerhub API.

Then, I outlined an architecture.
After this, I wrote the draft of an API.

Contracts
--------

This can be seen as a small version of [contracts][contracts].
The idea: We specify the interface we want to have before the implementation.
(When I hear this, I think of TDD).

The current [API][api] has these contracts:
1. The JavaScript API `GET /status/...`
2. The AGPL API `GET /source`
3. The `status.svg` API `GET status.svg?<parameters>`

Implementors of these contracts are:

- the server
  - implementing 1, 2, 3
- the status.svg file with JavaScript
  - implementing 3
  - using 1

While I used the `status.svg` file to formulate the API, it became very
clear how to implement the same behavior in the Python server.

This way there is more diversity and fault tolerance.

Learnings
---------

It was a refresing experience to code API and README first.
I assume that APIs can implement different contracts.
Formulating part of the API as a contract allows this specific implementation
to be exchanged.
This results in more flexibility and a more specific tailored solution to
use-cases.

[travis-badge]: https://travis-ci.org/fossasia/kniteditor.svg
[docker-badgs]: https://dockerbuildbadges.quelltext.eu/status.svg?organization=niccokunzmann&repository=dockerhub-build-status-image
[rdd]: http://tom.preston-werner.com/2010/08/23/readme-driven-development.html
[contracts]: http://hintjens.com/blog:93
[commit]: https://github.com/loklak/loklak_server/pull/1050/commits/507d4f7309617d0bea7e4128f9c320b7ba436c97#diff-354f30a63fb0907d4ad57269548329e3
[api]: https://github.com/niccokunzmann/dockerhub-build-status-image/blob/master/README.md#api
