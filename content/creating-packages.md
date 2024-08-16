---
title: Creating npm packages with create-ps
date: March 29, 2024
lastUpdated: 15/08/24 23:00
author: Inter
description: A guide on a faster way to create npm packages, straight from the terminal.
tags: ["npm", "cli", "javascript"]
---

In my opinion, I don't enjoy the fact that I have to create a bunch of new files which I know I will need to make anyway at a later date whenever I decide to create a new `npm` package. In the end, I just do this whenever it comes time to actually make that new file. I name it and add the contents of what I need into it.

To me, this seems like a tedious process. That's why I decided to make `create-ps`, a command-line tool which allows you to create files that you need for an average NPM package.

## Demo

<div align="center">
  <video src="https://us-east-1.tixte.net/uploads/files.iinter.me/create-ps_Demo_v4.mp4" controls style="margin-top: 10px"></video>
</div>

As you can see in the demo video, I added multiple files, directories, and more into the project directory. You can select what you want to include to fit your project's needs, such as examples files, a pre-made `index.mjs` with your installed dependencies imported, and more.

## Installation

```bash
npm install -g create-ps 
```

## Usage

* Navigate to the directory you are going to create your package in.
* Run the following command, replacing `projectName` with the name of the package.

  ```bash
  cps [projectName]
  ```

* Select which files you'd like to include and exclude, as shown below:

```bash
┌  create-ps 
│
◇  Enter a short description of the package:
│  Creates the foundations for an NPM package.
│
◆  Select what you'd like to include:
│  ◼ Source (Recommended)
│  ◼ Test
│  ◻ Examples
│  ◼ Documentation
│  ◻ Assets / Images
│  ◻ Internationalization (i18n)
│  ◼ GitHub workflows
│  ◻ Dependabot configuration
│  ◼ Gitignore
│  ◼ Readme
│  ◻ Contributing guidelines
│  ◼ Changelog
│  ◼ Code of Conduct
│  ◼ License
│  ◼ Dependencies
```

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 20px; margin-bottom: 20px;">
    <strong style="margin-right: 0.8rem;">💡</strong> 
    <span>To use CommonJS instead of ESM, run the command with the <kbd>--cjs</kbd> flag.</span>
</div>

## pkg-config

If you run the following command in your terminal, you can edit various fields in your `package.json`.

```bash
cps pkg-config
```

You're then able to select the fields you would like to include and customize. For example, but not limited to, the **Author**, **Keywords**, and the **License** you are using (you can use [this](https://spdx.org/licenses/) list from SPDX to find the right identifier for the license field). Once confirmed, create-ps will ask a series of prompts for you to fill out the necessary information, and will edit your `package.json` accordingly.

```markdown
◆  Select what you'd like to include:
│  ◼ Author
│  ◼ Repository
│  ◼ Keywords
│  ◻ Homepage
│  ◻ Funding
│  ◼ License
```

You can also run this in an existing project to fill out and/or replace any fields.

## The Logic Behind This

In it's simplest form, all the logic is just **switch cases**. 

The code iterates over the toggles and, based on each toggle, creates the appropriate files and/or directories. These switch cases hold the logic for creating each file/directory when each toggle is selected. For example, here's the logic for `CHANGELOG.md`:

```javascript
case 'CHANGELOG.md':
    const currentDate = new Date().toISOString().split('T')[0];
    const changelogContent = `# Changelog\n\n# v1.0.0 (${currentDate})\n\n* 🎉 Initial commit`;
    const changelogFile = path.join(process.cwd(),  'CHANGELOG.md');
    await fs.writeFile(changelogFile, changelogContent , 'utf8');
    break;
```

`currentDate` creates today's date and appends that after 'v1.0.0', `changelogContent` holds the content of the file, `changelogFile` creates a full file path for the file, then everything is written to the file using `fs`.

Things can get a bit more complicated though. For example, within `src/`, there needs to be logic to change file paths and content within other files, as ESM and CommonJS have different logic, and in `LICENSE`, the licenses are fetched from the GitHub API, with the user having to select the license they want from the prompts.

---

If this CLI has been useful in any way to you, feel free to give it a star on [GitHub](https://github.com/inttter/create-ps). Your support is very much appreciated!