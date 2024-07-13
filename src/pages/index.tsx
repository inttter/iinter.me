import React from 'react';
import SocialLink from '../components/SocialLink';
import Lanyard from '../components/Lanyard';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <h1 className="text-5xl">
            <Lanyard showAlbumArt={false} />
          </h1>
        </div>
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1.0 }} 
          className="flex justify-start space-x-3 animate-blurred-fade-in duration-700" 
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
        <Lanyard showUsername={false} showEmoji={false} showAlbumArt={true} />
      </div>
    </div>
  );
}