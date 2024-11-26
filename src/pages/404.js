import React from 'react';
import Navbar from '../components/Navbar';
import Head from 'next/head';

const title = '404';
const description = 'Page not found. This link might have been moved or deleted, so try visiting one of the pages above instead!';

export default function Custom404() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>404 | Inter</title>
      </Head>
      <div className="max-w-2xl w-full px-3 md:px-0 py-24 md:py-16 space-y-4">
        <div className="flex justify-center">
          <div className="text-8xl text-soft font-semibold tracking-tighter -mb-2" aria-label="404 Title">
            {title}
          </div>
        </div>
        <div className="flex justify-center">
          <div className="text-stone-400 text-base text-center max-w-lg" aria-label="404 Message">
            {description}
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}
