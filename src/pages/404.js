import React from 'react';
import Navbar from '../components/Navbar';
import { X, ArrowLeft } from 'lucide-react';
import Head from 'next/head';

export default function Custom404() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>404 | Inter</title>
      </Head>
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <X size={40} className="mr-2 text-red-400 md:mt-0 mt-10" />
          <h1 className="text-4xl md:text-5xl text-zinc-100 opacity-90 md:mt-0 mt-10 max-w-md font-semibold tracking-tighter flex items-center">
            Page Not Found
          </h1>
        </div>
        <p className="text-neutral-500 text-lg max-w-lg">
          Sorry, the page you were looking for could not be found.
          You may have made a typo, or the link might have been changed, moved, or deleted.
        </p>
        <button class="group justify-center rounded-md text-sm font-medium bg-neutral-800 text-zinc-300 hover:bg-neutral-700/80 duration-300 px-5 py-2 flex items-center" onClick={() => window.history.back()}>
          <ArrowLeft size={15} className="mr-1 group-hover:-translate-x-0.5 duration-200" /> Go back
        </button>
        <Navbar />
      </div>
    </div>
  );
}