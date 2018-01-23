---
layout: post
title: Designing Living Software Architectures - Learnings from Google Code-In
language: en
---

How well is the software able to cope with future changes?
We look at two games developed by Google Code-In students at FOSSASIA to see how they cope with introducing new-comers into development.

The Games Flappy-SVG and Labyrinth
----------------------------------

The game [Flappy-SVG][flappy-svg] is a JavaScript/HTML game made from one SVG file.
Like with Flappy-Bird, a camel, bird, helicopter and others jump through different landscapes.

The [labyrinth][labyrinth] game is an HTML/JavaScript game where the player can walk though a huge labyrinth.

By using the SVG format, we created a low-level entry for beginners to contribute to the game.
To keep the game development flowing, there needs to be a repeatable entry for the students, the tasks.
If they are repeatable endlessly, we call them a task, like adding a character - which can be done endlessly.
If we can only do it once or a few times, we call it an issue, i.e. fixing a bug or adding a button with a certain functionality.
But: A task is also to find an issue and solve it.

We developed Flappy-SVG during Google Code-In 2015 and 2016.
There were fundamental flaws which slowed down development.

### Learning 1: Reduce places of common edit

Flappy has one SVG file for the whole game. This is a nice experiment but nothing that scales.
When two contributors change the SVG file with the editor, they are likely to get merge conflicts.
The contributor can resolve the conflict by applying the changes manually.

We have a smaller problem when adding new characters to the labyrinth: There is one listing for all characters. If students add all their characters to the front, they get merge conflicts.

To cope with these places of common edit, we can randomize the place the character is added in the list or reduce the time to take the changes into the game.
By adding several SVG files in the labyrinth, we reduced conflict potential.

### Learning 2: Merging fast

Year one, with the review-first, merge later policy, we had about [5 characters and one new background](https://github.com/fossasia/flappy-svg/commit/67b96262cfa0944ed17effb08c3c778e3f8fac1d).
By merging fast in the [CCCC][c4]-style, we reduced the time to have contributions in the conflict area.
Therefore, in Flappy-SVG, we added contributing students as maintainers.
They also had the role of merging pull-requests.
In the first half of GCI 2016 we had more than doubled the contributions to Flappy-SVG.
After GCI 2017, the labyrinth game has about 400 pull requests and Flappy-SVG has about 160 - factor 2.5.

There is one change in Github: Reviews.
In the labyrith game from GCI 2017, we had one active maintainer.
The students however started reviewing to help out and cope with the work load.
As such, I, the maintainer, could merge fast without reviewing.

If merges created issues, we opened issues.
The GCI-Tasks also included that issues raised from pull-requests must be closed - not necessarily by one-self.
This allows us to add fast-merge into GCI.
After the game was broken many times, about in the middle of GCI, we added Travis tests to check for syntax errors but Travis was too slow some times.

### Learning 3: Students suggest tasks

In FLappy-SVG, students opened issues if they had suggestions on improvements, found bugs or had new ideas.
However, they could not claim many tasks for this.
In the labyrinth game, additionally to issues, students added new tasks to the tasks folder.
This allowed motivated students to stay with the development to the end of GCI. 
Instead of 5 tasks, we had 20.

Adding a character or sound requires adding a file and editing a JSON structure.
To make it so easy, an API needs to be created.
There was one task which allowed the students to work on enabling these new tasks by providing these
APIs.
Thus, the students could work to get new tasks.

By suggesting tasks, students feedback the system on what are the ways that enhance the game in never-ending ways.

We had tasks on documentation. This speeds up the development for new-comers.
As with peer-learning: Students are much better fit to decide which documentation is needed and how to write it for people new to the game.

### Learning 4: No squashing

Many FOSSASIA maintainers want contributors to squash their commits into one commit.
This also swaps over to the labyrinth.
I do not do it for these reasons:

- Squashing is, see [CCCC][c4], useful if you have one commit solving one problem.
  Students do not always do that: They add a tile and fix some other issues in the mean time.
  These are hopefully in different commits.
  - Squashing those to a spider-commit makes reverting them much harder.
  - Asking them to not do it is a fight and overhead. They also need to learn branching for that.
- Students contribute by adding commits through the web interface. This is fine to het their attention and a positive experience.
  Forcing them to squash theit commits with a command line tool is really frustrating and takes a lot of time.
- We as maintainers can decide through the GitHub interface to merge, squash and rebase. Why should they?
- Asking to squash is
  - command line usage
  - branching (clean, small commits)
  - a lot of insecurity with git that they go through

### Learning 5: Asking

I can ask them and they help me. They are very thankful for a positive coding experience.
Some may not think that they really matter but if they can help other people, they know it.
A maintainer asks them for help e.g. with reviewing or other students ask for help in the chat, this makes a difference, I believe.
This also brings you down from the GCI-task-blocker to the human you are.

### Learning 5: Thanking

I thank the students and only once I lost my temper over architecture.
They give their free time. I can be thankful for every second they spend improving something in their own way.
It is their game and they let me see the great moments they have.

### Learning 6: Divide GCI and open-source work

This learning is not really from GCI but I practice it.
Giving from the heart is free software.
It is intrinsic motivation, may it be to serve humanity or life in a fullfilling way.
GCI is a competition. It destroys what is beautiful about the giving. See [Alfie Kohn](https://www.youtube.com/watch?v=b4c86SDW7FQ) and others.

You cannot have both intrinsic motivation and extrinsic motivation. They destroy eachother.
I like intrinsic more, so I push GCI as far out of the way as possible.
It resides mostly in private messages and the GCI platform, not the repository and not in the main chat, nowhere where I can get the role of being in the way of other people's wishes so that it spreads. Tasks with objective closing criteria help by reducing outrage and conflict.

It is of no fun to me to have students asking me what they **should** do and letting me dictate my satisfaction until they get their t-shirt.
Sometimes I react out of this negative energy.
Mostly, I hope, I can turn my thinking back to respect and our own responsibilities, empowering the student to belief in own ideas.

Here is a part my girlfriend and I wrote to a student which resembles this motivation:

> I know there might be cultural differences in how each of us approaches and solves problems, since I have grown up in Europe an you in India. I do not want you to obey me and take my word as telling you what is right or wrong. I want you to use your own mind. Unfortunately I cannot teach you that, all I can do is refuse to answer your questions for 'orders'. I would like you to find out, what you think is right for you and best. You could ask me, what I would do in that situation, and this would leave it open for you to choose my way or another. I want people on the project to have different perspectives, especially perspectives differing from mine, because I want all of us to benefit and learn from each other. I understand my role as a maintainer to keep the project alive and flourishing and the role of a developer to find solutions to problems and weigh them against each other. The bottom line is: I want everyone to take responsibility for their actions. If I would give you orders, I would take the responsibility for you, but I want you to keep it.

### Learning 7: Split maintainer and developer roles

A maintainer is the person keeping the project alive.
They merge and educate about how the process works.

A developer makes the decisions on what gets done and how.
Thus, developers must decide amongst eachother what the best solution is.

If you use much time maintaining, this distinction helps in not getting caught up in side-business.

### Learning 8: Teaching collaboration

Students help eachother in the chat, they write documentation.
We have a task which asks them to collaborate on a pull request.
This brings them the perspective of maintaining a feature or possibly helping out newcomers with commits.
They practice that they can work together without any other person.
We think about adding a task to review pull requests, giving feedback about what they learned from it and how they think the pull request enriches the game.

## Summary

With these learnings, we got 2.5 as many pull requests this GCI than we got the two years before.
GCI is a great experience for me to learn how to scale up software development for contribution and build architectures that scale in value.

## Statistics

```
Tasks | Merged (per Task)  | Closed   | Name       | GCI
6     | 45     (7,5)       | 15 (25%) | Flappy-SVG | 2015 (until 25.06.2016)
6     | 87     (14,5)      | 14 (13%) | Flappy-SVG | 2016 (from 25.06.2016 until 25.10.2017)
20    | 350    (17,5)      | 58 (14%) | Labyrinth  | 2017 (until 23.01.2017)
```


[flappy-svg]: https://github.com/fossasia/flappy-svg/
[labyrinth]: https://github.com/fossasia/labyrinth
[c4]: https://rfc.zeromq.org/spec:42/C4/

