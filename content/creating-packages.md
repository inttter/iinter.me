---
title: "Creating packages with create-ps"
date: "March 29, 2024"
lastUpdated: "21/04/24 16:34"
author: "Inter"
description: A guide on a faster way to create NPM packages from the terminal.
slug: creating-packages
---

A lot of <kbd>npm</kbd> packages are made all the time. I, myself, do not enjoy the fact that I have to create a load of new files which I know I'll need to make anyway whenever I start making a new package. In the end, I just do this whenever it comes time to actually make that new file, name it, add the contents of what I need into it. To me, that seems like a long process.

That's why I decided to make <kbd>create-ps</kbd>, a CLI tool which allows you to create files that you need for an average NPM package.

### Demo

<video src="/blog/creating-packages/Demo.mp4" controls></video>

And just like that, it saves me having to create a bunch of new files, makes a Dependabot config, an MIT License, and also a basis for the README!

You can view the source code at [inttter/create-ps](https://github.com/inttter/create-ps).

### Installation

```bash
npm install -g create-ps 
# Globally install it to run it anywhere.
```

### Usage

* Navigate to the directory you are going to create your package in.
* Run the following command, replacing <kbd>projectName</kbd> with the name of the package.

```bash
cps <projectName>
```

* This will run <kbd>npm init -y</kbd> to create a <kbd>package.json</kbd>.
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

<div style="background-color: #1B2A3A; color: #47A3F3; padding: 10px; margin-bottom: 20px; margin-top: 10px; border-radius: 5px;">
  💡 To create a .mjs (ESM/EcmaScript) file and use <kbd>import</kbd> statements, run the command with the <kbd>--esm</kbd> flag.
</div>

### pkg-config

If you run the following command in your terminal, you can edit various fields in your <kbd>package.json</kbd>.

```bash
cps pkg-config
```

You are then able to select what fields you want to include such as, but not limited to the **Author**, **Keywords**, and the **License** you are using (you can use [this](https://spdx.org/licenses/) list from SPDX to find the right identifier for the license field), and once confirmed, it will ask a series of prompts for you to fill out the necessary information, and will edit your <kbd>package.json</kbd> accordingly.

```markdown
Select what you'd like to include: (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

 ◯ Author
 ◯ Repository
 ◯ Keywords
 ◯ Homepage
 ◯ Funding
 ◯ License
```

You can also run this in an existing project and it will add the necessary fields.

If you find this useful, star it on [GitHub](https://github.com/inttter/create-ps)!