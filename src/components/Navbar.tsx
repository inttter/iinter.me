import React from 'react';
import Link from 'next/link';

function Navbar() {
    return (
        <div className="absolute top-10 space-x-4">
        <Link href="/" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
          home ↗
        </Link>
        <Link href="/projects" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
          projects ↗
        </Link>
        <Link href="/blog" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
          blog ↗
        </Link>
      </div>
    )
}

export default Navbar;