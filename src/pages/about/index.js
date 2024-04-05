import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Lanyard from '../../components/Lanyard';
import Link from 'next/link';
import Head from 'next/head';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';

export default function Home() {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8 selection:bg-[#E8D4B6] selection:text-black">
      <div className="max-w-2xl w-full px-4 py-8 mt-10 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Head>
            <title>inter | about</title>
          </Head>
          <Navbar />
          <p>I like racing (games), computers, and cats. I'm also from the UK.</p>
        </div>

        <p>
          You can check out my projects
          <Link href="/projects" className="text-white border-b-2 border-gray-500 hover:border-gray-400 duration-300 animate-in fade-in mx-1">
            here
          </Link>
          or you can see what I'm thinking about 
          <Link href="/blog" className="text-white border-b-2 border-gray-500 hover:border-gray-400 duration-300 animate-in fade-in mx-1">
            here.
          </Link>
        </p>

        <p>
          Here's my main playlist:
        </p>

        {/* Adjust Spotify iframe width for better mobile display */}
        <iframe style={{ borderRadius: '12px', width: '100%', maxWidth: '700px' }} src="https://open.spotify.com/embed/playlist/2jetgPieA6D2fafjl01aYC?utm_source=generator" height="152" frameBorder="0" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>

        <p className="col-span-3">
          And if I'm listening to something at this time, you'll see it below.
        </p>

        <Lanyard showUsername={false} showEmoji={false} showAlbumArt={true} />

        <p className="col-span-3">
          When I'm not listening to music, I'm <em className="mr-0.5">probably</em> playing something. I have ~70 games on Steam, and some more misc ones that are on other platforms.
        </p>

        <p className="col-span-3">
          If you want to find me on my socials, go
          <Link href="/" className="text-white border-b-2 border-gray-500 hover:border-gray-400 duration-300 animate-in fade-in mx-1">
            here,
          </Link>
          otherwise, thanks for reading.
        </p>
      </div>
    </div>
  );
}