import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { Search, CircleX } from 'lucide-react';

export default function Writing({ posts }) {
  posts.reverse();

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleMouseEnter = (slug) => {
    setHoveredPost(slug);
  };

  const handleMouseLeave = () => {
    setHoveredPost(null);
  };

  // sort by search
  const filteredPosts = posts.filter((post) =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const sortedPosts = filteredPosts.sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-0 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Head>
            <title>writing | iinter.me</title>
          </Head>
          <div className="max-w-3xl w-full px-4 py-8">
            <div className="mb-4 relative mt-4 animate-blurred-fade-in duration-300">
              <div className="relative px-2">
                <input
                  type="text"
                  placeholder="Search posts"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-10 text-lg bg-main placeholder:text-neutral-600 rounded-md focus:caret-zinc-300 focus:text-zinc-300 duration-300 border border-neutral-800 p-1.5 w-full outline-none focus:shadow-2xl focus:shadow-neutral-800"
                />
                <div className="absolute inset-y-0 pl-3.5 flex items-center pointer-events-none">
                  <Search className="text-neutral-600" size={20} />
                </div>
              </div>
            </div>
            {filteredPosts.length === 0 && (
              <motion.p className="text-zinc-200 text-md bg-red-500 bg-opacity-40 px-4 py-2 ml-2 rounded-md flex items-center">
                <CircleX size={20} className="mr-1 text-red-400" /> Sorry, a post couldn't be found with that name.
              </motion.p>
            )}
            {sortedPosts.map((post) => (
              <div
                key={post.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className="relative duration-500 group animate-blurred-fade-in"
                style={{ filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(70%)' : 'none' }}
                onMouseEnter={() => handleMouseEnter(post.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={`/writing/${post.slug}`} passHref>
                  <div className="p-0.5 md:px-1 px-0">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-neutral-800 hover:bg-opacity-30 p-[7px] duration-300 rounded-md">
                      <div className="text-zinc-300 group-hover:text-zinc-100 duration-300 border-b-2 border-dotted border-neutral-700 group-hover:border-neutral-500 mb-1 md:mb-0 md:mr-2">
                        {post.frontmatter.title}
                      </div>
                      <p className={`text-sm ${hoveredPost === post.slug ? 'text-neutral-400 duration-300' : 'text-neutral-600'}`}>{post.frontmatter.date}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
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
    console.error('Error reading posts:', error);
  }

  return {
    props: {
      posts,
    },
  };
}