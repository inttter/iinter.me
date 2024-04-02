---
title: "Creating packages with create-ps"
date: "March 29, 2024"
lastUpdated: "03/04/24 00:19"
author: "Inter"
image: "/blog/creating-packages/cover-image.png"
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
* Select which files you'd like to include and exclude.

**Tip:** To create a .mjs (ESM/EcmaScript) file and use import statements, run the command with the <kbd>--esm</kbd> flag.

### pkg-config

If you run the following command in your terminal, you can edit your <kbd>package.json</kbd> aswell with various fields:

```bash
cps pkg-config
```

You are then able to answer prompts such as, but not limited to the **Author**, **Keywords**, and the **License** you are using (you can use [this](https://spdx.org/licenses/) list from SPDX to find the right identifier for the license field), and once confirmed, it will edit your <kbd>package.json</kbd> and fill out those fields.

> You can also run this in an existing project and it will add the necessary fields.

If you find this useful, star it on [GitHub](https://github.com/inttter/create-ps)!