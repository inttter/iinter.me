---
title: Using Emojis in Commit Messages
date: March 25, 2024
lastUpdated: 16/08/24 13:35
author: Inter
description: This is how I expand my commit messages by using emojis within them.
tags: ["personal", "git", "emoji"]
---

Typically, when creating commit messages using Git, you will need to provide a [commit message](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt--cltcommitgt), which details in a very short summary what changes you have made within the commit.

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
docs: add requirement for Node.js 18 or higher
```

This gives some important details about **what** you are changing, and the description of what that commit is.

You can also use optional scopes to denote a change in a specific part of your project.

```text
chore(docs): remove outdated information
```

`(docs)` is the optional scope here, as you are changing something specifically within the documentation of your project and no other parts. 

You can also refer to a larger part of your project. For example, you could use `(frontend)` to signify that you are making changes to the frontend of your project.

However, I like to expand my own commit messages on top of the conventional commits by using [Gitmoji](https://gitmoji.dev/), a set of emojis that link to different types of conventional commits, as well as my own set of emojis that I use for other, more specific purposes. Some of them are taken/have inspiration from [this](https://gist.github.com/parmentf/035de27d6ed1dce0b36a) GitHub Gist. Below, you can see a few example use cases of these emojis within the commit message.

```text
✨ feat: add `--fix` option
♻️ refactor(setup): rework setup process
📦 chore: bump dependencies
```

For me, this helps to make the commits stand out, and know what kind of commit it was, whether it was something small, like a typo, or a complete refactor of something. They also make the project look less **'bland'** and easier to see the type of changes made.

If you want more example use cases of these, you can check out one of my projects, [mdbadges-cli](https://github.com/inttter/mdbadges-cli/commits/main/), where I use this style of commit message for all of my commit messages.

Here is a list of the emojis and the type of conventional commits I most commonly use when committing changes:

| Emoji | Meaning                           | Type                         |
|-------|-----------------------------------|------------------------------|
| 🎉    | Initial commit                    | `feat:`                     |
| ✨    | Adding a new feature              | `feat:`                     |
| 🐛    | Fixing a bug/issue                | `fix:`                      |
| ♻️    | Refactoring code/logic            | `refactor:`                 |
| 💄    | Adjusting/adding styling          | `style:`                    |
| ✏️    | Adjusting text                    | `chore:`                    |
| 💥    | Breaking Changes                  | `BREAKING:`                 |
| 📝    | Documentation                     | `docs:`                     |
| 🧹    | General updates and adjustments   | `chore:`                    |
| 👷    | Configuration (e.g., Dependabot)  | `config:`                   |
| 📦    | Packages                          | `chore(package):`           |
| 🤖    | Automation                        | `chore:`                    |
| 🔖    | Bumping versions                  | `chore(release):`           |
| 🧪    | Tests                             | `tests:`                    |
| 🔥    | Removing old/unused things        | `chore:`                    |
| 🚚    | Moving/rearranging files          | `chore:`                    |

Some ways to expand this is by adding this style of commit to your `dependabot.yml` configuration file. For example, I have the [following configuration](https://github.com/inttter/mdbadges-cli/blob/main/.github/dependabot.yml) set up in mdbadges-cli to update dependencies for npm and GitHub Actions with these custom prefixes:

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

* 📦 signifies a dependency update to the package.
* 🤖 signifies an automated GitHub Action, which is normally performed without human interaction, thus having the connotation of a robot and automation.

With that configuration, any pull requests opened from Dependabot will look something like this:

![A pull request that bumps a package.](/images/commit-emojis/package-pr.png)

<br />

![A pull request that bumps an action.](/images/commit-emojis/action-pr.png)

---

Overall, I think that emojis are a great way to display relevant changes to your growing project and it would help you and other people to further understand what changes were made in that commit and for what reason/what they link to. 

As said before, you can further expand this in other ways. For example, you can use CLI tools such as [better-commits](https://github.com/Everduin94/better-commits) to generate commit messages using emojis, types, scopes, and more, right from the terminal, and this is just just one of many ways to expand the use of commit emojis.