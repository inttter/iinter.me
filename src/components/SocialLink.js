import React from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaGithub, FaTwitter, FaSteam, FaDiscord, FaLastfm } from 'react-icons/fa';
import { SiAnilist, SiOsu } from "react-icons/si";

export default function SocialLink({ href, tooltipText, social }) {
  const getIcon = () => {
    switch (social) {
      case 'GitHub':
        return <FaGithub />;
      case 'Steam':
        return <FaSteam />;
      case 'Discord':
        return <FaDiscord />;
      case 'Twitter':
        return <FaTwitter />;
      case 'osu!':
        return <SiOsu className />;
      case 'AniList':
        return <SiAnilist />;
      case 'Last.fm':
        return <FaLastfm />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="tooltip tooltip-bottom font-semibold relative group" 
      data-tip={tooltipText}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer" alt={social}>
        <div className="flex items-center text-4xl text-neutral-500 hover:text-zinc-300 mb-2 hover:scale-105 active:scale-110 active:rotate-6 duration-150">
            {getIcon()}
        </div>
      </Link>
    </div>
  );
}