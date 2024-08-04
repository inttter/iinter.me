import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { motion } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import consola from 'consola';
import { useRouter } from 'next/router'; 

export default function Writing({ posts }) {
  posts.reverse();

  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTag, setSelectedTag] = useState(null);
  const postsPerPage = 7;
  const router = useRouter();

  useEffect(() => {
    const { tag } = router.query;
    setSelectedTag(tag || null);
  }, [router.query]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleMouseEnter = (slug) => {
    setHoveredPost(slug);
  };

  const handleMouseLeave = () => {
    setHoveredPost(null);
  };

  const handleTagClick = (tag) => {
    router.push({ pathname: '/writing', query: { tag } });
    setCurrentPage(1);
  };

  const handleClearTags = () => {
    router.push({ pathname: '/writing', query: {} });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Filter posts based on search query/selected tag
  const filteredPosts = posts.filter((post) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = post.frontmatter.title.toLowerCase().includes(query);
    const tagsMatch = post.frontmatter.tags?.some(tag => tag.toLowerCase().includes(query));
  
    return (
      (titleMatch || tagsMatch) &&
      (selectedTag ? post.frontmatter.tags?.includes(selectedTag) : true)
    );
  });

  filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>Writing | Inter</title>
      </Head>
      <div className="max-w-2xl w-full px-4 md:py-24 py-20 space-y-6 flex-col">
        <div className="flex items-center justify-between">
          <div className="max-w-3xl w-full">
            <div className="mb-4 relative mt-4 animate-blurred-fade-in duration-500">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for posts"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="px-10 text-lg bg-main placeholder:text-neutral-600 rounded-md focus:caret-soft text-soft focus:text-zinc-100 animate-blurred-fade-in duration-300 border-b border-neutral-800 focus:border-neutral-600 p-1.5 outline-none w-full group"
                />
                <div className="absolute inset-y-0 pl-3.5 flex items-center pointer-events-none group-focus:rotate-12">
                  <Search className="text-stone-400" size={20} />
                </div>
              </div>
            </div>
            <div className="flex justify-start mb-2">
              {selectedTag && (
                <button
                  onClick={handleClearTags}
                  className="flex items-center text-sm px-2 py-1 text-soft bg-[#141414] hover:bg-[#202020] border border-neutral-800 hover:border-neutral-700 rounded-md duration-300 ml-2"
                >
                  <X size={15} className="mr-1 text-red-400" />
                  Clear Tag
                </button>
              )}
            </div>
            {filteredPosts.length === 0 && (
              <motion.p
                className="text-soft bg-red-700 bg-opacity-50 px-4 py-2 rounded-md flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <X size={20} className="mr-1 text-red-400" /> 
                No posts found with that name.
              </motion.p>
            )}
            {currentPosts.map((post) => (
              <div
                key={post.slug}
                className="relative animate-blurred-fade-in duration-300 group mb-2"
                style={{ filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(70%)' : 'none' }}
                onMouseEnter={() => handleMouseEnter(post.slug)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-1 border border-transparent hover:border-neutral-800 hover:bg-neutral-800 hover:bg-opacity-30 rounded-md duration-300">
                  <Link href={`/writing/${post.slug}`} passHref>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-[7px] duration-300 rounded-md">
                      <div className="text-soft group-hover:text-zinc-100 duration-300 mb-1 md:mb-0 md:mr-2 flex items-center">
                        <span>{post.frontmatter.title}</span>
                        <ArrowUpRight size={15} className="hidden md:block text-neutral-600 ml-0.5 group-hover:translate-x-0.5 group-hover:text-soft duration-200" />
                      </div>
                      <p className={`flex items-center text-sm text-stone-400 duration-300 ${hoveredPost === post.slug ? 'text-stone-400' : 'md:text-stone-600'}`}>
                        {post.frontmatter.date}
                      </p>
                    </div>
                    <p className={`text-sm ml-1.5 -mt-0.5 mb-1 max-w-xl duration-300 ${hoveredPost === post.slug ? 'text-stone-400' : 'text-stone-500'}`}>
                      {post.frontmatter.description}
                    </p>
                  </Link>
                  {post.frontmatter.tags && (
                    <div className="flex flex-wrap mt-1.5 mb-1.5 ml-1.5 gap-1">
                      {post.frontmatter.tags.map((tag, index) => (
                        <span
                          key={index}
                          onClick={() => handleTagClick(tag)}
                          className={`text-xs text-soft bg-[#141414] hover:bg-[#202020] border border-neutral-800 hover:border-neutral-700 px-2 py-1 rounded-md cursor-pointer code duration-300 ${selectedTag === tag ? 'bg-neutral-800 border-neutral-500  border-opacity-40' : ''}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <Navbar />
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={filteredPosts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="inline-flex absolute text-xs mt-48 ml-1 p-1 duration-300"
        >
          <span className="text-neutral-600 mr-1">
            © 2024 / MIT License /
          </span>
          <Link href="https://github.com/inttter/iinter.me/tree/master/content" target="_blank" rel="noopener noreferrer" className="flex items-center group text-neutral-600 hover:text-neutral-500 duration-300">
            See posts on GitHub <ArrowUpRight size={15} className="text-neutral-600 ml-0.5 group-hover:translate-x-0.5 group-hover:text-stone-400 duration-200" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  if (totalPosts === 0) {
    // If there are no posts, it won't render anything
    return null;
  }

  return (
    <nav className="relative flex flex-col top-2 left-2 animate-blurred-fade-in duration-300">
      <ul className="flex space-x-2">
        <div className="flex items-center text-stone-600 text-sm mr-1">
          Page
        </div>
        {pageNumbers.map(number => (
          <li key={number}>
            <div
              onClick={() => paginate(number)}
              className={`${
                currentPage === number
                  ? 'border border-neutral-700 bg-neutral-600 bg-opacity-60'
                  : 'bg-neutral-800 bg-opacity-80'
              } border border-transparent hover:border-neutral-600 hover:bg-opacity-50 duration-300 text-soft code px-2 py-0.5 rounded-md cursor-pointer`}
            >
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
        const { data } = matter(fileContent);
        return {
          slug: filename.replace(/\.md$/, ''),
          frontmatter: data,
        };
      });
  } catch (error) {
    consola.error(new Error('Error reading posts:', error));
  }

  return {
    props: {
      posts,
      isWritingIndexPage: true,
    },
  };
}