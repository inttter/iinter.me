import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/jetbrains-mono';
import Link from 'next/link';
import Lanyard from '../../components/Lanyard'

export default function Blog({ posts }) {
  posts.reverse();

  const [searchQuery, setSearchQuery] = useState('');

  // search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // sort by search
  const filteredPosts = posts.filter(post =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // sort by latest
  const sortedPosts = filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scrollbar-thin scrollbar-thumb-slate-50 scroll-smooth p-4 md:p-8">
      <Head>
        <title>inter | blog</title>
        <meta property="og:description" content="inter's (mediocre) blog." />
        <meta property="og:url" content="https://iinter.me/blog" />
      </Head>
      <div className="max-w-3xl w-full px-4 py-8 space-y-6">
        <div className="flex items-center justify-between px-4 py-2 text-lg rounded-md placeholder:text-gray-500 bg-neutral-900 text-zinc-300 focus:outline-none focus:caret-gray-400 border border-gray-800 focus:border-red-200 duration-300 w-full">
          <div className="flex items-center">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2" data-theme="black">
              <img src="https://cdn.discordapp.com/attachments/919647864794284112/1220864348105474108/image_2024-03-22_223621471-modified.png?ex=66107d87&is=65fe0887&hm=c722e50d416fb276dc3e8918cb29a06abe5f4701e60df2fb8552489dba273f75&" />
            </div>
          </div>
          {/* nav */}
          <div className="flex items-center px-1 space-x-4">
        <Link href="/">
          <div className="hover:bg-zinc-300 hover:bg-opacity-10 p-2 rounded-md code text-sm tracking-wide">
            Home
          </div>
        </Link>
        <Link href="mailto:hi@iinter.me">
          <div className="hover:bg-zinc-300 hover:bg-opacity-10 p-2 rounded-md code text-sm tracking-wide">
            Contact
          </div>
        </Link>
        <Link href="https://github.com/inttter/iinter.me">
          <div className="hover:bg-zinc-300 hover:bg-opacity-10 p-2 rounded-md code text-sm tracking-wide">
            Source
          </div>
        </Link>
      </div>
      </div>
        <Lanyard showUsername={false} showEmoji={false} showAlbumArt={true} />
        {/* search box */}
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search blog posts"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 text-lg rounded-md placeholder:text-gray-500 bg-neutral-900 text-zinc-300 focus:outline-none focus:caret-gray-400 border border-gray-800 focus:border-red-200 duration-300 w-full"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="feather feather-search h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-9">
          {sortedPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
              <div className="bg-blogcard bg-opacity-10 rounded-md shadow-lg overflow-hidden transition-transform duration-300 md:duration-150 hover:scale-105 active:scale-95 relative">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div>
                    <img src={post.frontmatter.image} alt="Blog Post Preview" className="w-full h-auto md:h-full object-cover" />
                  </div>
                  <div className="p-4 md:p-8">
                    <h2 className="text-xl text-[#E8D4B6] font-semibold mb-2">{post.frontmatter.title}</h2>
                    <p className="text-gray-500 mb-2 md:text-xsm text-sm font-mono code">{post.frontmatter.description}</p>
                    <p className="text-gray-400 mb-2 font-semibold code tracking-wider text-sm">
                      <i className="fa-regular fa-calendar"></i> {post.frontmatter.date} • <i className="fa-regular fa-clock"></i> {post.frontmatter.timeToRead} min read
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/" className="hover:text-zinc-300 duration-300 flex items-center">
          <div className="bottom-5 left-1/2 transform -translate-x-1/2 text-zinc-400 text-sm font-regular fixed bg-gray-800 hover:bg-gray-700 duration-300 px-4 py-2 rounded-md">
            ← Back
          </div>
        </Link>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'src', 'pages', 'blog', 'posts');
  let posts = [];

  try {
    const filenames = fs.readdirSync(postsDirectory);

    posts = filenames
      .filter(filename => filename.endsWith('.md'))
      .map(filename => {
        const filePath = path.join(postsDirectory, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContent);
        return {
          slug: filename.replace(/\.md$/, ''),
          frontmatter: data,
          content,
        };
      });
  } catch (error) {
    console.error('Error reading blog posts:', error);
  }

  return {
    props: {
      posts,
    },
  };
}