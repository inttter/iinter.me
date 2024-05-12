import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { Search, CircleX, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function Writing({ posts }) {
  posts.reverse();

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

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

  // pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 md:py-24 py-20 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Head>
            <title>Writing | Inter</title>
          </Head>
          <div className="max-w-3xl w-full">
            <div className="mb-4 relative mt-4 animate-blurred-fade-in duration-500">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-10 text-lg bg-main placeholder:text-neutral-600 rounded-md focus:caret-zinc-300 focus:text-zinc-300 duration-300 border border-neutral-800 p-1.5 w-full focus:outline-none focus-visible:outline-neutral-600"
                />
                <div className="absolute inset-y-0 pl-3.5 flex items-center pointer-events-none group-focus:rotate-12">
                  <Search className="text-neutral-600" size={20} />
                </div>
              </div>
            </div>
            {filteredPosts.length === 0 && (
              <motion.p className="text-zinc-200 text-md bg-red-500 bg-opacity-40 px-4 py-2 ml-2 rounded-md flex items-center">
                <CircleX size={20} className="mr-1 text-red-400" /> Sorry, a post couldn't be found with that name.
              </motion.p>
            )}
            {currentPosts.map((post) => (
              <div
                key={post.slug}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.0 }}
                className="relative duration-500 group animate-blurred-fade-in mb-2"
                style={{ filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(70%)' : 'none' }}
                onMouseEnter={() => handleMouseEnter(post.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <Link href={`/writing/${post.slug}`} passHref>
                  <div className="p-0.5 hover:bg-neutral-800 hover:bg-opacity-30 rounded-md duration-300">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-[7px] duration-300 rounded-md">
                      <div className="text-zinc-100 group-hover:text-zinc-100 duration-300 mb-1 md:mb-0 md:mr-2 flex items-center">
                        <span>{post.frontmatter.title}</span> <ArrowUpRight size={15} className="text-neutral-600 ml-0.5 group-hover:translate-x-0.5 duration-200" />
                      </div>
                      <p className={`text-sm flex items-center duration-300 ${hoveredPost === post.slug ? 'text-neutral-400' : 'text-neutral-600'}`}>{post.frontmatter.date}</p>
                    </div>
                    <p className={`text-neutral-600 text-sm ml-1.5 -mt-0.5 mb-1 max-w-xl duration-300 ${hoveredPost === post.slug ? 'text-neutral-400' : 'text-neutral-600'}`}>
                      {post.frontmatter.description}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <Navbar />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={sortedPosts.length}
          paginate={paginate}
        />
      </div>
      <div>
        <div className="text-neutral-700 text-xs code md:p-0 p-5 md:max-w-xl animate-blurred-fade-in duration-500">
          Posts themselves are licensed under the MIT License, however content inside of them may be licensed under different licenses, or have other legal properties.
        </div>
        <div className="text-neutral-700 text-xs code md:mt-2 mb-5 group md:px-0 px-5 animate-blurred-fade-in duration-500">
          <FaGithub className="inline mr-1 group-hover:text-neutral-600 duration-300" />
          <Link href="https://github.com/inttter/iinter.me/tree/master/content" target="_blank" rel="noopener noreferrer" className="border-b border-neutral-800 hover:border-neutral-600 hover:text-neutral-600 duration-300">
            See posts on GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (totalPosts === 0) {
    return null; // don't render anything if there are no posts
  }

  return (
    <nav className="relative flex flex-col top-5 left-2 mb-5">
      <ul className="flex space-x-2">
        <div className="flex items-center text-neutral-600 code text-sm mr-1">
          Page
        </div>
        {pageNumbers.map(number => (
          <li key={number}>
            <div onClick={() => paginate(number)} className="bg-neutral-900 hover:bg-neutral-700 hover:bg-opacity-70 duration-300 text-zinc-300 page-link code px-2 py-0.5 rounded-md cursor-pointer">
              {number}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

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
    consola.error(new Error('Error reading posts:', error));
  }

  return {
    props: {
      posts,
    },
  };
}