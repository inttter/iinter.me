import React from 'react';
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
import { FaArrowLeft, FaHome, FaEnvelope, FaGithub } from 'react-icons/fa';

const avatarHash = 'd14e90a16144987f53f5a3700aacc934'
const userID = '514106760299151372'
const avatarURL = `https://cdn.discordapp.com/avatars/${userID}/${avatarHash}.png`;

const BottomMenuBar = ({ blogPostFileName }) => {
  const githubURL = blogPostFileName ? `https://github.com/inttter/iinter.me/blob/master/src/pages/blog/posts/${blogPostFileName}.md` : '';

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-62 menu menu-horizontal bg-base-200 duration-300 justify-center rounded-full divide-x-2">
      <ul className="flex items-center">
        <li>
          <a href="/blog" className="bg-transparent text-[#A6ADBB] tooltip tooltip-top hover:bg-zinc-300 hover:bg-opacity-10" data-tip="Back" data-theme="coffee"><FaArrowLeft size={20} /></a>
        </li>
        <li>
          <a href="/" className="bg-transparent text-[#A6ADBB] tooltip tooltip-top hover:bg-zinc-300 hover:bg-opacity-10" data-tip="Home" data-theme="coffee"><FaHome size={20} /></a>
        </li>
        <li>
          <a href="mailto:hi@iinter.me" className="bg-transparent text-[#A6ADBB] tooltip tooltip-top hover:bg-zinc-300 hover:bg-opacity-10" data-tip="Email" data-theme="coffee"><FaEnvelope size={20} /></a>
        </li>
        {blogPostFileName && (
          <li>
            <a href={githubURL} target="_blank" rel="noopener noreferrer" className="bg-transparent text-[#A6ADBB] tooltip tooltip-top hover:bg-zinc-300 hover:bg-opacity-10" data-tip="View file on GitHub." data-theme="coffee"><FaGithub size={20} /></a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default function BlogPost({ post }) {
  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8 selection:bg-gray-800">
      <Head>
        <title>{`${post.frontmatter.title}`}</title>
        <meta property="og:image" content={post.frontmatter.image} />
      </Head>
      <div className="max-w-2xl w-full px-4 py-8 space-y-6">
        <img src={post.frontmatter.image} alt="Blog Post Image" className="rounded-lg mb-4 w-auto mx-auto" />
        <div className="flex flex-col items-start justify-center">
          <h1 className="text-5xl text-zinc-300 font-bold">{post.frontmatter.title}</h1>
          <p className="text-zinc-300 mt-4 font-mono code tracking-wider text-sm">
            <i className="fa-regular fa-calendar"></i> <span className="inline-block align-top">{post.frontmatter.date}</span> • <i className="fa-regular fa-clock"></i> <span className="inline-block align-top">{post.frontmatter.timeToRead}</span> min read
          </p>
        </div>
        <div className="flex items-center justify-start">
          <img src={avatarURL} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
          <p className="text-zinc-500 font-semibold text-xs">by <span className="text-zinc-300">Inter</span></p>
        </div>
        <div className="text-zinc-300">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="text-gray-500 duration-300 text-sm mt-2 flex justify-center">
          <a href="/blog" className="hover:text-zinc-300 duration-300 flex items-center">
            <FaArrowLeft className="mr-1" /> Back to blog posts
          </a>
          <span className="mx-1">•</span> 2024 - MIT License
        </div>
      </div>
      <BottomMenuBar blogPostFileName={post.slug} />
    </div>
  );
}

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'src', 'pages', 'blog', 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map(filename => ({
    params: { slug: filename.replace(/\.md$/, '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'src', 'pages', 'blog', 'posts', `${slug}.md`);
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
    const codeLines = children.trim().split('\n').map((line, index) => (
      <div key={index} className="code-line">
        <span className="line-number text-gray-500 text-md mr-4">{index + 1}</span>
        <span className="line-content">{line}</span>
      </div>
    ));
    return !inline && match ? (
      <pre className="block code bg-gray-800 p-3 rounded-lg font-mono max-w-full overflow-x-auto">
        {codeLines}
      </pre>
    ) : (
      <pre className="block code bg-gray-800 p-3 rounded-lg font-mono max-w-full overflow-x-auto">
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
    return <img className="rounded-lg" {...props} />;
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
      <blockquote className="border-l-4 border-neutral-400 pl-4 my-4">
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
    return <a className="text-sky-500 hover:text-[#EBD2B6] hover:underline underline-offset-2 duration-300 animate-in fade-in" {...props}>{children}</a>;
  },

  // Horizontal Rule
  hr({ node, ...props }) {
    return <hr className="my-4 border-t-2 border-neutral-500" {...props} />;
  },

  // Tables
  table({ node, children, ...props }) {
    return <table className="table-auto my-4" {...props}>{children}</table>;
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