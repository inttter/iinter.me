---
title: "A better way to use links in Markdown"
date: "April 20, 2024"
lastUpdated: "26/04/24 18:26"
author: "Inter"
description: Link definitions help simplify the repeated use of specific links in Markdown files.
slug: a-better-way-to-use-links-in-markdown
---

Normally, when we use hyperlinks in Markdown, it looks like this:

```markdown
[Some text](https://example.com)
```

This is a perfectly valid way of using hyperlinks, and it's the standard for most people using Markdown. I prefer using this method when writing blog posts as well, since I don't tend to use the same link multiple times in one blog post.

---

Earlier, I pushed commit [77b314a](https://github.com/inttter/mdbadges-cli/commit/77b314a27a) to [mdbadges-cli](https://github.com/inttter/mdbadges-cli), which switched the links in the Markdown files from absolute links to [link definitions](https://daringfireball.net/projects/markdown/syntax#link), also known as reference links.

The way it works is that you define a link with a name at some point in your file, typically at the end. You can see an example of one below.

```markdown
If you want more information, you can read the documentation [here][Docs].

[Docs]: https://docs.mdbcli.xyz
```

According to [John Grube](https://daringfireball.net/projects/markdown/syntax#link), creator of Markdown, the point of this is that your document source becomes **'vastly more readable'**.

One common use case for them is when you need to refer to the same link in your markup multiple times in the same file. For example, here's a comparison with the same link multiple times in a Markdown snippet below.

```markdown
<!-- NOT using link definitions -->
[GitHub](https://github.com) allows developers to create, store, manage and share their code. 

[GitHub](https://github.com) uses the Git version control, and [GitHub](https://github.com) also allows people to track bugs, add things to projects, and manage their projects.

You can visit GitHub [here](https://github.com).

<!-- Using link definitions -->
[GitHub][github] allows developers to create, store, manage and share their code. 

[GitHub][github] uses the Git version control, and [GitHub][github] also allows people to track bugs, add things to projects, and manage their projects.

You can visit GitHub [here][GitHub].

[github]: https://github.com
```

It's much cleaner, and is also easier to maintain, since you don't need to manually go through and edit each hyperlink which uses that link. You can instead just define it in one place, and update it in the link definition only.

This approach also becomes quite useful when dealing with lengthy URLs or when you have dead links in your markup that are used multiple times.

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 20px; margin-bottom: 20px;">
    <strong style="margin-right: 0.8rem;">💡</strong> 
    <span>Visual Studio Code has a useful Source Action to organize link definitions, which you can utilise by right clicking within the Markdown file, selecting <kbd>Source Action</kbd>, and selecting <kbd>Organize link definitions</kbd>.
</div>

You can watch [this video](https://www.youtube.com/watch?v=N_fEkFEiiRc) for more info, but if you want to save yourself time, add the following to your <kbd>settings.json</kbd> file:

```json
"editor.codeActionsOnSave": {
   "source.organizeLinkDefinitions": true
}
```

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