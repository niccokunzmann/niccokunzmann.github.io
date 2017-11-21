---
layout: post
title: Thoughts on Message Oriented Programming
language: en
---

Object oriented programming - if it could be coined again - one of the inventors would
call it message oriented programming.

I see objects such as in Smalltalk and many other languages as a collection of methods.
A cluster of messages put together around a data structure.
The point of dispatch is the data structure or its class.
This raises a fundamental question: If in message orignted programming the message is the
highest form of orientation, why is the dispatch oriented at data strcutures?

This is no question, we want to discuss here.
There might be a lot of reasons, why and they all lead to a dead end.
The question is: How can we invent a language whose point of dispatch is the message?
A language where the message is all.
There might be messages which are suspended and not worked on by the processor and these could be
data structures - if you miss data structures. Let's not think about how to structure data.
Let's think about how to orient a language around discourse.

Note: A potential problem is that of thinking in states rather than in processes.
Judging people might be one occurence of this.

In a seminar I thought and said:
When we look at the call stack, we see essetially a linked list.
When we look at classes, prototypes or delegation, we see a linked list.
Why not remove classes?
I do not like them and think they are redundant.
And they are, if we can have the call stack provide the same functionality.
Can we create a lookup along the call stack?
Yes, we can do that.

Note: This was dismissed in a seminar. Maybe because it is too radical (~>radis=root).

Implementing a technique without the goal might be useless.
We need a goal towards what to strive or we will fail to substantially show anything.
What do we want?
- A message oriented approach where the message sent is what is important.
- A dialog instead of a monolog (procedure) or blind obeying (instructions)

The idea is not so new and should be understood as current OOP can be understood:
When we call a function, we do not inherit methods from the data structure but from the
caller.

Object Networks
---------------

How can we create the network of object which we know?

When we define a "function", we can see it as "the process of an object".
Objects are processes, not states, altering their course through discourse, through messages.

```
proc f():
    proc x():
    proc y():
```

Here, we see a process or `def` in Python, which defines a process.
This process passes through different states and can be continued in the way `x` or in the
way `y`.

When we are in a process or a closure, we need to know, which arguments are dispatched from where:
- We can have the usual call arguments. These arguments are something like a context-sensitive renaming of what we mean.
- We can have arguments additionally, which are inherited, implicit.
- We can have a process continuation like `proc x` which needs a lookup from proc `f`.

By having these two types of lookups, we can say that we can create the usual network of object relations we typically see: Composition and runtime-invocation.

Mutable state? No, let's just use lookups to immutable data structures. Otherwise it becomes really complex if you alter a variable and what it affects.

Objects as processes
--------------------

1 is a process. You can continue it with a + and an other number.

Motivation
----------

People are processes, not states.
A language that converts processes into states by judgements creates a lot of violence.
As such, we need languages also programming languages which are able to reflect this way of thinking.
We can not have programmers working on peaceful software with a mindset that denies choice and responsibility.


Structural Discussion
---------------------

We can have something like

```
proc a(x)
  proc next
    a x:1
```
So, there are two views to classify lookups
- explicit / implicit
- caller vs. state

Lookups:
- explicit caller lookup is as we have it: `function(argument)`
- implicit state lookup is inheritance, dispatch (implied by class/object)
- implicit caller lookup - would be subject oriented
- explicit state lookup would be calling a global function.

Thus, we could assume that subject oriented programming would be the same as this.
But I assume that the inheritance chain does not go as far with subject oriented programming.
Also, the goal is to remove the "state" vs. "call" mentality and converting everything into
a call.

A Note on Functions
-------------------

Functions are a processing model of the mind.

`f(x)` means `compute function f with argument x` where `compute X with argument Y` is the meta function.
Looking at smalltalk, we can see that function definitions do not look like matehmatical functions.
This does not need to be true for other languages, too.
Writing `f(x)` is just convenience but it also implies a certain model.

Say, we want to break that model, where would be be left?
Therefore, we need to know the model:
It is that we
1. Know what we want to say (a dangerous thing)
2. Know how to deconstruct that

How can we put that more into a questioning?
A process to find others who can help out?
I would like to say that:
In some context, 1+1 is 2.
Would you give me that context and evaluate 3+4?
Then, we have common contexts and ideas and use them to reason.
There are such in which 1+1 is 10 or 11.
They should be equally viewed next to eachother.




