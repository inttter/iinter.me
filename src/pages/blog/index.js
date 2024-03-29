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
import Lanyard from '../../components/Lanyard';
import { motion } from 'framer-motion'
import { FaSearch } from 'react-icons/fa';

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
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scrollbar-thin scrollbar-thumb-slate-50 scroll-smooth p-4 md:p-8">
      <Head>
        <title>inter | blog</title>
      </Head>
      <div className="max-w-3xl w-full px-4 py-8">
        <div className="flex items-center justify-between py-4 text-lg w-full">
          <div className="flex items-center text-zinc-200 font-semibold text-3xl px-2">
            Blog
          </div>
        </div>
        <div className="flex items-center ml-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2 }}
          >
            <Lanyard showUsername={false} showEmoji={false} showAlbumArt={true} />
          </motion.div>
        </div>
        {/* search box */}
        <div className="mb-4 relative mt-4">
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.input
              type="text"
              placeholder="Search blog posts"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-10 py-2 text-lg rounded-md bg-transparent w-full focus:border-none focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </motion.div>
        </div>
        {filteredPosts.length === 0 && (
          <p className="text-gray-400 text-lg code">No posts found.</p>
        )}
        {sortedPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} passHref>
            <div className="rounded-md shadow-lg overflow-hidden relative">
              <div className="p-4 md:py-7">
                <div className="flex flex-col justify-between items-start">
                  <h2 className="text-xl text-[#E8D4B6] hover:text-zinc-400 duration-300 tracking-tight font-semibold">{post.frontmatter.title} <span className="text-zinc-700">➜</span></h2>
                  <p className="text-gray-400 text-sm">{post.frontmatter.date}</p>
                </div>
                <p className="text-zinc-300 mt-2 md:mt-2">{post.frontmatter.description}</p>
              </div>
            </div>
          </Link>
        ))}
        <button onClick={() => window.history.back()} className="hover:text-zinc-300 duration-300 flex items-center">
          <div className="bottom-5 left-1/2 transform -translate-x-1/2 text-sm font-regular fixed bg-neutral-800 hover:bg-neutral-950 text-zinc-300 focus:outline-none border border-gray-800 focus:border-red-200 duration-300 px-4 py-2 rounded-md">
            ← Back
          </div>
        </button>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const postsDirectory = path.join(process.cwd(), 'content');
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