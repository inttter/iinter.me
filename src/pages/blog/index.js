import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono';

export default function Blog({ posts }) {
  // Reverse the order of posts to show the latest first
  posts.reverse();

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filtered posts based on search query
  const filteredPosts = posts.filter(post =>
    post.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>inter | blog</title>
        <meta property="og:description" content="inter's (mediocre) blog." />
        <meta property="og:url" content="https://iinter.me/blog" />
      </Head>
      <div className="max-w-3xl w-full px-4 py-8 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-zinc-300 hover:text-indigo-500 duration-300 font-mono font-semibold tracking-tight border-zinc-300 pb-2 tooltip tooltip-top bg-transparent" data-tip="The latest things I've written." data-theme="lofi"><i className="fa-solid fa-newspaper"></i> Latest Posts</h1>
          <div className="fixed bottom-5 right-5 hidden md:flex">
            <img src="https://cdn.discordapp.com/attachments/892836872118763543/1216385117065580695/P_clouds_nf2u.gif?ex=660031eb&is=65edbceb&hm=493f9284a65e41080d6e4fe5d85bbe8819a8807c189be9e7915703453c4a8b96&" alt="Clouds" className="w-4 h-4 mr-2" />
            <div className="text-zinc-300 font-semibold text-xs tracking-wide">by Inter</div>
          </div>
        </div>
        {/* search box */}
        <div className="mb-4">
          <input
          type="text"
          placeholder="Search blog posts..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 rounded-md bg-gray-800 text-zinc-300 focus:outline-none focus:ring duration-300 focus:border-indigo-500 caret-indigo-500"
        />
        </div>
        {/* Display filtered posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="bg-blogcard rounded-md shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:border-2 hover:border-indigo-500 active:scale-95 block">
              <img src={post.frontmatter.image} alt="Blog Post Preview" className="w-full h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl text-zinc-300 font-semibold mb-2">{post.frontmatter.title}</h2>
                <p className="text-gray-500 mb-2 md:text-xsm text-sm">{post.frontmatter.description}</p>
                <p className="text-zinc-300 mb-2 font-mono text-sm">
                  <i className="fa-regular fa-calendar"></i> {post.frontmatter.date} • <i className="fa-regular fa-clock"></i> {post.frontmatter.timeToRead} min read
                </p>
              </div>
            </a>
          ))}
        </div>
        <a href="/" className="hover:text-zinc-300 duration-300 flex items-center">
          <div className="bottom-5 left-1/2 transform -translate-x-1/2 text-zinc-400 text-sm font-regular fixed bg-gray-800 hover:bg-gray-700 duration-300 px-4 py-2 rounded-md">
            ← Back
          </div>
        </a>
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
      .filter(filename => filename.endsWith('.md')) // Filter out non-Markdown files
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