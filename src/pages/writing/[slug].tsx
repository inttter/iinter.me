import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkUnwrapImages from 'remark-unwrap-images';
import remarkGemoji from 'remark-gemoji';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeExternalLinks from 'rehype-external-links';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import Head from 'next/head';
import BackToTop from '@/components/BackToTop';
import Navbar from '@/components/Navbar';
import markdownStyles from '@/components/markdownStyles';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function Post({ post }) {
  const router = useRouter();

  if (!post) return null;

  const handleTagClick = (tag) => {
    router.push({
      pathname: '/writing',
      query: { tag },
    });
  };

  // Calculate average reading time for post 
  // (https://www.craigabbott.co.uk/blog/how-to-calculate-reading-time-like-medium/)
  function readingTime(text) {
    const wordsPerMinute = 200;
    const noOfWords = text.split(/\s/g).length;
    const minutes = noOfWords / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return `${readTime} minute read`;
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8 overflow-x-hidden">
      <Head>
        <title>{`${post.frontmatter.title} | Inter`}</title>
        <meta name="description" content={post.frontmatter.description} />
      </Head>
      <div className="max-w-2xl w-full px-3 md:px-1 py-21 md:py-16">
        <div className="flex items-center gap-x-2 animate-blurred-fade-in duration-300 mb-0.5">
          <div 
            className="text-stone-300/80 text-sm font-medium"
            aria-label="Post Date"
          >
            {post.frontmatter.date}
          </div>
          <div className="h-3 border-l border-neutral-600" />
          <div 
            className="text-stone-300/80 text-sm font-medium flex items-center" 
            aria-label="Time To Read"
          >
            {readingTime(post.content)}
          </div>
        </div>
        <div
          className="text-zinc-100 text-lg md:text-[19px] font-medium animate-blurred-fade-in duration-300 leading-6"
          aria-label="Post Title"
        >
          {post.frontmatter.title}
        </div>
        <motion.div
          className="text-soft text-[15px] md:text-base leading-6 md:leading-[1.65rem] animate-blurred-fade-in duration-300"
          aria-label="Post Content"
        >
          <ReactMarkdown 
            components={markdownStyles} 
            remarkPlugins={[
              remarkGfm, 
              remarkUnwrapImages,
              remarkGemoji
            ]} 
            rehypePlugins={[
              rehypeRaw, 
              rehypeAutolinkHeadings, 
              rehypeSlug,
              [rehypeExternalLinks, { target: '_blank', rel: ['noopener', 'noreferrer'] }],
              [rehypeGithubAlerts,
                {
                  alerts: [
                    // The icons below use the Tabler icon set (https://tabler.io/icons)
                    {
                      keyword: 'NOTE',
                      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="16"  height="16" viewBox="0 0 24 24"  fill="none"  stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-info-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 9h.01" /><path d="M11 12h1v4h1" /></svg>',
                      title: 'Note',
                    },
                    {
                      keyword: 'TIP',
                      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="16"  height="16" viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>',
                      title: 'Tip',
                    },
                    {
                      keyword: 'IMPORTANT',
                      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>',
                      title: 'Important',
                    },
                    {
                      keyword: 'WARNING',
                      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-alert-triangle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9v4" /><path d="M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0z" /><path d="M12 16h.01" /></svg>',
                      title: 'Warning',
                    },
                    {
                      keyword: 'CAUTION',
                      icon: '<svg  xmlns="http://www.w3.org/2000/svg" width="16"  height="16" viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"  stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>',
                      title: 'Caution',
                    },
                  ],
                },
              ],
            ]}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>
        {/* Surround back to top button in a div to prevent position changes */}
        <div>
          <BackToTop />
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-full border-t border-neutral-800" />
        </div>
        <motion.div
          className="animate-blurred-fade-in duration-300 text-xs flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4"
          aria-label="Post Footer"
        >
          {post.frontmatter.tags && (
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0" aria-label="Post Tags">
              {post.frontmatter.tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs text-stone-400 hover:text-zinc-100 font-mono cursor-pointer duration-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex items-center text-xs text-stone-400 mt-2 sm:mt-0">
            Last updated on
            <span className="font-medium ml-1">
              {post.frontmatter.lastUpdated}
            </span>
          </div>
        </motion.div>
        <Navbar />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

  // Remove .md from file name so that it doesn't show in slug
  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);
  return {
    props: {
      post: {
        slug,
        frontmatter: data,
        content,
      },
    },
  };
}