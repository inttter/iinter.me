import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { useRouter } from 'next/router';
import { FaGithub } from 'react-icons/fa6';
import { parseISO, formatDistanceToNow } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import BackToTopButton from '../../components/BackToTop';

export default function BlogPost({ post }) {
  const router = useRouter();
  const [latestCommit, setLatestCommit] = useState(null);

  if (!post) return null;

  const parseAndFormatDate = () => {
    try {
      const distance = formatDistanceToNow(new Date(post.frontmatter.date), { addSuffix: true });
      return distance;
    } catch (error) {
      console.error('Error parsing date:', error);
      return '?';
    }
  };

  const githubURL = `https://github.com/inttter/iinter.me/blob/master/content/${post.slug}.md?plain=1`;

  return (
    <motion.div
      className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>{post.frontmatter.title}</title>
        <meta property="og:image" content={post.frontmatter.image} />
      </Head>
      <div className="max-w-2xl w-full md:px-1 px-2 py-8 space-y-6">
        <div className="relative">
          <div className="flex items-center absolute md:-top-8 -top-5">
            <motion.button
              className="text-zinc-400 bg-transparent px-1 rounded-md shadow-md transition duration-300 transform hover:-translate-x-0.5 active:-translate-x-1 tooltip tooltip-bottom"
              onClick={() => window.history.back()}
              data-tip="Back"
              data-theme="lofi"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {'←'}
            </motion.button>
            <span className="ml-2 text-neutral-600 flex items-center">
              {post.frontmatter.date}
              <Link href={githubURL} className="ml-2 text-neutral-700 hover:text-zinc-300 duration-300 tooltip tooltip-bottom bg-transparent" target="_blank" rel="noopener noreferrer" data-theme="lofi" data-tip="View raw Markdown on GitHub">
                <FaGithub size={20} />
              </Link>
            </span>
          </div> 
          <span className="ml-2 text-gray-500 flex items-center space-x-4 absolute right-1 -top-5 md:-top-7 w-full">
            <div className="absolute top-0 right-0 flex space-x-4">
              <Link href="/" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
                home ↗
              </Link>
              <Link href="/projects" className="text-neutral-500 hover:border-b-2 hover:border-neutral-500 selection:bg-[#E8D4B6] selection:text-black">
                projects ↗
              </Link>
            </div>
          </span>
        </div>
        <motion.div
          className="flex flex-col items-start justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-2xl text-zinc-200 font-semibold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {post.frontmatter.title}
          </motion.div>
          <motion.p
            className="text-zinc-500 text-md max-w-2xl overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span>{post.frontmatter.description}</span>
          </motion.p>
        </motion.div>
        {post.frontmatter.draft && (
          <div className="text-zinc-300 text-md bg-sky-500 bg-opacity-40 py-2 pl-4 rounded-md">
            🚧 This post is a draft.
            If you see this,
            <strong className="underline underline-offset-2 mr-1 ml-1">
              don't
            </strong> 
            share the post yet!
          </div>
        )}
        <motion.div
          className="text-neutral-300 leading-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <ReactMarkdown components={markdownComponents} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw, rehypeAutolinkHeadings, rehypeSlug]}>
            {post.content}
          </ReactMarkdown>
        </motion.div>
        <BackToTopButton />
        <motion.div
          className="text-gray-500 duration-300 text-sm mt-2 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          — Last Updated: {post.frontmatter.lastUpdated}
        </motion.div>
      </div>
    </motion.div>
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

const markdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    
    return (
      <pre className="rounded-lg overflow-auto scrollbar-thin text-sm code -mt-2">
        <SyntaxHighlighter language={match ? match[1] : null} style={nightOwl} customStyle={{ background: '#101111', overflowX: 'auto' }}>
          {children}
        </SyntaxHighlighter>
      </pre>
    );
  },

  // Line break
  br() {
    return <br className="my-4" />;
  },

  img({ node, alt, src, ...props }) {
    const placeholderSrc = '/not-found.png';
  
    const handleImageError = (event) => {
      event.target.src = placeholderSrc;
    };
  
    return (
      <div className="relative">
        <img className="rounded-lg" loading="lazy" alt={alt} src={src} onError={handleImageError} {...props} />
        {alt && <p className="text-sm text-gray-500 mt-2">{alt}</p>}
      </div>
    );
  },

  // Video
  video({ node, ...props }) {
    return (
      <video src={props.src} className="shadow-2xl" {...props}>
        Your browser does not support the video tag.
      </video>
    );
  },

  // Paragraphs
  p({ node, children, ...props }) {
    return <p className="my-4" {...props}>{children}</p>;
  },

  // Headers
  h1({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h1 className="text-3xl font-semibold my-6 relative" {...props}>
        <a href={`#${headerId}`} className="no-underline">{children}<span className="text-zinc-700 hover:text-zinc-500 duration-300"> #</span></a>
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h2 className="text-zinc-100 text-2xl font-semibold my-5 relative" {...props}>
        <a href={`#${headerId}`} className="no-underline">{children}<span className="text-zinc-700 hover:text-zinc-500 duration-300"> #</span></a>
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h3 className="text-zinc-100 text-xl font-semibold my-4 relative" {...props}>
        <a href={`#${headerId}`} className="no-underline">{children}<span className="text-zinc-700 hover:text-zinc-500 duration-300"> #</span></a>
      </h3>
    );
  },
  h4({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h4 className="text-zinc-100 text-lg font-semibold my-3 relative" {...props}>
        <a href={`#${headerId}`} className="no-underline">{children}<span className="text-zinc-700 hover:text-zinc-500 duration-300"> #</span></a>
      </h4>
    );
  },
  h5({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h5 className="text-zinc-100 text-base font-semibold my-2 relative" {...props}>
        <a href={`#${headerId}`} className="no-underline">{children}<span className="text-zinc-700 hover:text-zinc-500 duration-300"> #</span></a>
      </h5>
    );
  },
  h6({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h6 className="text-zinc-100 text-sm font-semibold my-1 relative" {...props}>
        <a href={`#${headerId}`} className="no-underline">{children}<span className="text-zinc-700 hover:text-zinc-500 duration-300"> #</span></a>
      </h6>
    );
  },

  // Lists
  ul({ node, children, ...props }) {
    return <ul className="list-disc list-inside my-4" {...props}>{children}</ul>;
  },
  ol({ node, children, ...props }) {
    return <ol className="list-decimal list-inside my-4" {...props}>{children}</ol>;
  },
  li({ node, children, ...props }) {
    return <li className="my-2" {...props}>{children}</li>;
  },

  // Blockquotes
  blockquote({ node, children, ...props }) {
    return (
      <blockquote className="border-l-4 border-neutral-700 pl-4 my-4">
        <div className="ml-2">{children}</div>
      </blockquote>
    );
  },

  // Inline code
  inlineCode({ node, children, ...props }) {
    return <code className="rounded-lg bg-gray-800 text-white px-2 py-1" {...props}>{children}</code>;
  },

  // Strong and Emphasis
  strong({ node, children, ...props }) {
    return <strong className="font-bold text-bold" {...props}>{children}</strong>;
  },
  em({ node, children, ...props }) {
    return <em className="italic mr-0.5" {...props}>{children}</em>;
  },

  // Links
  a({ node, children, ...props }) {
    return <a className="border-b-2 border-gray-500 hover:border-gray-400 hover:text-zinc-200 duration-300 animate-in fade-in" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },

  // Keyboard input
  kbd({ node, children, ...props }) {
    return <kbd className="inline-block bg-neutral-800 text-zinc-300 px-1 py-0.5 rounded-md m-0.5" {...props}>{children}</kbd>;
  },

  // Horizontal Rule
  hr({ node, ...props }) {
    return <hr className="my-4 border-t-2 border-neutral-500" {...props} />;
  },

  // Tables
  table({ node, children, ...props }) {
    return <table className="table-auto my-4 w-full" {...props}>{children}</table>;
  },
  thead({ node, children, ...props }) {
    return <thead className="bg-neutral-800 text-white" {...props}>{children}</thead>;
  },
  tbody({ node, children, ...props }) {
    return <tbody className="bg-neutral-950" {...props}>{children}</tbody>;
  },
  tr({ node, children, ...props }) {
    return <tr className="border-b border-neutral-700" {...props}>{children}</tr>;
  },
  th({ node, children, ...props }) {
    return <th className="px-4 py-2 text-left" {...props}>{children}</th>;
  },
  td({ node, children, ...props }) {
    return <td className="px-4 py-2" {...props}>{children}</td>;
  },
};