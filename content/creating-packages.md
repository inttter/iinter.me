---
title: "Creating packages with create-ps"
date: "March 29, 2024"
lastUpdated: "30/04/24 22:55"
author: "Inter"
description: A guide on a faster way to create NPM packages from the terminal.
---

Lots of <kbd>npm</kbd> packages are made all the time. In my opinion, I don't enjoy the fact that I have to create a bunch of new files which I know I will need to make anyway at a later date whenever I decide to create a new package. In the end, I just do this whenever it comes time to actually make that new file, name it, add the contents of what I need into it. To me, that seems like a tedious process.

That's why I decided to make <kbd>create-ps</kbd>, a command-line tool which allows you to create files that you need for an average NPM package.

### Demo

<video src="/images/creating-packages/Demo.mp4" controls></video>

Just like that, it saves me having to create a lot of new files, makes a Dependabot config for updating my dependencies, lets me pick a license (since [v2.3.0](https://github.com/inttter/create-ps/releases/tag/v2.3.0)), and also makes a base for the README.

This is all done using switch cases. If you're curious, you can view the source on [GitHub](https://github.com/inttter/create-ps).

### Installation

```bash
npm install -g create-ps 
```

### Usage

* Navigate to the directory you are going to create your package in.
* Run the following command, replacing <kbd>projectName</kbd> with the name of the package.

```bash
cps <projectName>
# Note: This will run 'npm init -y' to create a package.json, and a Git repository will also be initialized.
```

* Select which files you'd like to include and exclude. As of [v3.0.0](https://github.com/inttter/create-ps/releases/tag/v3.0.0), they are all deselected by default.

```bash
✔ Ran npm init -y successfully!

Enter a short description of the package: A package. 
Select what you'd like to include: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

 ◉ README.md
 ◉ CONTRIBUTING.md
 ◉ CHANGELOG.md
 ◉ CODE_OF_CONDUCT.md
 ◉ LICENSE
 ◉ src/
 ◉ test/
```

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 20px; margin-bottom: 20px;">
    <strong style="margin-right: 0.8rem;">💡</strong> 
    <span>To create a <kbd>.mjs</kbd> (ESM) file and use <kbd>import</kbd> statements within the README, run the command with the <kbd>--esm</kbd> flag.</span>
</div>

### pkg-config

If you run the following command in your terminal, you can edit various fields in your <kbd>package.json</kbd>.

```bash
cps pkg-config
```

You're then able to select the fields you would like to include and customize. For example, but not limited to, the **Author**, **Keywords**, and the **License** you are using (you can use [this](https://spdx.org/licenses/) list from SPDX to find the right identifier for the license field). Once confirmed, create-ps will ask a series of prompts for you to fill out the necessary information, and will edit your <kbd>package.json</kbd> accordingly.

```markdown
Select what you'd like to include: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

 ◯ Author
 ◯ Repository
 ◯ Keywords
 ◯ Homepage
 ◯ Funding
 ◯ License
```

You can also run this in an existing project to fill out and/or replace any fields.

If you find this useful, star it on [GitHub](https://github.com/inttter/create-ps)!