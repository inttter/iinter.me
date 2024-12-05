---
title: Accessing localhost on a mobile device
date: December 3, 2024
lastUpdated: 05/12/24 22:15
author: Inter
description: Accessing localhost isn't actually as simple as it sounds on a mobile device.
tags: ["webdev", "network", "guide"]
---

Depending on your environment when doing web development, you may need to access the `localhost` URL in order to work on your website locally. 

Typically, this is pretty simple. For example, when using [Next.js](https://nextjs.org), you can run a command like `npm run dev` (or similar) to start your development server, and the `localhost` URL will be provided to you in the terminal output like below:

```bash
> iinter.me@1.0.0 dev
> next dev

  ▲ Next.js 14.2.18
  - Local:        http://localhost:3000
```

Once you open up that link in your browser, you can start making your changes. 

However, on a phone, it is not as simple as that. Trying to do the same thing would show the following on an iPhone device:

<div align="center">
  <img src="/images/localhost-mobile-device/no-localhost-mobile.png" alt="A Safari error when accessing a localhost URL." width="250" />
</div>

Obviously, this is not ideal. You should be able to test your changes on a mobile device to ensure a good user experience across both mobile and desktop.

## The Solution

To solve this and access our website on mobile, we'll have to go through a few steps. 

This solution will follow Windows specifically, but you can see some steps for macOS/Linux a bit further down.

### 1. Find your computer's IPv4 address

First off, we will have to replace the `localhost` part with your computer's IPv4 address. 

On Windows, you can find this by running this command in your command prompt:

```bash
ipconfig
```

In my case, since I'm connected to ethernet, the output would be similar to this:

```bash
Windows IP Configuration

# Other outputs...

Ethernet adapter Ethernet:

   # You can ignore the commented parts below
   Connection-specific DNS Suffix  . : # lan
   Link-local IPv6 Address . . . . . : # fe80...
   IPv4 Address. . . . . . . . . . . : 192.168.1.36 # May be different numbers for you
   Subnet Mask . . . . . . . . . . . : # 255...
   Default Gateway . . . . . . . . . : # 192...

# Other outputs...
```

> [!NOTE]
> If you are on Wi-Fi, you need to look for the '**Wireless LAN adapter Wi-Fi**' header in the terminal output and use that IPv4 address.

The important part we need to focus on here is the `IPv4 Address`.

* **macOS**: Run `ifconfig` in the terminal and look for `inet` under the active interface (eg. `en0` for Wi-Fi or `en1` for Ethernet). The value next to `inet` is your IP address.[^1]
* **Linux**: Run `ip a` and find `inet` under the active connection (eg. `wlan0` for Wi-Fi or `eth0` for Ethernet). The IP address is the value before the `/`.[^1]

Make sure you have this address for [step 4](#4-access-the-url-on-your-phone).

### 2. Get your localhost port number

The port number is the number which follows after the `localhost:` part of the URL. For the example below, this number would be the `3000` in the URL:

<div align="center">

  ![](/images/localhost-mobile-device/port-number.png)
</div>

Make sure you have this number for [step 4](#4-access-the-url-on-your-phone).

### 3. Connect both devices to the same network

This is self-explanatory. Make sure that your computer and your phone are connected to the same network, as different networks may have different addresses.

### 4. Access the URL on your phone

Now that you have the IPv4 address and both devices are connected to the same network, you can open the `localhost` URL on your mobile device.

In your preferred browser of choice, enter the IPv4 address you received from the configuration, followed by the port number. See an example below:

```bash
# Format: http://X.X.X.X:PORT NUMBER
192.168.1.36:3000
```

In the case above, `192.168.1.36` is the IPv4 address, and `3000` is the port number.

Now, when you attempt to access the URL, the website that you see in your `localhost` should load. Changes will also sync if made in the case of frameworks like Next.js.

<div align="center">
  <video src="https://us-east-1.tixte.net/uploads/files.iinter.me/localhost-iphone-example.mp4" alt="An example with a different address of accessing this website." width="300" controls />
</div>

---

Following these steps will allow you to access your website on a mobile device **without** the need for an external service such as **ngrok**, allowing you to test functionality on a real device to potentially catch issues you wouldn't be able to on a computer. It also works with mobile-specific things like media queries and more!

[^1]: Comes from online sources as I don't use either OS, but it should work.