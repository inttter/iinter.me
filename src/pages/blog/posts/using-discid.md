---
title: "Using discid"
date: "March 11, 2024"
lastUpdated: "23/03/2024 17:35"
author: "Inter"
timeToRead: 4
image: "https://cdn.discordapp.com/attachments/892836872118763543/1216831277437681775/New_Project_23.png?ex=6601d170&is=65ef5c70&hm=d78c336154af6e156f708a45484e4dbcc4a1aabdd1ac030dfa7f81f2488cadd4&"
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

To find someone's user ID, run this code in the terminal, replacing "userID" with the ID of the user you want to check the status of:

```
discid <userID>
```

#  How do you find a user ID?

**1)** Enable Developer mode by going to: **Settings** ➔ **Advanced** ➔ **Developer Mode**, and check the toggle.

<img src="https://cdn.discordapp.com/attachments/892836872118763543/1216833843164741732/image.png?ex=6601d3d3&is=65ef5ed3&hm=2469db0185e6dabce2d40fb3ebac60a257c6ed34f8ffbd84262863ddf3e5f433&">

**2)** Right click on a user and click *Copy User ID*.

<div align="center">
<img src="https://cdn.discordapp.com/attachments/892836872118763543/1216834414181613618/image.png?ex=6601d45c&is=65ef5f5c&hm=f8798ab1b853c1147451a91b5310d9d95257db3e95be7dcc860e0aec7c403fc8&">
</div>

**3)** Go back to your command line and run discid <userId> replacing <userId> with the ID you copied. For example, if you had the user ID ***514106760299151372*** (my user ID!) copied, you would run:

```
discid 514106760299151372
```

Depending on what the user's status is, different things may come up. For example, this is what it looks like right now as of me writing this:

```
iinter • 🟢 Online
Listening To: It Ain't Hard to Tell by Nas on Illmatic • 3min 14sec left
Playing: Visual Studio Code • 📂 website  • 📝 using-discid.md (51, 4) • 44min 39sec
Platform: Desktop
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

More specific details are also shown for certain fields, such as time playing for (**eg. 44min 39sec**), time left of song (**eg. 3min 14sec left**), activity state/details (**eg. STANDARD match - Round 4 / 6**), and more.

# Options

There's a few command line options also available:

#### --json
This option will print the user's information in a JSON format. You can see an example of this with user ID **514106760299151372** below:

```
{
  "kv": {},
  "spotify": {
    "track_id": "2CPturRUlpvirYr7VpkXCV",
    "timestamps": {
      "start": 1710187360804,
      "end": 1710187562910
    },
    "album": "Illmatic",
    "album_art_url": "https://i.scdn.co/image/ab67616d0000b273045fc920ecf4f8094888ec26",      
    "artist": "Nas",
    "song": "It Ain't Hard to Tell"
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
      "flags": 48,
      "id": "spotify:1",
      "name": "Spotify",
      "type": 2,
      "state": "Nas",
      "session_id": "ec629cdd21cfcd5064cb513be8ec55d2",
      "details": "It Ain't Hard to Tell",
      "timestamps": {
        "start": 1710187360804,
        "end": 1710187562910
      },
      "assets": {
        "large_image": "spotify:ab67616d0000b273045fc920ecf4f8094888ec26",
        "large_text": "Illmatic"
      },
      "sync_id": "2CPturRUlpvirYr7VpkXCV",
      "created_at": 1710187389572,
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

<br>

#### --open
This option will open the user's Discord profile in your browser. You can see an example of this in action below:

<div align="center">
<img src="https://github.com/inttter/discid/assets/73017070/6e75e85f-e639-4ecb-ae9e-da451a4a689f">
</div>

<br>

To check this package out on GitHub, click [here](https://github.com/inttter/discid), and on NPM [here](https://npmjs.com/package/discid). If you'd also like to, ⭐ the repository!