import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
                    <Link href="/" className="text-neutral-100 hover:text-neutral-300 duration-300 flex items-center">
                    <Image src="https://us-east-1.tixte.net/uploads/inter.tixte.co/blossom_v2.webp" width={15} height={15} alt="Tree" className="mr-2" /> Home
                    </Link>
                    <Link href="/anime" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Anime List
                    </Link>
                    <Link href="/projects" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Projects
                    </Link>
                    <Link href="/writing" className="text-neutral-100 hover:text-neutral-300 duration-300">
                        Writing
                    </Link>
                </div>
            </motion.div>
            <div className="hidden md:flex space-x-4 items-center">
                <Link href="/" className="tooltip tooltip-bottom bg-transparent" data-tip="home" data-theme="lofi">
                   <Image src="https://us-east-1.tixte.net/uploads/inter.tixte.co/blossom_v2.webp" width={25} height={25} alt="Tree" />
                </Link>
                <Link href="/anime" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    anime
                </Link>
                <Link href="/projects" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    projects
                </Link>
                <Link href="/writing" className="text-zinc-100 hover:text-zinc-300 duration-300 border-b-2 border-dotted border-neutral-700 hover:border-neutral-500">
                    writing
                </Link>
            </div>
        </div>
    );
}

export default Navbar;