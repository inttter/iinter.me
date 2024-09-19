import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { rehypeGithubAlerts } from 'rehype-github-alerts';
import remarkUnwrapImages from 'remark-unwrap-images'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import BackToTop from '../../components/BackToTop';
import Navbar from '../../components/Navbar';
import markdownStyles from '../../components/markdownStyles';
import { CalendarDays } from 'lucide-react';

export default function Post({ post }) {
  const router = useRouter();

  if (!post) return null;

  const handleTagClick = (tag) => {
    router.push({
      pathname: '/writing',
      query: { tag },
    });
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8 overflow-x-hidden">
      <Head>
        <title>{`${post.frontmatter.title} | Inter`}</title>
        <meta name="description" content={post.frontmatter.description} />
      </Head>
      <div className="max-w-2xl w-full px-4 md:py-16 py-20 space-y-6">
        <div className="flex flex-col items-start justify-center pt-3 md:pt-5 p-1">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl text-zinc-200 font-semibold tracking-tight"
            aria-label="Post Title"
          >
            {post.frontmatter.title}
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-stone-400 max-w-2xl mt-0.5 overflow-auto"
            aria-label="Post Date"
          >
            <span>{post.frontmatter.date}</span>
          </motion.p>
          {post.frontmatter.tags && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap mt-2 space-x-2"
              aria-label="Post Tags"
            >
              {post.frontmatter.tags.map((tag, index) => (
                <span
                  key={index}
                  onClick={() => handleTagClick(tag)}
                  className="text-xs text-soft bg-[#141414] hover:bg-[#202020] border border-neutral-800 hover:border-neutral-700 px-2 py-1 rounded-md code cursor-pointer duration-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.4 }} 
          className="leading-7 text-soft text-opacity-95 px-1 text-[15px] md:text-[16px]"
          aria-label="Post Content"
        >
          <ReactMarkdown 
            components={markdownStyles} 
            remarkPlugins={[gfm, remarkUnwrapImages]} 
            rehypePlugins={[rehypeRaw, rehypeAutolinkHeadings, rehypeSlug, rehypeGithubAlerts]}
          >
            {post.content}
          </ReactMarkdown>
        </motion.div>
        <BackToTop />
        <div className="flex items-center justify-center">
          <hr className="w-full border-t border-neutral-800" />
        </div>
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-stone-500 animate-blurred-fade-in duration-700 text-xs flex justify-end items-center"
          aria-label="Date Post Was Last Updated"
        >
          <CalendarDays size={12} className="mr-1" /> Last updated on
          <span className="font-semibold tracking-tight ml-0.5">
            {post.frontmatter.lastUpdated}
          </span>
        </motion.div>
        <Navbar />
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const filenames = fs.readdirSync(postsDirectory);

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