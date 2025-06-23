---
title: Detecting mobile devices in React using react-device-detect
date: August 3, 2024
lastUpdated: 23/06/25 22:37
author: Inter
description: How I used this library to adjust content for different devices.
tags: ["react", "webdev", "ui", "ux"]
---

> [!NOTE]
> The [`NoteSummary`](https://github.com/inttter/notetxt/blob/master/src/components/Dialogs/NoteSummary.tsx) component discussed in the post no longer works as described, so the information is outdated. However, the post will remain available in case you're interested in the library or how it was used. — **(23/06/25)**

---

More often than not, when making a website, you'll have to make sure you are able to support various interfaces, such as for those on mobile devices. Most of the time, this involves various UI or code changes that you must make based on the platform.

For example, in [Notetxt](https://notetxt.xyz), I had a component named `NoteSummary` which made a toast using [`sonner`](https://sonner.emilkowal.ski) appear when the user clicked on a button on the bottom right of the page, containing various metrics about the note contents:

<div align="center">
  <video src="https://files.catbox.moe/nlhefs.mp4" alt="Video of toast on desktop" controls></video>
</div>

I'll spare the details behind the component, as you can [view this version of it here](https://github.com/inttter/notetxt/blob/8971f74c8b21d831c065691215b85bface96d184/src/components/NoteSummary.tsx), but the toast was initially set up with a fixed position regardless of the device. Here was the initial implementation I used:

```js
import React from 'react';
import { toast } from 'sonner';

toast.info(
  <div>
    <div className="text-xl font-semibold text-zinc-100">
      Summary
    </div>
    <div className="text-xs text-zinc-300 mb-2">
      This is a summary of various metrics about your note. Click on the button again to refresh these metrics.
    </div>
    {infoItems.map(({ label, value }) => (
      <div key={label}>
        <strong className="text-zinc-200 font-semibold">{label}:</strong> 
        <span className="font-semibold text-pink-300 ml-1">{value}</span>
      </div>
    ))}
  </div>,
  {
    duration: 5000,
  }
);
```

With this implementation, the toast was shown for 5 seconds on the screen.

On mobile, these toasts span the whole width of the bottom of the page. Subsequently, the toast ends up looking like this:

<div align="center">
  <video src="https://files.catbox.moe/x09kg0.mov" width="250" alt="Video of toast on mobile" controls></video>
</div>

Here, you can notice that the '**Note Summary**' button gets covered up by the toast, preventing you from pressing it again until you either **drag it down** or **close it** with the X. In my case, I wanted to keep the toast in the bottom right on desktop, since it worked fine there, but have it be on the top of the screen on mobile. 

## The Solution

To solve this, we can install `react-device-detect`, which uses [user agent sniffing](https://github.com/duskload/react-device-detect/tree/master?tab=readme-ov-file#when-to-use-this-library) to detect the user's device based on information about it:

```bash
npm install react-device-detect --save
```

After that, we can add the named import `isMobile` and use it:

```js
import { toast } from 'sonner';
import { isMobile } from 'react-device-detect';

// ...previous logic
{
  duration: 5000,
  position: isMobile ? 'top-left' : 'bottom-right',
  className: isMobile ? '' : 'move-desktop-toast-up',
}
```

In the case above, for the position:

* If `isMobile` is **true**, `top-left` is applied as the position for **mobile**.
* If `isMobile` is **false**, `bottom-right` is applied as the position for **desktop**.

With that, we had different positions for the toast depending on the device. Here is the comparison of the positions of the toast before after side by side on mobile:

| Before    | After |
| -------- | ------- |
| <video src="https://files.catbox.moe/x09kg0.mov" alt="bottom-right" width="300" controls></video> | <video src="https://files.catbox.moe/rn3tbf.mov" alt="top-left" width="300" controls></video> |

You can also see that I had a conditional to apply the `move-desktop-toast-up` class to the toast if the user is on desktop, otherwise, if they aren't, it's hidden. 

Simply put, this class moves the toast up 25 pixels from the bottom, so that the toast does not block out the button on desktop as well due to the positioning:

```css
.move-desktop-toast-up {
  bottom: 25px !important;
}
```

With that CSS class applied, here is the before and after comparison:

| Before    | After |
| -------- | ------- |
| ![](/images/mobile-devices-react/before-toast-desktop.png)  | <img src="/images/mobile-devices-react/after-toast-desktop.png" width="600"> |

The button is no longer covered by the toast, letting you click it again.

## Detecting a specific device

You can also use `react-device-detect` to detect a specific device, such as an **iOS** device, and have different logic for them.

For example, in **Notetxt**, I have a feature where you can download the note to your device. On iOS, however, when you download a file, you will get an alert like the one below:

![](/images/mobile-devices-react/ios-download-alert.png)

I have the code below to show a success toast when the download is complete:

```js
toast.success('Saved to your device!', {
  description: `Check your recent files to find the note! Re-open it here at any time by pressing Ctrl+O or the 'Open Note' option in the command menu and selecting the correct file.`,
});
```

Originally, this also showed up on iOS devices, even when the user pressed '**View**' (which took them to the blob) or exited out of the alert. Thus, it made the user think the note successfully downloaded, even when it actually didn't.

To resolve this, I [committed a change](https://github.com/inttter/notetxt/commit/e5455013727767dcc4b4744f73b6f8c89253ca22) which replaced the previous implementation with the `isIOS` named import from the library, and a conditional using `isIOS` to detect whether if the user was using an iOS device or not:

```js
import { isIOS } from 'react-device-detect';
import { toast } from 'sonner';

// On iOS, if the user dismisses the download alert, the success toast might still show. To handle this, show a different toast.
if (isIOS) {
  toast.info('Check your downloads folder.', {
    description: `Make sure you clicked 'Download' on the alert that appeared to download the note to your device. If you didn't, the note did not download.`,
  });
} else {
  setTimeout(() => {
    toast.success('Saved to your device!', {
      description: `Check your recent files to find the note! Re-open it here at any time by pressing Ctrl+O or the 'Open Note' option in the command menu and selecting the correct file.`,
    });
  }, 400);
}
```

Now, instead of the success toast showing up all of the time, the info toast would show up on mobile instead, informing the user to make sure they check their downloads:

![](/images/mobile-devices-react/info-toast-download.png)

---

Anyway, there is a lot more in the library you can take advantage of, but I've just highlighted the parts I used within my specific use cases. For example, you could also use the [other selectors](https://github.com/duskload/react-device-detect/blob/master/docs/selectors.md), switch to [different views](https://github.com/duskload/react-device-detect/blob/master/docs/views.md) depending on the device, and more.

If you want to use this library, check out its documentation on [GitHub](https://github.com/duskload/react-device-detect)!