import React, { useEffect, useState } from 'react';
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
import Image from 'next/image';
import Menu from '../../components/MenuBar';
import { motion } from 'framer-motion';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import { useRouter } from 'next/router';
import axios from 'axios';
import { FaCodeCommit, } from "react-icons/fa6";
import { parseISO, formatDistanceToNow } from 'date-fns';

export default function BlogPost({ post }) {
  const router = useRouter();
  const [latestCommit, setLatestCommit] = useState(null);

  useEffect(() => {
    // Scroll to the anchor if it exists in the URL
    if (router.asPath.includes('#')) {
      const anchor = router.asPath.split('#')[1];
      const element = document.getElementById(anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Fetch latest commit information
    const fetchLatestCommit = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/inttter/iinter.me/commits?path=src/pages/blog/posts/${post.slug}.md`
        );
        if (response.data && response.data.length > 0) {
          setLatestCommit(response.data[0]);
        }
      } catch (error) {
        console.error('Error fetching latest commit:', error);
      }
    };

    fetchLatestCommit();
  }, [router.asPath, post.slug]);

  const parseAndFormatDate = () => {
    try {
      const distance = formatDistanceToNow(new Date(post.frontmatter.date), { addSuffix: true, unit: 'short' });
      return distance;
    } catch (error) {
      console.error('Error parsing date:', error);
      return '?';
    }
  };

  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8 selection:bg-gray-800">
      <Head>
        <title>{`${post.frontmatter.title}`}</title>
        <meta property="og:image" content={post.frontmatter.image} />
      </Head>
      <div className="max-w-2xl w-full px-4 py-8 space-y-6">
        <motion.img
          src={post.frontmatter.image}
          alt="Blog Post Image"
          className="rounded-lg mb-4 mx-auto shadow-xl"
          width={700}
          height={700}
          loading="lazy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="flex flex-col items-start justify-center">
          <div className="text-3xl text-[#E8D4B6] font-semibold tracking-tighter">{post.frontmatter.title}</div>
          <p className="text-zinc-500 mt-1 text-sm">
            <div className="flex items-center space-x-2">
            <span>{post.frontmatter.date} ({parseAndFormatDate()})</span>
            </div>          
          </p>
        </div>
        <div className="text-zinc-300">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw, rehypeAutolinkHeadings, rehypeSlug]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="text-gray-500 duration-300 text-sm mt-2 flex justify-end">
          — Last Updated: {post.frontmatter.lastUpdated}
        </div>
        {latestCommit && (
          <div className="text-gray-500 duration-300 text-sm mt-2 flex justify-end code hover:text-zinc-300 hover:underline hover:underline-offset-2">
            <FaCodeCommit className="mt-[3px]" /> 
            <span className="ml-2">
              <a href={latestCommit.html_url} target="_blank" rel="noopener noreferrer">
                {latestCommit.sha.substr(0, 7)}
              </a>
            </span>
          </div>
        )}
      </div>
      <Menu blogPostFileName={post.slug} />
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
  // Code blocks
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    const codeLines = children.trim().split('\n').map((line, index) => {
    const commentIndex = Math.max(line.indexOf('#'), line.indexOf('//'));
    const hasComment = commentIndex !== -1;
    const lineContent = hasComment ? (
      <span>
        <span style={{ color: 'inherit' }}>{line.substring(0, commentIndex)}</span>
        <span style={{ color: '#6c757d' }}>{line.substring(commentIndex)}</span>
      </span>
    ) : (
      line
    );
    return (
      <div key={index} className="code-line">
        <span className="line-content">{lineContent}</span>
      </div>
    );
  });
    return !inline && match ? (
      <pre className="block code bg-gray-800 p-3 rounded-lg font-mono max-w-full overflow-x-auto">
        {codeLines}
      </pre>
    ) : (
      <pre className="block code bg-neutral-900 text-zinc-300 focus:outline-none focus:caret-gray-400 border border-gray-800 focus:border-red-200 duration-300 p-3 rounded-md font-mono max-w-full overflow-x-auto scrollbar-thin">
        {codeLines}
      </pre>
    );
  },

  // Line break
  br() {
    return <br className="my-4" />;
  },

  // Images
  img({ node, ...props }) {
    return <img className="rounded-lg" loading="lazy" {...props} />;
  },

  // Video
  video({ node, ...props }) {
    return (
      <video src={props.src} loading="lazy" {...props}>
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
    return (
      <h1 className="text-3xl font-semibold my-6" style={{ borderBottom: '1px solid rgba(209, 213, 218, 0.2)', paddingBottom: '5px' }} {...props}>
        {children}
      </h1>
    );
  },
  h2({ node, children, ...props }) {
    return <h2 className="text-2xl font-semibold my-5" {...props}>{children}</h2>;
  },
  h3({ node, children, ...props }) {
    return <h3 className="text-xl font-semibold my-4" {...props}>{children}</h3>;
  },
  h4({ node, children, ...props }) {
    return <h4 className="text-lg font-semibold my-3" {...props}>{children}</h4>;
  },
  h5({ node, children, ...props }) {
    return <h5 className="text-base font-semibold my-2" {...props}>{children}</h5>;
  },
  h6({ node, children, ...props }) {
    return <h6 className="text-sm font-semibold my-1" {...props}>{children}</h6>;
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
    return <em className="italic" {...props}>{children}</em>;
  },

  // Links
  a({ node, children, ...props }) {
    return <a className="text-white hover:text-gray-400 border-b-2 border-gray-500 duration-300 animate-in fade-in" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
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
    return <tbody className="bg-neutral-900" {...props}>{children}</tbody>;
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