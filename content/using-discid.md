---
title: "Using discid"
date: "March 11, 2024"
lastUpdated: "01/04/2024 15:54"
author: "Inter"
image: "/blog/using-discid/cover-image.png"
description: How I use my tool, discid, to find people's statuses on Discord, directly from the command line.
slug: using-discid
---

A few weeks ago, I made a tool called [**discid**](https://discid.xyz). In a short summary, it's a command-line tool to check a user's Discord status using [Lanyard](https://github.com/phineas/lanyard).

Lanyard lets you expose your Discord presence and activities to a RESTful API. discid uses Lanyard to fetch users' statuses, and provides that information in a neat form in the command line.

To install discid, run the following in your terminal:

```
npm install -g discid
```

This will globally install the package, so you can run it from anywhere on your machine.

To find someone's user ID, run this code in the terminal, replacing <kbd>userID</kbd> with the ID of the user you want to check the status of:

```
discid <userID>
```

#  How do you find a user ID?

**(1)** Enable Developer mode by going to **Settings** ➔ **Advanced** ➔ **Developer Mode**, and check the toggle.

<div align="center">
<img src="/blog/using-discid/developer-mode-toggle.png">
</div>

**(2)** Right click on a user and click *Copy User ID*.

<div align="center">
<img src="/blog/using-discid/copy-user-id.png">
</div>

**(3)** Go back to your command line and run <kbd>discid userID</kbd>, replacing <kbd>userID</kbd> with the ID you copied. For example, if you had the user ID ***514106760299151372*** (my user ID!) copied, you would run:

```
discid 514106760299151372
```

Depending on what the user's status is, different things may come up. For example, this is what it looks like right now as of me writing this:

```
iinter • 🟢 Online
Listening To: It Ain't Hard to Tell by Nas on Illmatic • 3min 14sec left
Playing: Visual Studio Code • 📂 website  • 📝 using-discid.md (51, 4) • 44min 39sec
Platform: Desktop
Avatar URL: https://cdn.discordapp.com/avatars/514106760299151372/d14e90a16144987f53f5a3700aacc934.png
```

> NOTE: In order for this to actually work, you need a user ID which is in the Lanyard Discord server: [https://discord.gg/lanyard](https://discord.gg/lanyard).

# What else?

More fields are supported. The full list that can be displayed is as follows:

* Username
* Status (eg. 🟢 Online, 🟡 Idle, etc...)
* Platform
* Custom Status (eg. *"💫 This is a custom status."*)
* Playing
* Listening to Spotify
* Streaming
* Watching
* Avatar URL
* [KV](#--kv) (via the <kbd>--kv</kbd> option)

More specific details are also shown for certain fields. For example, the time left on a song, activity/state details, and more:

```
Duvet by bôa on Twilight • 1min 54sec left # time left on a song
Rainbow Six Siege • STANDARD match - Round 4 / 6 • 11min 52sec # activity/state details
```

# Options

There's a few command line options also available:

#### <kbd>--json</kbd>

This option will print the user's information in a JSON response. You can see an example of this with user ID **514106760299151372** below:

```
{
  "kv": {
    "email": "hi@iinter.me",
    "location": "UK",
    "website": "https://iinter.me"
  },
  "spotify": {
    "track_id": "5RmPFKZcsV6bciHOQR3jli",
    "timestamps": {
      "start": 1711981501725,
      "end": 1711981703726
    },
    "album": "Paper Soldier",
    "album_art_url": "https://i.scdn.co/image/ab67616d0000b273fe4be0573ecfc552c5067461",
    "artist": "d3puu",
    "song": "Paper Soldier"
  },
  "discord_user": {
    "id": "514106760299151372",
    "username": "iinter",
    "avatar": "d14e90a16144987f53f5a3700aacc934",
    "discriminator": "0",
    "bot": false,
    "global_name": "lunar",
    "avatar_decoration_data": null,
    "display_name": "lunar",
    "public_flags": 4194432
  },
  "activities": [
    {
      "flags": 1,
      "id": "60a8a706a4354bda",
      "name": "Visual Studio Code",
      "type": 0,
      "state": "📝 using-discid.md (87, 17)",
      "session_id": "99a4d2f060386f3ce850d19ea0a36f52",
      "details": "📂 website ",
      "timestamps": {
        "start": 1711980396581
      },
      "assets": {
        "large_image": "mp:external/upBsApcxBvN1KsYpnaBGo2gpIMtYbUQ9ZI90L8HdtgU/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/markdown.png",
        "large_text": "⌨️ Editing a MARKDOWN file",
        "small_image": "mp:external/Joitre7BBxO-F2IaS7R300AaAcixAvPu3WD1YchRgdc/https/raw.githubusercontent.com/LeonardSSH/vscord/main/assets/icons/vscode.png",
        "small_text": "Visual Studio Code"
      },
      "application_id": "810516608442695700",
      "created_at": 1711981530879
    },
    {
      "flags": 48,
      "id": "spotify:1",
      "name": "Spotify",
      "type": 2,
      "state": "d3puu",
      "session_id": "99a4d2f060386f3ce850d19ea0a36f52",
      "details": "Paper Soldier",
      "timestamps": {
        "start": 1711981501725,
        "end": 1711981703726
      },
      "assets": {
        "large_image": "spotify:ab67616d0000b273fe4be0573ecfc552c5067461",
        "large_text": "Paper Soldier"
      },
      "sync_id": "5RmPFKZcsV6bciHOQR3jli",
      "created_at": 1711981508644,
      "party": {
        "id": "spotify:514106760299151372"
      }
    }
  ],
  "discord_status": "online",
  "active_on_discord_web": false,
  "active_on_discord_desktop": true,
  "active_on_discord_mobile": false,
  "listening_to_spotify": true
}
```

#### <kbd>--open</kbd>

This option will open the user's Discord profile in your browser. You can see an example of this in action below:

<div align="center">
<img src="/blog/using-discid/open-option-example.gif">
</div>

### <kbd>--kv</kbd>

Lanyard also has [key-value pairs](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair) (KV for short) which allow a key-value store to be added to the response.

> "When a KV pair is updated, a <kbd>PRESENCE_UPDATE</kbd> for the user will also be emitted through the Lanyard socket."

Here's an example with the KV of ***514106760299151372***:

```
{
  "kv": {
    "email": "hi@iinter.me",
    "location": "UK",
    "website": "https://iinter.me"
  },
  # rest of response...
}
```

To check this package out on GitHub, click [here](https://github.com/inttter/discid), and on NPM [here](https://npmjs.com/package/discid). If you'd also like to, ⭐ the repository!