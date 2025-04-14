import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight, List } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/anime', label: `Anime List` },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' }
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const isWritingPostPage = /^\/writing\/[^/]+$/.test(router.pathname);

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
    NAV_ITEMS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={`text-soft hover:text-stone-400 duration-300 flex items-center px-1 -ml-2 md:-ml-1 ${router.pathname === href ? 'text-zinc-100' : ''}`}
      >
        {/* On mobile, use 'Anime List' as label instead of 'Anime' */}
        {href === '/anime' ? (isMobile ? 'Anime List' : 'Anime') : label}
      </Link>
    ))
  );

  // Only shows up when on the /writing/[slug] page
  const backButton = (
    <Link
      href="/writing"
      className="flex items-center px-1 -ml-2 md:-ml-1 text-stone-400/85 hover:text-stone-500 duration-300"
    >
      Back
    </Link>
  );

  return (
    <div className="absolute top-13.5">
      {/* Mobile Navbar */}
      {isMobile ? (
        <div>
          <button
            className={`text-zinc-300 hover:text-zinc-100 ${isOpen ? 'text-neutral-100' : 'text-zinc-100'} rounded-md duration-300 flex items-center tags group hover:cursor-pointer`}
            onClick={toggleMenu}
          >
            <List size={15} className={`mr-1 text-stone-400 ${isOpen ? 'text-zinc-300' : 'text-stone-400'} duration-300`} />
            Menu
            <div className={`transform transition-transform duration-300 ${isOpen ? 'ease-in-out rotate-90 text-emerald-300' : 'ease-in-out rotate-0 text-stone-400/80'}`}>
              <ChevronRight size={18} />
            </div>
          </button>
          <div className={`${isOpen ? 'block' : 'hidden'} bg-neutral-900 backdrop-blur-xs px-2 py-3 pl-4 my-2 rounded-md shadow-2xl shadow-neutral-900 z-10 border border-neutral-800 animate-blurred-fade-in duration-300`}>
            <div className="flex flex-col space-y-3 text-soft hover:text-neutral-100 duration-300">
              {isWritingPostPage && (
                <>
                  {backButton}
                  <hr className="border-t border-neutral-700/60 w-full -ml-1 -mt-1" />
                </>
              )}
              {renderNavItems()}
            </div>
          </div>
        </div>
      ) : (
        // Desktop Navbar
        <div className="hidden md:flex space-x-2 items-center">
          {isWritingPostPage && (
            <>
              {backButton}
              <div className="h-4 border-l border-neutral-700/60 -ml-1" />
            </>
          )}
          {renderNavItems()}
        </div>
      )}
    </div>
  );
}

export default Navbar;
