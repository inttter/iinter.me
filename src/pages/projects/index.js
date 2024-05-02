import React from 'react';
import Projects from '../../components/Projects';
import Navbar from '../../components/Navbar';
import Head from 'next/head';

export default function ProjectsPage() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
        <Head>
          <title>projects | iinter.me</title>
        </Head>
        <div className="md:-py-0 py-20">
          <Projects />
        </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}