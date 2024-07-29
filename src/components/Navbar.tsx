import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, NotebookPen, Code, Cat, Home, List } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home', icon: <Home size={15} /> },
  { href: '/anime', label: `Anime List`, icon: <Cat size={15} /> },
  { href: '/projects', label: 'Projects', icon: <Code size={15} /> },
  { href: '/writing', label: 'Writing', icon: <NotebookPen size={15} /> }
];

function Navbar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // react-device-detect won't show the navbar on devices like iPads,
    // but this seems to work so use this.
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const renderNavItems = () => (
    NAV_ITEMS.map(({ href, label, icon }) => (
      <Link
        key={href}
        href={href}
        className={`rounded-md text-soft hover:text-neutral-300 hover:bg-neutral-800 active:bg-opacity-80 px-2 py-1 duration-300 flex items-center ${router.pathname === href ? 'bg-neutral-800 bg-opacity-80' : ''}`}
      >
        <span className="mr-1.5 text-neutral-500">{icon}</span>
        {/* On mobile, use 'Anime List' as label instead of 'Anime' */}
        {href === '/anime' ? (isMobile ? 'Anime List' : 'Anime') : label}
      </Link>
    ))
  );

  return (
    <div className="absolute top-10">
      {/* Mobile Navbar */}
      {isMobile ? (
        <div>
          <button
            className={`text-zinc-100 px-2 py-1 ${isOpen ? 'bg-neutral-900' : 'bg-transparent'} rounded-md duration-300 flex items-center tags group`}
            onClick={toggleMenu}
          >
            <List size={15} className={`mr-1 text-neutral-500 ${isOpen ? 'text-zinc-300' : 'text-neutral-400'} duration-300`} />
            Menu
            <div className={`transform transition-transform duration-300 ${isOpen ? 'ease-in-out rotate-90 text-emerald-300' : 'ease-in-out rotate-0 text-neutral-600'}`}>
              <ChevronRight />
            </div>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} bg-neutral-900 backdrop-blur-sm p-2.5 my-2 rounded-md shadow-2xl shadow-neutral-900 z-10 border border-neutral-800 animate-blurred-fade-in duration-300`}>
            <div className="flex flex-col space-y-2 text-soft hover:text-neutral-100 duration-300">
              {renderNavItems()}
            </div>
          </div>
        </div>
      ) : (
        // Desktop Navbar}
        <div className="hidden md:flex space-x-1 items-center">
          {renderNavItems()}
        </div>
      )}
    </div>
  );
}

export default Navbar;