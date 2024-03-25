---
title: "Using Emoji in Commit Messages"
date: "March 25, 2024"
lastUpdated: "25/03/24 22:56"
author: "Inter"
timeToRead: 3
image: "/blog/commit-emojis/cover-image.png"
description: How I use emoji in my commit messages to symbolize different things.
slug: fh3
---

Typically, when committing stuff from Git, you'll need to provide a [commit message](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--cltcommitgt), which details in a very short summary what changes you have made within the commit.

Some people are not bothered to write commit messages, or they end up using [GitHub](https://github.com)'s automatic commit messages, which go something along the lines of:

```
Update README.md
```

or if they do end up writing a commit message, it ends up being just what the change is:

```
Fix 'undefined' showing when emoji is not valid
```

While these are still valid ways of writing commit messages, most people use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages, which follow this structure:

```
docs(installation): add Bun as an install option
```

This gives some important details about **what** you are changing, and the description of what that commit **is**.

However, I like to expand my own commit messages from the conventional commits by using [Gitmoji](https://gitmoji.dev/), as well as my own set of emoji I use for certain purposes, some of which taken from [this GitHub Gist](https://gist.github.com/parmentf/035de27d6ed1dce0b36a). Below, you can see some example use cases of these emoji within the commit message:

```
📦 chore(package): Bump axios to 1.6.8
💥 refactor(BREAKING)!: migrate from npm to Bun
✨ feat: add '--fix' option
```

For me, this helps to make the commits stand out, and know what kind of commit it was, whether it'd be something small, like a minor text change, or a new feature. They also make the project look less *"bland"* (no offense) and more colorful.

If you want more example use cases of these, you can check out my project, [mdbadges-cli](https://github.com/inttter/mdbadges-cli/commits/main/), where I use this style of commit message for every single commit message.

Here is a list of the emojis I most commonly use when committing changes:

| Emoji  | Meaning |
| ------ | ------- |
| 🎉 | Initial commit |
| ✨ | Adding a new feature |
| 🐛 | Fixing a bug/issue |
| ♻️ | Refactoring code/logic |
| 💄 | Adjusting/adding styling |
| ✏️ | Adjusting text, wording, or typo's |
| 💥 | Breaking Changes |
| 📝 | Documentation |
| 🧹 | Chores (eg. updating old things) |
| 👷 | Configuration (eg. Dependabot) |
| 📦 | Packages |
| 🤖 | Automation |
| 🔖 | Bumping versions |
| 🧪 | Tests |
| 🔥 | Removing old/unused things |

> If you'd like, you can use this for your own commits!

Some ways to expand this, for example, is adding this style of commit to your [Dependabot](https://github.com/dependabot) config. I have the [following config](https://github.com/inttter/mdbadges-cli/blob/main/.github/dependabot.yml) set up in mdbadges-cli to update dependencies with these custom prefixes:

```
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
      time: "09:30"
    commit-message:
      prefix: "📦 chore(package):" # commit prefix for package updates
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
     interval: "daily"
     time: "09:30"
    commit-message:
      prefix: "🤖 chore(action):" # commit prefix for github actions
```

📦 signifies a package, which is a sort-of metaphor for a dependency within npm.

🤖 signifies a change related to automation. Since Dependabot is a bot that auto-creates PR's for you, it is automated, hence the robot emoji.

I also recently came across a CLI tool called [better-commits](https://github.com/Everduin94/better-commits) that I'm most likely going to start using now. It includes this type of commit message, but in steps through the terminal. You can see a demo below:

<video src="https://github.com/Everduin94/better-commits/assets/14320878/8fb15d46-17c4-4e5d-80d9-79abe0a2a00a" controls></video>

There is also quite an extensive list of configuration options available, which you can see in the [README](https://github.com/Everduin94/better-commits). It also supports [Semantic Release](https://github.com/semantic-release/semantic-release) alongside.