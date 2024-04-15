---
title: "Don't use pure black"
date: "April 15, 2024"
lastUpdated: "15/04/2024 21:51"
author: "Inter"
description: An explanation as to why you should not use pure black.
slug: dont-use-pure-black
---

Designing *"dark"* pages always involve using a multitude of dark colors. However, a common trend in most (newer) designs of pages is that they do not use the actual **black** color ([#000000](https://www.color-hex.com/color/000000)). Instead, most opt for a softer/lighter version of black.

<div align="center"></div>
  <img src="/blog/dont-use-pure-black/bg-comparison.png" alt="Comparison of bg-neutral-900 and bg-black.">
</div>

### Eyestrain

Eyestrain is the most common reason for not using pure black (and pure white too). Using a pure or close to pure background with white text can block the light being emitted from the users' screen, making the text harder to read. This is called [**halation**](https://www.google.com/search?q=halation&oq=halation&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQLhhA0gEHODU0ajBqMagCALACAA&sourceid=chrome&ie=UTF-8), which, although mostly linked with photography, also applies to websites and design. In text, especially if the person is in a dark environment, can make the white letters *bleed* into the black background, making text appear less visible.

Using a softer background makes the white text more visible, and text does not bleed into the pitch black. People (especially those with worse vision, such as people wearing glasses) will not have to squint to read your text, potentially driving them away from the whole point of it being there in the first place, which is for them to read it.

These colors can also shine off the screen (or wherever it's being emitted from) and cause the user to not be able to see the content as well. A good example of this (not in design, but in **real life**) is this clock I have above my desk.

<div align="center">
  <img src="/blog/dont-use-pure-black/shining-clock.png" width="350">
</div>

As you're most likely able to spot, there is a round, white glow being emitted off of the numbers. In a dimmed environment, especially for someone with impaired vision, this will make them feel the need to squint, further worsening their vision.

Now here's that same clock with the lights in the room turned on:

<div align="center">
  <img src="/blog/dont-use-pure-black/non-shining-clock.png" width="350">
</div>

As you can see, the white glow that was previously noticeable is gone.

Essentially, this example is trying to show you that you should optimize the contents of your page and consider the different places a user may be when they read your page, and to consider whether your target audience typically stay in dark or bright areas. In which case, you can adjust your color scheme to fit this. Failing to do this could cause people to navigate off your page as they either don't want to hurt their eyes, or simply can't read your content.

### Alternatives

In terms of Tailwind CSS, you can use these classes for better text + background combos.

* <kbd>bg-neutral-900</kbd> + <kbd>text-zinc-300</kbd> - These are the colors I use on this page you're on right now. The snippet below will give you the styling you see on these blog posts.

```jsx
<div className="bg-neutral-900 text-zinc-300">
    This text is using 'bg-neutral-900' and 'text-zinc-300'
</div>
```

* <kbd>bg-[#131316]</kbd> + <kbd>text-neutral-200</kbd> - As seen on the [Clerk homepage](https://clerk.com/), this'll allow you to make text brighter and stand out to the user while keeping it easy on their eyes.

```jsx
<div className="bg-[#131316] text-neutral-200">
    This text is using 'bg-[#131316]' and 'text-neutral-200'
</div>
```

### It's not always bad though

Not everyone has perfect vision, and if you're aiming for perfect accessibility, you should have a high-contrast mode, as some people are not able to see softer colors as well as most do. A good example of this would be [Microsoft's high contrast mode on Windows](https://support.microsoft.com/en-gb/windows/change-color-contrast-in-windows-fedc744c-90ac-69df-aed5-c8a90125e696). 

<div align="center">
  <img src="/blog/dont-use-pure-black/high-contrast.png">
</div>

They themselves have said:

> *"Text with low contrast can be difficult to read for people with low vision. There are websites that have, for example, poor color combinations such as blue links on black backgrounds. They aren’t easy to read even for people with unimpaired vision and can be virtually impossible for people with vision disabilities. Strongly contrasting colors can make it quicker and easier to read from your PC."*

There are also other factors that can play in using a pure black design, for example:

* The theme of your design
* Emphasizing important content against opposite colors (eg. a banner)
* Performance (helps people on worse internet connections or bandwidth)

---

In the end, it's up to you to decide, and it's based on your own factors that apply to you. 