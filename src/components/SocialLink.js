import React from 'react';
import Link from 'next/link';
import { IconContext } from 'react-icons';
import { FaGithub, FaTwitter, FaSteam, FaDiscord, FaLastfm } from 'react-icons/fa';
import { SiAnilist, SiOsu } from "react-icons/si";

export default function SocialLink({ href, tooltipText, social }) {
  // Sadly, i have to use react-icons in order for the icons to appear 
  // without the "Element type is invalid" error.
  // However, react-icons is used for the Context Provider.
  const getIcon = () => {
    switch (social) {
      case 'GitHub':
        return <FaGithub className="text-neutral-500 hover:text-zinc-100" />;
      case 'Steam':
        return <FaSteam className="text-neutral-500 hover:text-[#579fc9]" />;
      case 'Discord':
        return <FaDiscord className="text-neutral-500 hover:text-[#5865F2]" />;
      case 'Twitter':
        return <FaTwitter className="text-neutral-500 hover:text-sky-400" />;
      case 'osu!':
        return <SiOsu className="text-neutral-500 hover:text-pink-400" />;
      case 'AniList':
        return <SiAnilist className="text-neutral-500 hover:text-sky-400" />;
      case 'Last.fm':
        return <FaLastfm className="text-neutral-500 hover:text-red-500" />;
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
        <div className="flex items-center">
          <IconContext.Provider value={{ size: '35px', className: 'mb-2 hover:scale-105 active:scale-110 active:rotate-6 duration-150' }}>
            {getIcon()}
          </IconContext.Provider>
        </div>
      </Link>
    </div>
  );
}