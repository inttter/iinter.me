import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaSteam, FaLastfm } from 'react-icons/fa';
import { SiAnilist, SiOsu } from "react-icons/si";
import { motion } from 'framer-motion';

export default function SocialLink({ href, tooltipText, social }) {
  const getIcon = () => {
    switch (social) {
      case 'GitHub':
        return <FaGithub className="hover:text-soft duration-300" />;
      case 'Steam':
        return <FaSteam className="hover:text-soft duration-300" />;
      case 'Twitter':
        return <FaTwitter className="hover:text-soft duration-300" />;
      case 'osu!':
        return <SiOsu className="hover:text-soft duration-300" />;
      case 'AniList':
        return <SiAnilist className="hover:text-soft duration-300" />;
      case 'Last.fm':
        return <FaLastfm className="hover:text-soft duration-300" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ opacity: 0 }}
      className="tooltip tooltip-bottom rounded-xl group bg-transparent relative mt-1"
      data-tip={tooltipText}
      data-theme="bumblebee"
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" aria-label={social}>
        <div className="flex items-center text-4xl text-stone-400/85 hover:scale-105 active:scale-110 hover:rotate-2 active:rotate-6 duration-150">
          {getIcon()}
        </div>
      </Link>
    </motion.div>
  );
}