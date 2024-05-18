---
title: "Using discid"
date: "March 11, 2024"
lastUpdated: "24/04/2024 18:54"
author: "Inter"
description: How I use my tool, discid, to find people's statuses on Discord, directly from the command line.
---

A few weeks ago, I made a command-line tool called [discid](https://discid.xyz). In a brief summary, it lets you check a user's Discord status using [Lanyard](https://github.com/phineas/lanyard).

Lanyard lets you expose your Discord presence and activities to a RESTful API. discid uses Lanyard to fetch users' statuses, and provides that information in a neat form in the command line.

To install discid, run this command in your terminal.

```bash
npm install -g discid
```

### Getting Started

To find someone's user ID, run the following in the terminal, replacing <kbd>userID</kbd> with the 18-character ID of the user you want to check the status of:

```bash
discid <userID>
```

### How do you find a user ID?

1. Enable Developer Mode on Discord. You can do this by going to Discord settings, navigating to the **Advanced** tab, and  enabling **Developer Mode** by checking the toggle.

<div align="center">
  <img src="/images/using-discid/developer-mode-toggle.png">
</div>

2. Right click on a user's profile picture and click on the option which says '**Copy User ID**'. This will copy the user's ID to your clipboard.

<div align="center">
  <img src="/images/using-discid/copy-user-id.png">
</div>

3. Go back to your command-line and run <kbd>discid userID</kbd>, replacing <kbd>userID</kbd> with the ID of the user you copied. For example, if you had the user ID **514106760299151372** copied, you would run:

```bash
discid 514106760299151372
```

Depending on what the status of the user is, different information may appear. For example, this is what it could look like.

```bash
iinter • 🟢 Online
Listening To: It Ain't Hard to Tell by Nas on Illmatic • 3min 14sec left
Playing: Visual Studio Code • 📂 website  • 📝 using-discid.md (51, 4) • 44min 39sec
Platform: Desktop
Avatar URL: https://cdn.discordapp.com/avatars/514106760299151372/d14e90a16144987f53f5a3700aacc934.png
```

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 10px;">
    <strong style="margin-right: 0.8rem;">⚠️</strong> 
    <span><strong>Note:</strong> In order for the status to be found correctly, you need a user ID which is in the Lanyard Discord server: <a href="https://discord.gg/lanyard" target="_blank" rel="noopener noreferrer">https://discord.gg/lanyard</a>.</span>
</div>

### What else?

More fields are supported, not just the ones shown in the example. The full list that can be displayed is as follows:

* Username
* [Status](https://support.discord.com/hc/en-us/articles/227779547-Changing-Online-Status)
* Platform
* [Custom Status](https://support.discord.com/hc/en-us/articles/360035407531-Custom-Status)
* Playing
* Listening to Spotify
* Streaming
* Watching
* Avatar URL

More specific details are also able to be shown for certain fields. For example, the time left on a song, activity/state details, and more.

```bash
Listening to: 春色リップ by 告RADIO on KAGUYA ULTRA BEST • 2min 50sec left
# time left is calculated by subtracting the current time from the end time. song name, artist, and album comes from other fields set in the 'activities' section.

Playing: osu! • Goose house - Hikaru nara [Synesthesia] • Clicking circles
# ie. 'Goose house - Hikaru Nara [Synthesis]' comes from the state details, which is set to that text.
```

### Options

<br>

### <kbd>--json</kbd>

This option will print the user's information in a formatted JSON response. You can see an example of this with user ID **514106760299151372** below.

```json
{
  "kv": {
    "email": "hi@iinter.me",
    "location": "UK",
    "website": "https://iinter.me"
  },
  "spotify": {
    "track_id": "03yMZBtC3QxyK7ttlBLeme",
    "timestamps": {
      "start": 1713979964806,
      "end": 1713980148219
    },
    "album": "THE MOUSE & THE MASK",
    "album_art_url": "https://i.scdn.co/image/ab67616d0000b2736c3fb85147fcf2972923cf2d",    
    "artist": "DANGERDOOM; MF DOOM; Danger Mouse",
    "song": "A.T.H.F. (Aqua Teen Hunger Force)"
  },
  "discord_user": {
    "id": "514106760299151372",
    "username": "iinter",
    "avatar": "d14e90a16144987f53f5a3700aacc934",
    "discriminator": "0",
    "bot": false,
    "clan": null,
    "global_name": "lunar",
    "avatar_decoration_data": null,
    "display_name": "lunar",
    "public_flags": 128
  },
  "activities": [
    {
      "id": "98c669cfc69b645",
      "name": "osu!",
      "type": 0,
      "state": "Idle",
      "application_id": "367827983903490050",
      "assets": {
        "large_image": "373344233077211136",
        "large_text": "intter",
        "small_image": "373370493127884800",
        "small_text": "osu!"
      },
      "created_at": 1713979992340
    },
    {
      "flags": 48,
      "id": "spotify:1",
      "name": "Spotify",
      "type": 2,
      "state": "DANGERDOOM; MF DOOM; Danger Mouse",
      "session_id": "aff3a5a656181f92d4ecbbe49952a167",
      "details": "A.T.H.F. (Aqua Teen Hunger Force)",
      "timestamps": {
        "start": 1713979964806,
        "end": 1713980148219
      },
      "assets": {
        "large_image": "spotify:ab67616d0000b2736c3fb85147fcf2972923cf2d",
        "large_text": "THE MOUSE & THE MASK"
      },
      "sync_id": "03yMZBtC3QxyK7ttlBLeme",
      "created_at": 1713979984161,
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

### <kbd>--open</kbd>

This option will open the user's Discord profile in your web browser. You can see an example of this in action below:

<div align="center">
  <video src="/images/using-discid/open-option-example.mp4" controls></video>
</div>

### <kbd>--kv</kbd>

Lanyard also has [key-value pairs](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair) (KV for short) which allow a key-value store to be added to the response.

> *"When a KV pair is updated, a <kbd>PRESENCE_UPDATE</kbd> for the user will also be emitted through the Lanyard socket."*

Here's an example with the KV of **514106760299151372**:

```json
{
  "kv": {
    "email": "hi@iinter.me",
    "location": "UK",
    "website": "https://iinter.me"
  },
  // rest of response...
}
```

To check this package and its source code out on GitHub, click [here](https://github.com/inttter/discid), and visit it on NPM [here](https://npmjs.com/package/discid). If you'd also like to, [star](https://github.com/inttter/discid/stargazers) the repository!