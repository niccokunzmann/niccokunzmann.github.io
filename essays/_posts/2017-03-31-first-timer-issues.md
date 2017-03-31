---
layout: post
title: Finding First-Timer Issues
language: en
---

I was writing about what makes a good first-timer issue.
I thought about this:
- It has reduced knowledge as a precondition. No need to understand everything.
- It could be
  - Finding translations.
  - Adding code for tests.
  - Style some HTML

What the have in common is that you need to understand the basics or you can
learn them while you go.

I realized, that I claim that this is a good issue.
I do not really know that.
How can we measure it?

Then I came to the conclusion:
- All data on GitHub is open.
- No need to create a survey.
- We can look at existing repositories.

Then, we can calculate:
- How many first-timers are there
- What is the first-timer acceptance rate.

I started the project [`first_timer_scraper`][ftc].

I scrapes the Github API to find first timer pull-requests.
On the basis of this pull-request, the issue can be determined.

Also, it has an API which allows using the project from other applications.

I imagine badges:
- How many first-timers are there
- Acceptance rate of first-timer-contributions (k of n)


[ftc]: https://github.com/niccokunzmann/first_timer_scraper
