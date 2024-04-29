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
import { useRouter } from 'next/router';
import { Github, Check, Copy } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import BackToTopButton from '../../components/BackToTop';
import { toast, Toaster } from 'sonner';
import copy from 'copy-to-clipboard';
import Navbar from '../../components/Navbar';

export default function Post({ post }) {
  const router = useRouter();

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
      className="bg-main min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8 overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Head>
        <title>{post.frontmatter.title}</title>
        <meta property="og:image" content={post.frontmatter.image} />
      </Head>
      <div className="max-w-2xl w-full md:px-1 px-3 md:py-7 py-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Navbar />
          </div>
          <span className="flex items-center relative">
            <Link href={githubURL} className="flex items-center text-neutral-600 text-sm hover:bg-neutral-700 p-1.5 -mt-7 md:-mt-5 hover:text-zinc-300 duration-300 bg-transparent hover:bg-opacity-80 rounded-md tooltip tooltip-bottom" target="_blank" rel="noopener noreferrer">
              <Github size={20} />
            </Link>
          </span>
        </div>
        <motion.div
          className="flex flex-col items-start justify-center pt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-2xl text-zinc-100 font-semibold tracking-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {post.frontmatter.title}
          </motion.div>
          <motion.p
            className="text-neutral-600 text-md max-w-2xl overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span>{post.frontmatter.date}</span>
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
          className="leading-7 text-stone-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
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
          className="text-neutral-600 duration-300 text-xs flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Last Updated: {post.frontmatter.lastUpdated}
        </motion.div>
        <motion.div
          className="text-neutral-600 duration-300 text-xs flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
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
        <pre className="rounded-md overflow-auto scrollbar-thin text-sm -mt-2">
          <SyntaxHighlighter language={match ? match[1] : null} style={nightOwl} wrapLongLines={true} customStyle={{ background: '#202020', overflowX: 'auto', borderRadius: '0.5rem' }}>
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
    };
  
    return (
      <div className="relative">
        <Link href={`${src}`} target="_blank" rel="noopener noreferrer">
          <img className="rounded-lg hover:opacity-80 duration-300" loading="lazy" alt={alt} src={src} onError={handleImageError} {...props} />
        </Link>
        {alt && <p className="text-sm text-neutral-600 mt-2">{alt}</p>}
      </div>
    );
  },

  // Video
  video({ node, ...props }) {
    return (
      <video src={props.src} className="shadow-2xl rounded-lg" {...props}>
        Your browser does not support the video tag.
      </video>
    );
  },

  // Paragraphs
  p({ node, children, ...props }) {
    return <p className="my-3" {...props}>{children}</p>;
  },

  // Headers
  h1({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h1 className="text-zinc-100 hover:text-zinc-400 text-3xl duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h2 className="text-zinc-100 hover:text-zinc-400 text-2xl duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h2>
    );
  },
  h3({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h3 className="text-zinc-100 hover:text-zinc-400 text-xl duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h3>
    );
  },
  h4({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h4 className="text-zinc-100 hover:text-zinc-400 text-lg duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h4>
    );
  },
  h5({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h5 className="text-zinc-100 hover:text-zinc-400 text-base duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline">{children}</Link>
      </h5>
    );
  },
  h6({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h6 className="text-zinc-100 hover:text-zinc-400 text-sm duration-300 font-semibold mt-5 relative" {...props}>
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
    return <li className="my-1 marker:text-neutral-600" {...props}>
      <span className="mx-[5px] marker">
        {children}
      </span>
    </li>;
  },

  // Blockquotes
  blockquote({ node, children, ...props }) {
    return (
      <blockquote className="text-stone-400 border-neutral-700 flex items-center italic">
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
    return <a className="text-zinc-50 duration-300 border-b-2 border-dotted border-neutral-500 hover:border-neutral-400" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
  },

  // Keyboard input
  kbd({ node, children, ...props }) {
    return <kbd className="font-mono" {...props}><span className="text-neutral-500">`</span>{children}<span className="text-neutral-500">`</span></kbd>;
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
    return <table className="table-auto my-4 w-full" {...props}>{children}</table>;
  },
  thead({ node, children, ...props }) {
    return <thead className="bg-neutral-800 text-zinc-300" {...props}>{children}</thead>;
  },
  tbody({ node, children, ...props }) {
    return <tbody  {...props}>{children}</tbody>;
  },
  tr({ node, children, ...props }) {
    return <tr className="border border-neutral-700" {...props}>{children}</tr>;
  },
  th({ node, children, ...props }) {
    return <th className="px-4 py-2 text-left" {...props}>{children}</th>;
  },
  td({ node, children, ...props }) {
    return <td className="px-4 py-1.5" {...props}>{children}</td>;
  },
};