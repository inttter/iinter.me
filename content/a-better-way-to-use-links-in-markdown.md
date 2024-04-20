---
title: "A better way to use links in Markdown"
date: "April 20, 2024"
lastUpdated: "20/04/24 00:00"
author: "Inter"
description: Link definitions help simplify the repeated use of specific links in Markdown files.
slug: a-better-way-to-use-links-in-markdown
---

Using hyperlinks in Markdown typically looks like this:

```markdown
[Some text](https://example.com)
```

This is a perfectly valid way of using hyperlinks in Markdown, and is the standard in most Markdown files. I also prefer using this method when writing blog posts, as I don't tend to use the same link multiple times in one blog post.

---

Earlier, I pushed commit [<kbd>77b314a</kbd>](https://github.com/inttter/mdbadges-cli/commit/77b314a27a) to [mdbadges-cli](https://github.com/inttter/mdbadges-cli), which switched the links in my Markdown files from absolute URL's to [link definitions](https://daringfireball.net/projects/markdown/syntax#link) (also called reference links).

Essentially, you define a link with a name at some point in your file, typically at the end, kind of like footnotes.

Here's an example of a link definition:

```markdown
If you want more information, you can read the documentation [here][Docs].

[Docs]: https://docs.mdbcli.xyz
```

According to [Daring Fireball](https://daringfireball.net/projects/markdown/syntax#link), the point of this is that *"your document source is vastly more readable"*.

A common use case for them is if you refer to the same link in your Markdown multiple times within the same file. For example, here's a comparison with the same link multiple times in a Markdown snippet:

```markdown
[GitHub](https://github.com) allows developers to create, store, manage and share their code. 

[GitHub](https://github.com) uses the Git version control, and [GitHub](https://github.com) also allows people to track bugs, add things to projects, and manage their projects.

You can visit GitHub [here](https://github.com).
```

Now here's that some snippet using link definitions:

```markdown
[GitHub][github] allows developers to create, store, manage and share their code. 

[GitHub][github] uses the Git version control, and [GitHub][github] also allows people to track bugs, add things to projects, and manage their projects.

You can visit GitHub [here][GitHub].

[github]: https://github.com
```

It looks much cleaner, and is easier to maintain, as you don't have to manually go through and edit each hyperlink which uses that link, you can instead just define it in one place, and update it in the link definition only.

This approach also becomes quite useful when dealing with lengthy URLs or when you want to keep your Markdown files readable.

> **Tip:** Visual Studio Code has a useful Source Action to organize link definitions, which you can do by right clicking within the Markdown file, selecting <kbd>Source Action</kbd>, and selecting <kbd>Organize link definitions</kbd>.
>
> See [this video](https://www.youtube.com/watch?v=N_fEkFEiiRc) for more, but TL;DR, add this to your <kbd>settings.json</kbd>:
>
> ```json
> "editor.codeActionsOnSave": {
>    "source.organizeLinkDefinitions": true
>  }
> ```
>
> When you save the file, VSCode will automatically organize your definitions for you.

If you want a tooltip (<kbd>title</kbd> in HTML), you can use the following syntax:

```markdown
[github]: <https://github.com> "Click on this to visit GitHub"
```

Other kinds also work here too, like header ID's, pages on the same server, and emails:

```markdown
[Installation]: #installation
[About]: /about
[Email]: <mailto:contact@example.com>
```