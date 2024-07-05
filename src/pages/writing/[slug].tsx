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
import { Check, Copy, Link as LinkIcon } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import BackToTopButton from '../../components/BackToTop';
import { toast } from 'sonner';
import copy from 'copy-to-clipboard';
import Navbar from '../../components/Navbar';
import consola from 'consola';

export default function Post({ post }) {
  if (!post) return null;

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8 overflow-x-hidden">
      <Head>
        <title>{`${post.frontmatter.title} | Inter`}</title>
      </Head>
      <div className="max-w-2xl w-full md:px-1 px-3 md:py-7 py-11 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center -mx-2 z-50">
            <Navbar />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center pt-3 md:pt-5">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-3xl text-zinc-200 font-semibold tracking-tighter"
          >
            {post.frontmatter.title}
          </motion.div>
          <motion.p
            className="text-neutral-500 max-w-2xl mt-1 overflow-auto tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span>{post.frontmatter.date}</span>
          </motion.p>
        </div>
        {/* if wip: true in the metadata */}
        {/* tldr; posts can get published early now but this note will show that its a wip post */}
        {post.frontmatter.wip && (
          <motion.div
            className="flex items-center justify-center text-zinc-100 text-md bg-amber-500 bg-opacity-40 p-4 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="mr-2 text-3xl -rotate-3 bg-transparent tooltip tooltip-right" data-tip="You can keep reading, but this isn't final!" data-theme="lofi">🏗️</span>
            <span>This post is under construction and still being made. Note that some things may be unfinished or could be subject to change!</span>
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 0.8 }} 
          className="leading-7 text-stone-300 text-opacity-95"
        >
          <ReactMarkdown components={markdownComponents} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw, rehypeAutolinkHeadings, rehypeSlug]}>
            {post.content}
          </ReactMarkdown>
        </motion.div>
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
      toast.success('Code copied to your clipboard!');
    };

    setTimeout(() => {
      setCopied(false);
    }, 3000);

    return (
      <div className="relative">
        <button
          className={`absolute top-[19px] right-2 text-zinc-300 text-sm font-semibold font-sans duration-300 bg-neutral-900 hover:border-neutral-700 border-2 border-neutral-800 rounded-md p-1.5 mr-1 ${copied ? 'cursor-default' : ''}`}
          disabled={copied}
          onClick={handleCopyCode}
        >
          {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
        </button>
        <pre className="rounded-md overflow-auto scrollbar-thin text-sm mt-2">
          <SyntaxHighlighter language={match ? match[1] : null} style={nord} wrapLongLines={true} customStyle={{ background: '#101010', overflowX: 'auto', borderRadius: '0.5rem', fontFamily: 'Jetbrains Mono, monospace', border: '2px solid #242424' }} codeTagProps={{style: {fontFamily: 'inherit'} }}>
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
      consola.error(new Error(`Image at path ${src} could not be found. A placeholder error image (${placeholderSrc}) will be used instead to represent this.`));
    };
  
    return (
      <div className="relative">
          <img className="rounded-md border border-neutral-800" loading="lazy" alt={alt} src={src} onError={handleImageError} {...props} />
        {alt && <p className="text-sm text-neutral-600 mt-2">{alt}</p>}
      </div>
    );
  },

  // Video
  video({ node, alt, src, ...props }) {
    const placeholderSrc = '/not-found.png';

    const handleVideoError = (event) => {
      event.target.src = placeholderSrc;
      consola.error(new Error(`Video at path ${src} could not be found. A placeholder error image (${placeholderSrc}) will be used instead to represent this.`));
    };

    return (
      <div className="relative">
        <video src={src} className="border border-neutral-800 rounded-lg" onError={handleVideoError} {...props}>
          Your browser does not support the video tag.
        </video>
        {alt && <p className="text-sm text-neutral-600 mt-2">{alt}</p>}
      </div>
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
      <h1 className="group text-zinc-100 hover:text-zinc-300 text-3xl duration-300 font-semibold tracking-tight mt-5 pb-1 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300 tooltip tooltip-top" />
        </Link>
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h2 className="group text-zinc-100 hover:text-zinc-300 text-2xl duration-300 font-semibold tracking-tight mt-5 pb-1 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300 tooltip tooltip-top" />
        </Link>
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h3 className="group text-zinc-100 hover:text-zinc-300 text-xl duration-300 font-semibold tracking-tight mt-5 pb-1 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300 tooltip tooltip-top" />
        </Link>
      </h3>
    );
  },
  h4({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h4 className="group text-zinc-100 hover:text-zinc-300 text-lg duration-300 font-semibold tracking-tight mt-5 pb-1 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300 tooltip tooltip-top" />
        </Link>
      </h4>
    );
  },
  h5({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h5 className="group text-zinc-100 hover:text-zinc-300 text-base duration-300 font-semibold tracking-tight mt-5 pb-1 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300 tooltip tooltip-top" />
        </Link>
      </h5>
    );
  },
  h6({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h6 className="group text-zinc-100 hover:text-zinc-300 text-sm duration-300 font-semibold tracking-tight mt-5 pb-1 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300 tooltip tooltip-top" />
        </Link>
      </h6>
    );
  },

  // Lists
  ul({ node, children, ...props }) {
    return <ul className="list-disc pl-6 my-4" {...props}>{children}</ul>;
  },
  ol({ node, children, ...props }) {
    return <ol className="list-decimal pl-6 my-4" {...props}>{children}</ol>;
  },
  li({ node, children, ...props }) {
    return <li className="my-2 marker:text-neutral-500 pl-2" {...props}>
      {children}
    </li>;
  },

  // Quotes
  blockquote({ node, children, ...props }) {
    return (
      <blockquote className="border-l-4 border-neutral-800 border-opacity-60 pl-4 py-0.5 my-1 italic">
        <div className="px-3">
          {children}
        </div>
      </blockquote>
    );
  },

  // Inline code
  inlineCode({ node, children, ...props }) {
    return <div className="rounded-lg bg-neutral-800 text-white px-2 py-1" {...props}>{children}</div>;
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
    // 'isInternalLink' is used here to determine whether the link is a header ID or external link.
    // Minus styling, attributes aren't applied to header ID's (isInternalLink).
    const isInternalLink = props.href && props.href.startsWith('#');
    return (
      <a 
        className="text-zinc-100 hover:text-zinc-300 duration-300 border-b border-dashed border-neutral-400"
        target={isInternalLink ? undefined : "_blank"}
        rel={isInternalLink ? undefined : "noopener noreferrer"}
        {...props}
      >
        {children}
      </a>
    );
  },

  // Keyboard
  kbd({ node, children, ...props }) {
    return (
      <kbd className="text-zinc-100 rounded-md tags tracking-tighter m-0.5" {...props}>
        `{children}`
      </kbd>
    );
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
    return (
      <div className="overflow-x-auto my-4 rounded-md">
        <table className="table-auto min-w-full" {...props}>
          {children}
        </table>
      </div>
    );
  },
  thead({ node, children, ...props }) {
    return <thead className="bg-neutral-800 bg-opacity-70 text-zinc-300" {...props}>{children}</thead>;
  },
  tbody({ node, children, ...props }) {
    return <tbody {...props}>{children}</tbody>;
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