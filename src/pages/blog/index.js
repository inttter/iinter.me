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
import Navbar from '../../components/Navbar';
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
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8 selection:bg-[#E8D4B6] selection:text-black">
      <div className="max-w-2xl w-full px-0 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Head>
            <title>inter | blog</title>
          </Head>
          <div className="max-w-3xl w-full px-4 py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between py-4 text-lg w-full"
            >
              <div className="flex items-center text-zinc-100 font-semibold text-3xl px-1">
                Blog
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 relative mt-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-10 text-lg rounded-md bg-transparent w-full focus:border-none focus:outline-none"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
              </div>
            </motion.div>
            {filteredPosts.length === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-zinc-300 text-md bg-red-500 bg-opacity-40 py-2 pl-4 rounded-md my-8"
              >
                Couldn't find a post with that name. :(
              </motion.p>
            )}
            {sortedPosts.map((post) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <div className="p-0.5 md:px-1 px-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-neutral-700 hover:bg-opacity-30 p-[7px] duration-300 rounded-md">
                    <Link href={`/blog/${post.slug}`} passHref>
                      <div className="text-zinc-300 border-b-2 border-gray-500 hover:border-gray-400duration-300 animate-in fade-in mb-1 md:mb-0 md:mr-2">
                        {post.frontmatter.title}
                      </div>
                    </Link>
                    <p className="text-gray-400 text-sm">{post.frontmatter.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              onClick={() => window.history.back()}
              className="hover:text-zinc-300 duration-300 flex items-center"
            >
            </motion.button>
            <div className="py-4">
              <Lanyard showUsername={false} showEmoji={false} showAlbumArt={true} />
            </div>
            <Navbar />
          </div>
        </div>
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