import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/anime', label: 'Anime' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
];

const Navbar = () => {
  const router = useRouter();
  const isWritingPostPage = /^\/writing\/[^/]+$/.test(router.pathname);

  const renderNavItems = () =>
    NAV_ITEMS.map(({ href, label }) => (
      <Link
        key={href}
        href={href}
        className={`text-soft hover:text-stone-400 duration-300 flex items-center px-1 -ml-1 ${
          router.pathname === href ? 'text-zinc-100 underline underline-offset-2 decoration-neutral-700' : ''
        }`}
      >
        {label}
      </Link>
    )
  );

  // Only shows up when on the /writing/[slug] page
  const backButton = (
    <Link
      href="/writing"
      className="flex items-center text-stone-400/85 hover:text-stone-500 duration-300"
    >
      Back
    </Link>
  );

  return (
    <div className="absolute top-13.5">
      <div className="flex flex-wrap gap-x-2 gap-y-1 items-center">
        {isWritingPostPage && (
          <>
            {backButton}
            <div className="h-4 border-l border-neutral-700/60" />
          </>
        )}
        {renderNavItems()}
      </div>
    </div>
  );
};

export default Navbar;
