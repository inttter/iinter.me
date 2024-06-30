import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, NotebookPen, Code, Cat, Home, List } from 'lucide-react';

function Navbar() {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute top-10">
          {/* Mobile Navbar */}
          <button className={`md:hidden text-zinc-100 px-2 py-1 ${isOpen ? 'bg-neutral-800' : 'bg-transparent'} rounded-md duration-300 flex items-center tags group`} onClick={toggleMenu}>
            <List size={15} className={`mr-1 text-neutral-500 ${isOpen ? 'text-zinc-300' : 'text-neutral-400'} duration-300`} /> Menu
              <div className={`transform transition-transform ${isOpen ? 'duration-500 ease-in-out' : 'duration-200 ease-in-out'} ${isOpen ? 'rotate-90 text-emerald-300' : 'rotate-0 text-neutral-600'}`}>
                <ChevronRight />
              </div>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} bg-neutral-900 backdrop-blur-sm p-2.5 my-2 rounded-md shadow-2xl shadow-neutral-900 z-10 border border-neutral-800 animate-blurred-fade-in duration-300`}>
            <div className="flex flex-col space-y-2 text-neutral-300 hover:text-neutral-100 duration-300">
              <Link href="/" className="rounded-md text-neutral-100 hover:text-neutral-300 hover:bg-neutral-800 active:bg-neutral-700 active:bg-opacity-50 px-2 py-1 duration-300 flex items-center">
                <Home size={15} className="mr-1.5 text-neutral-500" /> Home
              </Link>
              <Link href="/anime" className="rounded-md text-neutral-100 hover:text-neutral-300 hover:bg-neutral-800 active:bg-neutral-700 active:bg-opacity-50 px-2 py-1 duration-300 flex items-center">
                <Cat size={15} className="mr-1.5 text-neutral-500" /> Anime List
              </Link>
              <Link href="/projects" className="rounded-md text-neutral-100 hover:text-neutral-300 hover:bg-neutral-800 active:bg-neutral-700 active:bg-opacity-50 px-2 py-1 duration-300 flex items-center">
                <Code size={15} className="mr-1.5 text-neutral-500" /> Projects
              </Link>
              <Link href="/writing" className="rounded-md text-neutral-100 hover:text-neutral-300 hover:bg-neutral-800 active:bg-neutral-700 active:bg-opacity-50 px-2 py-1 duration-300 flex items-center">
                <NotebookPen size={15} className="mr-1.5 text-neutral-500" /> Writing
              </Link>
          </div>
        </div>
        
        {/* Desktop Navbar */}
        <div className="hidden md:flex space-x-1 items-center">
          <Link href="/" className={`text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center ${router.pathname === '/' ? 'bg-neutral-700 bg-opacity-55' : ''}`}>
            <Home size={15} className="mr-1.5 text-neutral-500" /> Home
          </Link>
          <Link href="/anime" className={`text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center ${router.pathname === '/anime' ? 'bg-neutral-700 bg-opacity-55' : ''}`}>
            <Cat size={15} className="mr-1.5 text-neutral-500" /> Anime
          </Link>
          <Link href="/projects" className={`text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center ${router.pathname === '/projects' ? 'bg-neutral-700 bg-opacity-55' : ''}`}>
            <Code size={15} className="mr-1.5 text-neutral-500" /> Projects
          </Link>
          <Link href="/writing" className={`text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center ${router.pathname === '/writing' ? 'bg-neutral-700 bg-opacity-55' : ''}`}>
            <NotebookPen size={15} className="mr-1.5 text-neutral-500" /> Writing
          </Link>
        </div>
      </div>
    );
  };

export default Navbar;