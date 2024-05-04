import React from 'react';
import { motion } from 'framer-motion';
import SocialLink from '../components/SocialLink';
import Lanyard from '../components/Lanyard';
import Navbar from '../components/Navbar';

export default function Home() {
  const currentDate = new Date();
  const isBirthday = currentDate.getDate() === 25 && currentDate.getMonth() === 6;

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} 
            className="text-4xl md:text-5xl tracking-wide text-zinc-100 opacity-90 md:mt-0 mt-10 max-w-md"
          >
            <Lanyard showAlbumArt={false} />
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex justify-start md:space-x-5 space-x-3 bg-transparent"
          data-theme="lofi"
        >
          <SocialLink href="https://github.com/inttter" social="GitHub" tooltipText="@inttter" />
          <SocialLink href="https://steamcommunity.com/id/intermed" social="Steam" tooltipText="@inter" />
          <SocialLink href="https://discord.com/users/514106760299151372" social="Discord" tooltipText="@iinter"/>
          <SocialLink href="https://twitter.com/accmpy" social="Twitter" tooltipText="@accmpy" />
          <SocialLink href="https://osu.ppy.sh/users/19054376" social="osu!" tooltipText="@intter" />
          <SocialLink href="http://anilist.co/user/intter" social="AniList" tooltipText="@intter" />
          <SocialLink href="https://www.last.fm/user/intter" social="Last.fm" tooltipText="@intter" />
        </motion.div>
        <Navbar />
        <Lanyard showUsername={false} showEmoji={false} showAlbumArt={true}  />
        {isBirthday && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="absolute top-9 right-7 md:right-1/3 text-zinc-400 bg-transparent text-lg font-semibold"
          >
           🎂
          </motion.div>
        )}
      </div>
    </div>
  );
}