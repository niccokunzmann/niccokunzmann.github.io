---
layout: post
title: Documentation-Driven Development
language: en
---

<iframe width="560" height="315" 
        src="https://www.youtube.com/embed/x5rGUqRWlK8" frameborder="0" 
        allowfullscreen>
</iframe>

I stumbled upon this PyCon2016 talk. Whereas test-driven development is feeling
 the love of many people, I got reminded what it is really about: documenting
 behavior in code. So when I read the title I was inclined to listen to the 
 talk. Only 26 views seem little for what it is: taking TDD to the next level.

There is some truth in it:

> [...] understand information as the process of informing - as an activity. 
> Understand documentation as a process of documenting [...] 
> [[Minute 13 Second 13](https://youtu.be/x5rGUqRWlK8?t=13m13s)] 

What can your Project do?
-------------------------

From the talk...

- It has to do with attitudes.
- Structure documentation well. 
- There is a documentation about how the documentatoin works
  - tutorial
  - how to
  - reference
  - topics
- Make documentation policies as rigorous as your code policies.
- Attend a writethedocs.org workshop.
- Have a documentation manager.
- Spend monay and time on documentation.
- Documentation becomes a movement.

What I take from it
-------------------

Documentation is often seen as something noone likes. But with the Django 
Project we can see that documentation actually drives development as it gets 
new people in and (in)forms the commuity.

When you write your code and you test it, you can do it to be the communication 
medium between the code and the test as you alter both while implementing the 
tests. I write my tests to think about how I would use the code instead in 
contrast to wanting my behavior implemented in an easy way.

Let's think DDD further: 
What is missing when I write my tests is the intention
behind the test and the overall picture. 
Also, tests are not right where the code lives. 
If I were new to the project, I would look for those intentions. 
The intentions should be found in the docs.
Even if the tests were to be found right next to the function, their focus is
not on the humans mental model and the bigger picture but on the specific
behavior. 
Sometimes tests can and should be split up - it could be so much 
that the bigger picture is hard to find.

This is why I think that code, tests, documentation go hand in hand.


