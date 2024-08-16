# iinter.me
    
* [**Next.js**](https://nextjs.org)
* [**Tailwind CSS**](https://tailwindcss.com)
* [**Vercel**](https://vercel.com)


## Run locally

```bash
git clone https://github.com/inttter/iinter.me.git
cd iinter.me
npm install
npm run dev
```

<details>
  <summary><strong>
  How to automatically update a post's last updated time
  </strong></summary>
  
  <br />

  When you make changes to a post, whether it'd be text updates or fixes, you should update the `lastUpdated` field in the YAML frontmatter. This gets displayed at the bottom of the post's page in the `DD/MM/YY HH:MM` format.

  To update the field for a specific post automatically, run the following script, replacing `[file]` with the name of the file in the `content` directory containing the post:

  ```bash
  npm run last-updated -- content/[file].md
  ```

  If done correctly, you should get an output like this example below, with the date and time in UTC:

  ```bash
  # [FILE PATH] will be replaced with the file path you have the post in.
  # [FILE] will be replaced with the name of the post file. 
  ✔  Date updated to 16/08/24 13:15 in [FILE PATH]\content\[file].md!
  ```

  If you run this script correctly and you get this warning:

  ```
 WARN  No changes were made to the file.
        This is possibly because:
        - The current time is the same as the time in the field currently.
        - The current format of lastUpdated is invalid (it should be DD/MM/YY HH:MM).
        Check the lastUpdated field in the frontmatter or try again when the next minute rolls around.
        See the website repository for more information: https://github.com/inttter/iinter.me.
  ```

  You can do **two** things:

  * Make sure that the `lastUpdated` field is in the format of `DD/MM/YY HH:MM`. For example, but not limited to this:

    ```yaml
    lastUpdated: 16/08/2024 13:15 # ❌ Invalid
    lastUpdated: 16/08/24 13:15 # ✅ Valid
    ```

  or...

  * **Wait until the next minute to update the time.** Running the script twice within the same minute on a file won't won't change anything since the time has not changed yet.
</details>

## License

© **2024** - Licensed under the [**MIT License**](https://github.com/inttter/iinter.me/blob/master/LICENSE).

Posts are also licensed under the MIT License, but content inside of these posts may be subject to other licenses.