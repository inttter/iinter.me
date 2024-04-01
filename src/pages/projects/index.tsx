import React from 'react';
import Projects from '../../components/Projects';
import Link from 'next/link';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';

export default function ProjectsPage() {
  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Projects />
        </div>
        <div className="absolute top-2 space-x-4">
          <Link href="/" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
            home ↗
          </Link>
          <Link href="/blog" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
            blog ↗
          </Link>
        </div>
      </div>
    </div>
  );
}