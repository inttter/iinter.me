import React from 'react';
import Navbar from '../components/Navbar';

export default function Custom404() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-4 flex-col">
        <div className="flex items-center justify-start">
          <h1 className="text-4xl md:text-5xl text-zinc-100 opacity-90 md:mt-0 mt-10 max-w-md font-semibold tracking-tighter border-b-2 border-dotted border-neutral-700">
            Page Not Found
          </h1>
        </div>
          <p className="text-neutral-600 text-lg max-w-lg">
            Sorry, the page you requested could not be found.
          </p>
        <Navbar />
      </div>
    </div>
  );
}