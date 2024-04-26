---
title: "Using Emoji in Commit Messages"
date: "March 25, 2024"
lastUpdated: "24/04/24 19:53"
author: "Inter"
timeToRead: 3
description: How I use emoji in my commit messages to symbolize different things.
slug: commit-emojis
---

Typically, when making commit messages from Git, you will need to provide a [commit message](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--cltcommitgt), which details in a very short summary what changes you have made within the commit.

Some people aren't bothered to write a proper commit messages, to which they end up using [GitHub](https://github.com)'s automatic commit messages, which go something along the lines of...

```
Update README.md
```

If they **do** end up writing a commit message, it ends up being just what the change was in that commit.

```
Fix errors in browser console
```

While these are still completely valid ways of writing commit messages and are not a problem, most people use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages, which follow this structure.

```
docs: add requirment for Node.js 18 or higher
```

This gives some important details about **what** you are changing, and the description of what that commit **is**.

However, I like to expand my own commit messages on top of the conventional commits by using [Gitmoji](https://gitmoji.dev/), a set of emoji's which links to different convential commits, as well as my own set of emoji that I use for other, more specific purposes. Some of them are taken from [this](https://gist.github.com/parmentf/035de27d6ed1dce0b36a) GitHub Gist. Below, you can see some example use cases of these emoji within the commit message.

```
✨ feat: add `--fix` option
💥 BREAKING: migrate from npm to Bun
📦 chore: bump dependencies
```

For me, this helps to make the commits stand out, and know what kind of commit it was, whether it was something small, like a typo, or a complete refactor of something. They also make the project look less **"bland"** and easier to communicate changes with.

If you want more example use cases of these, you can check out one of my projects, [mdbadges-cli](https://github.com/inttter/mdbadges-cli/commits/main/), where I use this style of commit message for all of my commit messages.

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

Some ways to expand this, for example, is by adding this style of commit to your <kbd>dependabot.yml</kbd> configuration file. I have the [following configuration](https://github.com/inttter/mdbadges-cli/blob/main/.github/dependabot.yml) set up in mdbadges-cli to update dependencies for npm and GitHub Actions with these custom prefixes:

```yaml
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

* 📦 signifies a package, which is a metaphor for a package within npm.
* 🤖 signifies an automated (GitHub) action.

With this, pull requests opened from Dependabot will look like similarly to these:

<div align="center">
  <img src="/blog/commit-emojis/package-pr.png">
  <br>
  <img src="/blog/commit-emojis/action-pr.png">
</div>

With that, automated pull request titles with these emoji and the Convential Commit format are now set up.