import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="absolute top-10">
            <button
                className="md:hidden text-zinc-100 hover:text-zinc-300 duration-300"
                onClick={toggleMenu}
            >
                menu ↗
            </button>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`${isOpen ? 'block' : 'hidden'} bg-neutral-950 bg-opacity-60 backdrop-blur-sm p-4 my-1 rounded-md shadow-lg z-10 border border-neutral-800`}
            >
                <div className="flex flex-col space-y-2 text-neutral-300 hover:text-neutral-100 duration-300">
                    <Link href="/" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Home
                    </Link>
                    <Link href="/anime" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Anime List
                    </Link>
                    <Link href="/projects" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Projects
                    </Link>
                    <Link href="/blog" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Blog
                    </Link>
                </div>
            </motion.div>
            <div className="hidden md:flex space-x-4">
                <Link href="/" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    /
                </Link>
                <Link href="/anime" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    anime
                </Link>
                <Link href="/projects" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    projects
                </Link>
                <Link href="/blog" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    blog
                </Link>
            </div>
        </div>
    );
}

export default Navbar;