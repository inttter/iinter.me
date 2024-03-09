import React from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-jsx';
import rehypeRaw from 'rehype-raw';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono';
import Head from 'next/head';

export default function BlogPost({ post }) {
  return (
    <div className="bg-neutral-950 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth p-4 md:p-8">
      <Head>
        <title>{`inter | ${post.frontmatter.title}`}</title>
        <meta property="og:image" content={post.frontmatter.image} />
      </Head>
      <div className="max-w-2xl w-full px-4 py-8 space-y-6">
        <div className="flex items-center justify-center">
          <h1 className="text-5xl text-zinc-300 font-bold">{post.frontmatter.title}</h1>
        </div>
        <div className="text-zinc-300">
          <ReactMarkdown components={markdownComponents} remarkPlugins={[gfm]} rehypePlugins={[rehypeRaw]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="text-gray-500 duration-300 text-sm mt-2 flex justify-center">
          <a href="/blog" className="hover:text-zinc-300 duration-300 flex items-center">
            ← Back to blog posts
          </a>
          <span className="mx-1">•</span> 2024 - MIT License
        </div>
      </div>
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
    return !inline && match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <pre className="block bg-gray-800 p-3 rounded-lg font-mono max-w-full overflow-x-auto" {...props}>
        {children}
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
      <blockquote className="border-l-4 border-neutral-400 italic pl-4 my-4">
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
    return <a className="text-blue-500 hover:text-sky-200 hover:underline duration-300" {...props}>{children}</a>;
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

const SyntaxHighlighter = ({ language, children }) => {
  const html = Prism.highlight(children, Prism.languages[language], language);
  return <pre className={`language-${language}`} dangerouslySetInnerHTML={{ __html: html }} />;
};