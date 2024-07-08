import React from 'react';
import Link from 'next/link';
import { FaGithub, FaTwitter, FaSteam, FaDiscord, FaLastfm } from 'react-icons/fa';
import { SiAnilist, SiOsu } from "react-icons/si";

export default function SocialLink({ href, tooltipText, social }) {
  const getIcon = () => {
    switch (social) {
      case 'GitHub':
        return <FaGithub className="hover:text-soft duration-300" />;
      case 'Steam':
        return <FaSteam className="hover:text-soft duration-300" />;
      case 'Discord':
        return <FaDiscord className="hover:text-soft duration-300" />;
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
    <div className="tooltip tooltip-bottom rounded-xl relative group bg-transparent" data-tip={tooltipText} data-theme="black">
      <Link href={href} target="_blank" rel="noopener noreferrer" alt={social}>
        <div className="flex items-center text-4xl text-stone-500 mb-2 hover:scale-105 active:scale-110 hover:rotate-2 active:rotate-6 duration-150">
          {getIcon()}
        </div>
      </Link>
    </div>
  );
}