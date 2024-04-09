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
                className="md:hidden text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black"
                onClick={toggleMenu}
            >
                Menu ↗
            </button>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`${isOpen ? 'block' : 'hidden'} bg-neutral-800 p-4 my-4 rounded-lg shadow-lg z-10`}
            >
                <div className="flex flex-col space-y-2 hover:text-zinc-100">
                    <Link href="/" className="text-neutral-300 hover:text-neutral-100">
                        Home
                    </Link>
                    <Link href="/about" className="text-neutral-300 hover:text-neutral-100">
                        About
                    </Link>
                    <Link href="/projects" className="text-neutral-300 hover:text-neutral-100">
                        Projects
                    </Link>
                    <Link href="/blog" className="text-neutral-300 hover:text-neutral-100">
                        Blog
                    </Link>
                    <button
                        className="text-neutral-300 hover:text-neutral-100 -ml-4"
                        onClick={toggleMenu}
                    >
                        Close
                    </button>
                </div>
            </motion.div>
            <div className="hidden md:flex space-x-4">
                <Link href="/" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
                    home ↗
                </Link>
                <Link href="/about" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
                    about ↗
                </Link>
                <Link href="/projects" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
                    projects ↗
                </Link>
                <Link href="/blog" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
                    blog ↗
                </Link>
            </div>
        </div>
    );
}

export default Navbar;