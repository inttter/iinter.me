import React from 'react';
import { motion } from 'framer-motion';
import SocialLink from '../components/SocialLink';
import Lanyard from '../components/Lanyard';
import ProjectsDrawer from '../components/Drawer';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';

export default function Home() {
  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl tracking-wide text-zinc-100 opacity-90 selection:bg-white selection:text-black"
          >
            <Lanyard showAlbumArt={false} />
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-start md:space-x-5 space-x-3 selection:bg-gray-700 bg-transparent"
          data-theme="lofi"
        >
          <SocialLink href="https://github.com/inttter" src="socials/github.svg" alt="GitHub" tooltipText="@inttter" />
          <SocialLink href="https://steamcommunity.com/id/intermed" src="socials/steam.svg" alt="Steam" tooltipText="@inter" />
          <SocialLink href="https://discord.com/users/514106760299151372" src="socials/discord.svg" alt="Discord" tooltipText="@iinter" />
          <SocialLink href="https://twitter.com/accmpy" src="socials/twitter.svg" alt="Twitter" tooltipText="@accmpy" />
          <SocialLink href="https://osu.ppy.sh/users/19054376" src="socials/osu.svg" alt="osu!" tooltipText="@intter" />
          <SocialLink href="https://www.last.fm/user/intter" src="/socials/lastfm.svg" alt="Last.fm" tooltipText="@intter" />
        </motion.div>
        <ProjectsDrawer />
      </div>
    </div>
  );
}