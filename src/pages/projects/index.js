import React from 'react';
import Projects from '../../components/Projects';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import Head from 'next/head';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';

export default function ProjectsPage() {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
        <Head>
          <title>inter | projects</title>
        </Head>
          <Projects />
          <div className="fixed hidden md:block bottom-4 right-4 text-gray-500 text-xs">All projects are licensed under the 
          <Link href="https://inter.mit-license.org/" className="ml-1 border-b-2 border-neutral-700 hover:border-neutral-600 duration-300 animate-in fade-in">
            MIT License
          </Link>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}