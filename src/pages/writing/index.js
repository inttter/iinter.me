import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import Link from 'next/link';
import consola from 'consola';
import Navbar from '@/components/Navbar';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/router'; 

export default function Writing({ posts }) {
  posts.reverse();

  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredPost, setHoveredPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(parseInt(router.query.page) || 1);
  const [selectedTag, setSelectedTag] = useState(null);
  const postsPerPage = 5;

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

  const paginate = (pageNumber) => {
    const updatedQuery = { ...router.query, page: pageNumber };
  
    router.push({ 
      pathname: '/writing', 
      query: updatedQuery 
    });
  };

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

  useEffect(() => {
    const page = parseInt(router.query.page) || 1;
    setCurrentPage(page);
  }, [router.query.page]);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>Writing | Inter</title>
      </Head>
      <div className="max-w-2xl w-full px-3 md:px-0 py-24 md:py-16 space-y-4">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="mb-4 mt-0 md:mt-4 relative animate-blurred-fade-in duration-300">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="text-lg placeholder:text-stone-500 text-soft focus:text-zinc-100 bg-transparent border-b border-neutral-700/60 focus:border-stone-400/70 py-1 outline-none rounded-none w-full group duration-300"
                  aria-label="Post Search"
                />
              </div>
            </div>
            <div className="flex justify-start">
              {selectedTag && (
                <button
                  onClick={handleClearTags}
                  className="flex items-center text-sm text-zinc-300 hover:text-zinc-300/80 mb-4 duration-300"
                  aria-label="Clear Selected Tags Button"
                >
                  <ArrowLeft size={15} className="mr-1" />
                  Show all posts
                </button>
              )}
            </div>
            {filteredPosts.length === 0 && (
              <div
                className="text-soft pb-2 flex items-center justify-start"
                aria-label="No Posts Found Message"
              >
                No results found
              </div>
            )}
            {currentPosts.map((post) => (
              <div
                key={post.slug}
                className="relative animate-blurred-fade-in duration-300 mb-2"
                aria-label="Post Information"
              >
                <div className="pb-1.5 border-b border-neutral-800">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-1.5 duration-300 rounded-md">
                    <div className="mb-1 md:mb-0 md:mr-2 flex items-center" aria-label="Post Title">
                      <Link href={`/writing/${post.slug}`} passHref>
                        <span 
                          className="text-zinc-300 hover:text-zinc-100 font-medium group duration-300"
                          onMouseEnter={() => handleMouseEnter(post.slug)}
                          onMouseLeave={handleMouseLeave}
                          style={{
                            filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(70%)' : 'none',
                          }}
                        >
                          {post.frontmatter.title}
                        </span>
                      </Link>
                    </div>
                    <div
                      className="text-sm text-stone-400 flex items-center duration-300"
                      style={{
                        filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(70%)' : 'none',
                      }}
                      aria-label="Post Date"
                    >
                      {post.frontmatter.date}
                    </div>
                  </div>
                  <div
                    className="text-sm max-w-xl mt-0 md:-mt-1 duration-300 text-stone-400 text-opacity-90"
                    style={{
                      filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(70%)' : 'none',
                    }}
                    aria-label="Post Description"
                  >
                    {post.frontmatter.description}
                  </div>
                  {post.frontmatter.tags && (
                    <div className="flex flex-wrap mt-2.5 mb-1.5 gap-x-3">
                      {post.frontmatter.tags.map((tag, index) => (
                        <span
                          key={index}
                          onClick={() => handleTagClick(tag)}
                          className="text-xs text-stone-400 hover:text-zinc-300 font-mono tracking-normal cursor-pointer duration-300"
                          style={{
                            filter: hoveredPost && hoveredPost !== post.slug ? 'brightness(50%)' : 'none',
                          }}
                        >
                          #{tag}
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
    <nav className="relative flex flex-col animate-blurred-fade-in duration-300">
      <ul className="flex space-x-2">
        <div className="flex items-center text-stone-400 text-sm mr-1">
          Page
        </div>
        {pageNumbers.map(number => (
          <li key={number}>
            <div
              onClick={() => paginate(number)}
              aria-label="Page Number"
              className={`${
                currentPage === number
                  ? 'border border-neutral-700 bg-neutral-600/60'
                  : 'bg-neutral-800'
              } border border-neutral-800 hover:bg-neutral-700/60 duration-300 text-soft code px-2 py-0.5 rounded-md cursor-pointer`}
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