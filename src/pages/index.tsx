import React from 'react';
import SocialLink from '@/components/SocialLink';
import Lanyard from '@/components/Lanyard';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-3 md:px-0 py-24 md:py-16 space-y-4">
        <div className="flex items-center justify-start">
          <Lanyard showAlbumArt={false} />
        </div>
        <div className="flex justify-start space-x-3 px-0 md:px-1">
          <SocialLink href="https://github.com/inttter" social="GitHub" tooltipText="@inttter" />
          <SocialLink href="https://steamcommunity.com/id/inttter" social="Steam" tooltipText="@inter" />
          <SocialLink href="https://twitter.com/accmpy" social="Twitter" tooltipText="@accmpy" />
          <SocialLink href="https://osu.ppy.sh/users/19054376" social="osu!" tooltipText="@intter" />
          <SocialLink href="https://anilist.co/user/intter" social="AniList" tooltipText="@intter" />
          <SocialLink href="https://www.last.fm/user/intter" social="Last.fm" tooltipText="@intter" />
        </div>
        <Navbar />
        <Lanyard showUsername={false} showStatusDot={false} showAlbumArt={true} />
      </div>
    </div>
  );
}