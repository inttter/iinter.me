import React, { useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { Check, Copy } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import BackToTopButton from '../../components/BackToTop';
import { toast, Toaster } from 'sonner';
import copy from 'copy-to-clipboard';
import Navbar from '../../components/Navbar';
import consola from 'consola';

export default function Post({ post }) {
  if (!post) return null;

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8 overflow-x-hidden">
      <Head>
        <title>{post.frontmatter.title} | Inter</title>
      </Head>
      <div className="max-w-2xl w-full md:px-1 px-3 md:py-7 py-11 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center md:-mx-2">
            <Navbar />
          </div>
        </div>
        <motion.div
          className="flex flex-col items-start justify-center pt-3 md:pt-5"
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-2xl text-zinc-200 font-semibold tracking-tighter animate-blurred-fade-in duration-300">
            {post.frontmatter.title}
          </div>
          <motion.p
            className="text-neutral-500 max-w-2xl overflow-auto tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span>{post.frontmatter.date}</span>
          </motion.p>
        </motion.div>
        {/* if draft: true in the metadata */}
        {post.frontmatter.draft && (
          <motion.div
            className="text-zinc-100 text-md bg-neutral-700 bg-opacity-40 p-4 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            This post is a <span className="text-yellow-400">work in progress</span>, and may contain incomplete information or mistakes. If you see this message, make sure to <span className="text-emerald-400">complete the post</span> before publishing.
          </motion.div>
        )}
        <div className="leading-7 text-stone-300 animate-blurred-fade-in duration-500">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw, rehypeAutolinkHeadings, rehypeSlug]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <BackToTopButton />
        <div className="flex items-center justify-center">
          <hr className="w-full border-t border-neutral-800" />
        </div>
        <motion.div
          className="text-neutral-600 animate-blurred-fade-in duration-700 text-xs flex justify-end"
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          This post was last updated on <span className="font-semibold tracking-tight ml-1">{post.frontmatter.lastUpdated}</span>.
        </motion.div>
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

const markdownComponents = {

  // Code
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const codeText = children.trim();

    const [copied, setCopied] = useState(false);

    const handleCopyCode = () => {
      copy(codeText);
      setCopied(true);
      toast.success('Code has been copied to your clipboard!', {});
    };

    setTimeout(() => {
      setCopied(false);
    }, 3000);

    return (
      <div className="relative">
        <button
          className={`absolute top-[19px] right-2 text-zinc-300 text-sm font-semibold font-sans hover:bg-neutral-700 duration-300 bg-transparent hover:bg-opacity-80 rounded-md p-1.5 mr-1 ${copied ? 'cursor-default' : ''}`}
          disabled={copied}
          onClick={handleCopyCode}
        >
          {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        </button>
        <Toaster richColors />
        <pre className="rounded-md overflow-auto scrollbar-thin text-sm mt-2">
          <SyntaxHighlighter language={match ? match[1] : null} style={nightOwl} wrapLongLines={true} customStyle={{ background: '#202020', overflowX: 'auto', borderRadius: '0.5rem', fontFamily: 'Jetbrains Mono, monospace' }} codeTagProps={{style: {fontFamily: 'inherit'} }}>
            {children}
          </SyntaxHighlighter>
        </pre>
      </div>
    );
  },

  // Line break
  br() {
    return <br className="my-4" />;
  },

  // Image
  img({ node, alt, src, ...props }) {
    const placeholderSrc = '/not-found.png';
  
    const handleImageError = (event) => {
      event.target.src = placeholderSrc;
      consola.error(new Error(`Image at path ${src} could not be found. A placeholder error image (${placeholderSrc}) will be used instead.`));
    };
  
    return (
      <div className="relative">
          <img className="rounded-lg border border-neutral-800" loading="lazy" alt={alt} src={src} onError={handleImageError} {...props} />
        {alt && <p className="text-sm text-neutral-600 mt-2">{alt}</p>}
      </div>
    );
  },

  // Video
  video({ node, ...props }) {
    return (
      <video src={props.src} className="border border-neutral-800 rounded-lg" {...props}>
        Your browser does not support the video tag.
      </video>
    );
  },

  // Iframe
  iframe({ node, ...props }) {
    return <iframe className="w-full h-96 border border-neutral-800 rounded-lg" {...props}></iframe>;
  },

  // Paragraphs
  p({ node, children, ...props }) {
    return <p className="my-3" {...props}>{children}</p>;
  },

  // Headers
  h1({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h1 className="text-zinc-100 hover:text-zinc-300 border-transparent hover:border-b hover:border-dotted hover:border-neutral-500 inline-block text-3xl duration-300 font-semibold tracking-tighter mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h2 className="text-zinc-100 hover:text-zinc-300 border-transparent hover:border-b hover:border-dotted hover:border-neutral-500 inline-block text-2xl duration-300 font-semibold tracking-tighter mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h3 className="text-zinc-100 hover:text-zinc-300 border-transparent hover:border-b hover:border-dotted hover:border-neutral-500 inline-block text-xl duration-300 font-semibold tracking-tighter mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h3>
    );
  },
  h4({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h4 className="text-zinc-100 hover:text-zinc-300 border-transparent hover:border-b hover:border-dotted hover:border-neutral-500 inline-block text-lg duration-300 font-semibold tracking-tight mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h4>
    );
  },
  h5({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h5 className="text-zinc-100 hover:text-zinc-300 border-transparent hover:border-b hover:border-dotted hover:border-neutral-500 inline-block text-base duration-300 font-semibold tracking-tighter mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h5>
    );
  },
  h6({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h6 className="ttext-zinc-100 hover:text-zinc-300 border-transparent hover:border-b hover:border-dotted hover:border-neutral-500 inline-block text-sm duration-300 font-semibold tracking-tighter mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
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
    return <li className="my-2 marker:text-neutral-500" {...props}>
      <span className="marker">
        {children}
      </span>
    </li>;
  },

  // Blockquotes
  blockquote({ node, children, ...props }) {
    return (
      <blockquote className="text-zinc-100 bg-neutral-900 rounded-lg border-neutral-700 flex items-center italic">
        <div className="px-3">
          {children}
        </div>
      </blockquote>
    );
  },

  // Inline code
  inlineCode({ node, children, ...props }) {
    return <code className="rounded-lg bg-neutral-800 text-white px-2 py-1" {...props}>{children}</code>;
  },

  // Strong and Emphasis
  strong({ node, children, ...props }) {
    return <strong className="font-normal text-zinc-50 brightness-200" {...props}>{children}</strong>;
  },
  em({ node, children, ...props }) {
    return <em className="italic mr-0.5" {...props}>{children}</em>;
  },

  // Links
  a({ node, children, ...props }) {
    return <a className="text-sky-400 hover:border-b border-transparent hover:border-dashed hover:border-sky-400 duration-300" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },

  // Keyboard input
  kbd({ node, children, ...props }) {
    return <kbd className="tags text-zinc-100 bg-neutral-800 px-1.5 py-1 tracking-tighter rounded-md" {...props}>{children}</kbd>;
  },

  // Horizontal Rule
  hr({ node, ...props }) {
    return (
      <div className="my-4 flex items-center justify-center">
        <hr className="w-full border-t border-neutral-800" {...props} />
      </div>
    );
  },

  // Tables
  table({ node, children, ...props }) {
    return <table className="table-auto my-4 w-full rounded-md overflow-hidden" {...props}>{children}</table>;
  },
  thead({ node, children, ...props }) {
    return <thead className="bg-neutral-800 bg-opacity-70 text-zinc-300" {...props}>{children}</thead>;
  },
  tbody({ node, children, ...props }) {
    return <tbody  {...props}>{children}</tbody>;
  },
  tr({ node, children, ...props }) {
    return <tr className="border border-neutral-800" {...props}>{children}</tr>;
  },
  th({ node, children, ...props }) {
    return <th className="px-4 py-2 text-left font-normal text-zinc-100 tags" {...props}>{children}</th>;
  },
  td({ node, children, ...props }) {
    return <td className="px-4 py-1.5" {...props}>{children}</td>;
  },
};