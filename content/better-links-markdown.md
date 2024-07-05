---
title: "A better way to use links in Markdown"
date: "April 20, 2024"
lastUpdated: "03/06/24 23:08"
author: "Inter"
description: How link definitions help you to make better links in Markdown files.
---

Normally, when we use hyperlinks in Markdown, it looks like this:

```markdown
[Some text](https://example.com)
```

This is a perfectly valid way of using hyperlinks, and it's the standard for most people using Markdown. I prefer using this method when writing these posts as well, since I don't tend to use the same link multiple times in one post.

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

[GitHub](https://github.com) uses [Git](https://git-scm.com) for version control, and it also allows people to track bugs, add things to projects, and manage their projects.

You can visit GitHub [here](https://github.com).
```

Now here's the same example using link definitions:

```markdown
<!-- Using link definitions -->
[GitHub][github] allows developers to create, store, manage and share their code. 

[GitHub][github] uses [Git][git] for version control, and it also allows people to track bugs, add things to projects, and manage their projects.

You can visit GitHub [here][github].

[github]: https://github.com
[git]: https://git-scm.com
```

This is, most of the time, a good way to incoorporate link definitions into your markup. However, you may notice that the same words are next to each other in these link definitions, such as <kbd>\[GitHub\]\[github\]</kbd>. This could be confusing to some.

Instead, a better method you can use if you name the link definition the same as the word you make a hyperlink is to use an empty pair of second square brackets instead of using the word defined in the link definition. Here is one part of that example below using this method of link definitions:

```markdown
<!-- You don't need to repeat the word in the second square bracket -->
[GitHub][] uses the [Git][] version control, and it also allows people to track bugs, add things to projects, and manage their projects.

[github]: https://github.com
[git]: https://git-scm.com
```

It now looks **much cleaner** in code, and is also **easier to maintain**, since you don't need to manually go through and edit each hyperlink which uses that link. Capitalisation also **does not matter** when using link definitions. You can just define it in one place with any capitalisation and update the link in the link definition only. This particular approach also becomes quite useful when dealing with **lengthy URLs** or when you have **dead links** in your markup that are used multiple times throughout multiple places.

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 20px; margin-bottom: 20px;">
    <strong style="margin-right: 0.8rem;">🧠</strong>
    <span><strong>TL;DR:</strong> If the hyperlink and link definition use the same word, use an <strong>empty pair</strong> of second square brackets.</span>
</div>

You can try clicking on these links defined by link definitions below: 

* View this website's repository on [GitHub][].
* Markdown was created by [John Gruber][] in 2004.

You can see the link definitions by going to the source of this post [here](https://github.com/inttter/iinter.me/blob/master/content/better-links-markdown.md) and scrolling to the bottom of the page, where you will see the two link definitions. They are hidden from view on this post and anywhere where Markdown is shown, but not in the raw file's code.

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 20px; margin-bottom: 20px;">
    <strong style="margin-right: 0.8rem;">💡</strong> 
    <span>Visual Studio Code has a useful Source Action to organize link definitions, which you can utilize by right clicking within the Markdown file, selecting <kbd>Source Action</kbd>, and selecting <kbd>Organize link definitions</kbd>. You can also use <kbd>"source.organizeLinkDefinitions": true</kbd> within the <kbd>"editor.codeActionsOnSave"</kbd> identifier of your VSCode configuration.</span>
</div>

If you want a tooltip on hover of the link definition, use the following syntax:

```markdown
<!-- This will generate a HTML 'title=' for the link !-->
[github]: <https://github.com> "Click on this to visit GitHub"
```

Other kinds of links also work with link definitions as well, such as these:

```markdown
[Install]: #install
[About]: /about
[Email]: <mailto:contact@example.com>
[Demo]: ./demo.gif 
```

At the end of the day, it's up to you to decide what method of hyperlinking in Markdown works for you, but this is a **lesser-known** method which I believe could be more commonly used and adopted by people, especially for those with bigger, maintained projects that like to use a lot of links which could die at any time.

<!-- These are just for the example of link definitions in this post -->
[GitHub]: https://github.com/inttter/iinter.me
[John Gruber]: https://daringfireball.net/projects/markdown/