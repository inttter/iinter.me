---
title: Using discid to find Discord users' statuses
date: March 11, 2024
lastUpdated: 16/07/24 23:30
author: Inter
description: How I find the statuses of certain users on Discord, directly from the command line.
tags: ["npm", "discord", "lanyard", "cli"]
---

A while back, I made a command-line tool called [discid](https://discid.xyz). In short, it allows you to check a user's Discord status using the [Lanyard](https://github.com/phineas/lanyard) API, which exposes your Discord presence and activities to a **REST** API, then returns that data in a JSON format. discid uses Lanyard to fetch this data, then provides the information in a neat format within the command line.

## Installation

To install discid, install it through npm:

```bash
npm install -g discid
```

## Getting Started

To check the user's status on Discord, run the following in the terminal, replacing <kbd>[userID]</kbd> with the 18-character ID of the user you want to check the status of:

```bash
discid [userID]
```

## How do you find a user ID?

To be able to get the user ID of someone, follow these steps below first:

1. Enable **Developer Mode** on Discord. You can do this by going to **Settings** (⚙️), scrolling to the **Advanced** tab, and checking the toggle.

   <div align="center">
     <img src="/images/using-discid/developer-mode-toggle.png">
   </div>

2. Right click on a user's profile picture and click on the final option, which says '**Copy User ID**'. This will copy the user's ID to your clipboard.

   <div align="center">
     <img src="/images/using-discid/copy-user-id.png" width="250">
   </div>

3. Go back to your command-line and run <kbd>discid [userID]</kbd>, replacing <kbd>[userID]</kbd> with the ID of the user you copied.
   
     For example, if you had the user ID **514106760299151372** copied, run:

      ```bash
      discid 514106760299151372
      ```

Depending on what the status of the user is, different information may appear. For example, this is what it could look like in one instance:

```bash
iinter (lunar) • 🟢 Online
Listening To: It Ain't Hard to Tell by Nas on Illmatic • 3min 14sec left
Playing: Visual Studio Code • 📂 site  • 📝 using-discid.md (51, 4) • 44min 39sec
Platform: Desktop
Avatar URL: https://cdn.discordapp.com/avatars/514106760299151372/4b869d3c6104a6a29abb8a847cfdd6ad.png
```

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 10px;">
    <strong style="margin-right: 0.8rem;">⚠️</strong> 
    <span><strong>Note:</strong> This will only work on user ID's that are in the the Lanyard Discord server: <a href="https://discord.gg/lanyard" target="_blank" rel="noopener noreferrer">https://discord.gg/lanyard</a></span>
</div>

## What else?

More fields are supported and shown in the output, not just the ones shown in examples. The full list that can be displayed is as follows:

* Username
* [Global Name](https://support.discord.com/hc/en-us/articles/12620128861463-New-Usernames-Display-Names)
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
Listening To: Juicy - 2005 Remaster by The Notorious B.I.G. on Ready to Die (The Remaster) • 1min 42sec left
# Time left is calculated by doing (current time - end time).
# Song name, artist, and album comes from other fields set in the 'activities' section, specifically in 'spotify:1'.

Playing: osu! • Himeringo - Koitsubakihime [Another] • Clicking circles
# 'Himeringo - Koitsubakihime [Another]' comes from the state details, which is set to the name and difficulty of the map by osu!.
# 'Clicking circles' comes from the state text in the activities section.

Watching: Netflix • Alya Sometimes Hides Her Feelings in Russian
# 'Netflix' is the platform being used and is set as the name of the activity.
# 'Alya Sometimes Hides Her Feelings in Russian' is the show name and is set as the state text.
```

## Options

### <kbd>--json</kbd>

This will print the user's information in a formatted, syntax-highlighted JSON response. 

This is fetched from <kbd>https://api.lanyard.rest/v1/users/:user_id</kbd>, replacing <kbd>:user_id</kbd> with the user ID you entered. You can see an example of this with the user ID **514106760299151372** below.

```json
{
  "kv": {
    "email": "hi@iinter.me",
    "location": "UK",
    "website": "https://iinter.me"
  },
  "spotify": {
    "track_id": "7AE0NKbt0BemBF8wuC2uCG",
    "timestamps": {
      "start": 1718648406978,
      "end": 1718648514831
    },
    "album": "THE MOUSE & THE MASK",
    "album_art_url": "https://i.scdn.co/image/ab67616d0000b2736c3fb85147fcf2972923cf2d",
    "artist": "DANGERDOOM; MF DOOM; Danger Mouse",
    "song": "Vats of Urine"
  },
  "discord_user": {
    "id": "514106760299151372",
    "username": "iinter",
    "avatar": "7899b6669d533ddbb71daba31c511770",
    "discriminator": "0",
    "bot": false,
    "clan": null,
    "global_name": "lunar",
    "avatar_decoration_data": null,
    "display_name": "lunar",
    "public_flags": 4194432
  },
  "activities": [
    {
      "flags": 48,
      "id": "spotify:1",
      "name": "Spotify",
      "type": 2,
      "state": "DANGERDOOM; MF DOOM; Danger Mouse",
      "session_id": "3b0eb598df22c414a6b8920d8e9717f6",
      "details": "Vats of Urine",
      "timestamps": {
        "start": 1718648406978,
        "end": 1718648514831
      },
      "assets": {
        "large_image": "spotify:ab67616d0000b2736c3fb85147fcf2972923cf2d",
        "large_text": "THE MOUSE & THE MASK"
      },
      "sync_id": "7AE0NKbt0BemBF8wuC2uCG",
      "created_at": 1718648598163,
      "party": {
        "id": "spotify:514106760299151372"
      }
    },
    {
      "id": "733484c2f2178e27",
      "name": "osu!",
      "type": 0,
      "state": "Idle",
      "application_id": "367827983903490050",
      "assets": {
        "large_image": "373344233077211136",
        "large_text": "intter (rank #396,678)",
        "small_image": "373370493127884800",
        "small_text": "osu!"
      },
      "created_at": 1718648584568
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

<div style="padding: 0.8rem 1rem; background-color: #262626; border-radius: 0.375rem; font-size: 0.96rem; display: flex; align-items: center; color: #d4d4d8; margin-top: 10px; margin-bottom: 15px;">
    <strong style="margin-right: 0.8rem;">💡</strong> 
    <span><strong>Tip:</strong> This works with any user ID on Discord!</span>
</div>

<div align="center">
  <video src="https://us-east-1.tixte.net/uploads/files.iinter.me/open-option-example.mp4" controls></video>
</div>

### <kbd>--kv</kbd>

Lanyard also has [key-value pairs](https://en.wikipedia.org/wiki/Name%E2%80%93value_pair) (KV for short) which allow a key-value store to be added to the response by the user. See [here](https://github.com/Phineas/lanyard?tab=readme-ov-file#kv) for how to add them to your own response.

Here is an example with the KV of **514106760299151372**:

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

With those key-value's set, here is the terminal output that you will get for this:

```bash
KV of iinter: # 514106760299151372

email: hi@iinter.me
location: UK
website: https://iinter.me
```

---

To end off, if you have found **discid** useful in any way, make sure to visit the GitHub repository [here](https://github.com/inttter/discid) and give it a star to show your support! I appreciate it very much.