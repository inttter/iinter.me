import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, NotebookPen, Code, Cat, Home } from 'lucide-react';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute top-10">
            <button
                className="md:hidden text-zinc-100 duration-300 flex items-center"
                onClick={toggleMenu}
            >
                menu {isOpen ? <ChevronDown className="text-emerald-300" /> : <ChevronRight className="text-neutral-600" />}
            </button>
            <div
                className={`${isOpen ? 'block' : 'hidden'} bg-neutral-900 bg-opacity-60 backdrop-blur-sm p-4 my-2 rounded-md shadow-2xl shadow-neutral-900 z-10 border border-neutral-800 animate-blurred-fade-in duration-300`}
            >
                <div className="flex flex-col space-y-2 text-neutral-300 hover:text-neutral-100 duration-300">
                    <Link href="/" className="text-neutral-100 hover:text-neutral-300 duration-300 flex items-center">
                        <Home size={15} className="mr-1.5 text-neutral-600" /> Home
                    </Link>
                    <Link href="/anime" className="text-neutral-100 hover:text-neutral-300 duration-300 flex items-center">
                        <Cat size={15} className="mr-1.5 text-neutral-600" /> Anime List
                    </Link>
                    <Link href="/projects" className="text-neutral-100 hover:text-neutral-300 duration-300 flex items-center">
                       <Code size={15} className="mr-1.5 text-neutral-600" /> Projects
                    </Link>
                    <Link href="/writing" className="text-neutral-100 hover:text-neutral-300 duration-300 flex items-center">
                       <NotebookPen size={15} className="mr-1.5 text-neutral-600" /> Writing
                    </Link>
                </div>
            </div>
            <div className="hidden md:flex space-x-1 items-center">
                <Link href="/" className="text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center">
                    <Home size={15} className="mr-1.5 text-neutral-600" /> home
                </Link>
                <Link href="/anime" className="text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center">
                   <Cat size={15} className="mr-1.5 text-neutral-600" /> anime
                </Link>
                <Link href="/projects" className="text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center">
                   <Code size={15} className="mr-1.5 text-neutral-600" /> projects
                </Link>
                <Link href="/writing" className="text-zinc-100 duration-300 hover:bg-neutral-800 rounded-md px-2 py-1 flex items-center">
                   <NotebookPen size={15} className="mr-1.5 text-neutral-600" /> writing
                </Link>
            </div>
        </div>
    );
}

export default Navbar;