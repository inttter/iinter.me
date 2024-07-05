---
title: "Don't use pure black"
date: "April 15, 2024"
lastUpdated: "27/04/2024 20:15"
author: "Inter"
description: Pure black is bad design. Here's why.
---

Designing dark pages always involve using a wide palette of dark colors. A common trend in most newer designs of pages is that they don't use the actual **black** color, which uses hex color [#000000](https://www.color-hex.com/color/000000), they instead opt for a softer and/or lighter version of black.

<img src="/images/dont-use-pure-black/bg-comparison.png" alt="An older screenshot of a comparison between bg-neutral-900 and bg-black.">

## Eyestrain

Eyestrain is the **most common** reason why pure black should not be used, particularly on pure white text as well. Using black on white text can block the light being emitted from the users' screen, making the text harder to read. This is called [halation](https://www.google.com/search?q=halation). Although mostly linked with photography, also applies to websites and design. If the person is in a dark environment, can make the white letters **bleed** into the black background, making text appear less visible.

Using a softer background makes the text more visible, and text does not bleed into the pitch black. People, especially those with worse vision, such as people wearing glasses, won't have to squint to read your text, which could cause a ripple effect that drives them away from reading it.

These colors also shine off the screen (or wherever it's being emitted from) and cause the user to not be able to see the content as well. An example of this (not in design, but in **real life**) is this clock I have positioned above my desk.

<div align="center">
  <img src="/images/dont-use-pure-black/shining-clock.png" width="350">
</div>

As you're most likely able to spot, there is a round, white glow being emitted off of the numbers. In an environment where light is minimal or dimmed, this will make them feel the need to squint, further worsening their vision, but more so for those with impaired vision.

Here's that same clock with the lights in the room turned on:

<div align="center">
  <img src="/images/dont-use-pure-black/non-shining-clock.png" width="350">
</div>

As you can see, the white glow that was previously noticeable is gone.

This example is trying to show you optimizing the contents of your page is key. You should consider the different places a user may be when they read your page, and whether your target audience typically stay in dark or bright areas (**Note:** This does not apply in all cases). You can adjust your color scheme to fit this. Sometimes, not doing so might cause people to navigate off your page as they either don't want to hurt their eyes, or simply can't read your content.

## Alternatives

In terms of Tailwind CSS, you can use these classes for better text + background combos.

* <kbd>bg-neutral-900</kbd> + <kbd>text-stone-300</kbd> - These are the colors I use on this page you're on right now. The snippet below will give you the styling you see on these posts.

```jsx
<div className="bg-neutral-900 text-stone-300">
    This text is using 'bg-neutral-900' and 'text-stone-300'
</div>
```

* <kbd>bg-[#131316]</kbd> + <kbd>text-neutral-200</kbd> - As seen on the [Clerk homepage](https://clerk.com/), this'll allow you to make text brighter and stand out to the user while keeping it easy on their eyes.

```jsx
<div className="bg-[#131316] text-neutral-200">
    This text is using 'bg-[#131316]' and 'text-neutral-200'
</div>
```

## It's not always bad though

As mentioned earlier, not everyone has perfect vision. If you're aiming for accessibility, you **should** have a high-contrast mode, as some people can't see softer colors as well as most do. An example of this would be [Microsoft's high contrast mode on Windows](https://support.microsoft.com/en-gb/windows/change-color-contrast-in-windows-fedc744c-90ac-69df-aed5-c8a90125e696).

<div align="center">
  <img src="/images/dont-use-pure-black/high-contrast.png">
</div>

On the linked page, Microsoft themselves have said:

> *"Text with low contrast can be difficult to read for people with low vision. There are websites that have, for example, poor color combinations such as blue links on black backgrounds. They aren’t easy to read even for people with unimpaired vision and can be virtually impossible for people with vision disabilities. Strongly contrasting colors can make it quicker and easier to read from your PC."*

There's also other factors that are determining factors for whether this may apply to you. For example:

* The theme of your design
* Emphasizing important content against opposite colors (eg. a banner)
* Performance (helps people on worse internet connections or bandwidth)

---

But, in the end, it's up to you to decide. It's based on your own factors that apply to you.