import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import consola from 'consola';
import hljs from 'highlight.js';
import 'highlight.js/styles/nord.css';
import Link from 'next/link';
import { toast } from 'sonner';
import { Check, Copy, Link as LinkIcon } from 'lucide-react';

const MarkdownComponents = {
  pre({ node, children, ...props }) {
    const codeElement = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        typeof child.props.className === 'string'
    );

    // Default values
    let language = 'plaintext';
    let codeString = '';

    if (React.isValidElement(codeElement)) {
      const className = codeElement.props.className;
      const match = className.match(/language-(\w+)/);
      language = match ? match[1] : 'plaintext';

      codeString = codeElement.props.children
        ? Array.isArray(codeElement.props.children)
        ? codeElement.props.children.join('')
        : String(codeElement.props.children)
        : '';
    }

    const highlightedCode = hljs.highlightAuto(codeString, [language]).value;

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
      copy(codeString);
      setCopied(true);
      toast.success('Code copied to clipboard!');

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    return (
      <div className="relative mt-4 rounded-lg border border-neutral-800 bg-neutral-900/80">
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2 text-soft text-sm font-semibold bg-neutral-900 hover:border-neutral-700 duration-300 border md:border-2 border-neutral-800 rounded-md p-1.5 mr-1"
          aria-label="Copy code to clipboard"
          title="Copy code to clipboard"
        >
          {copied ? (
            <Check size={20} className="w-4 h-4 text-emerald-400 transform transition-transform duration-300" />
          ) : (
            <Copy size={20} className="w-4 h-4 transform transition-transform duration-300" />
          )}
        </button>
        <pre
          className="p-4 rounded-lg text-zinc-300 bg-[#101010] border-neutral-800 font-mono text-[13px] md:text-sm leading-5 whitespace-pre overflow-auto"
          aria-label="Code Block"
        >
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} {...props} />
        </pre>
      </div>
    );
  },

  code({ node, inline, children, ...props }) {
    return (
      <code
        className="px-1 py-[1.5px] bg-neutral-800 border border-neutral-700/40 rounded-md font-mono tracking-tighter whitespace-pre-wrap break-words"
        {...props}
      >
        {children}
      </code>
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
      consola.error(new Error(`Image at path ${src} could not be found.`));
    };

    return (
      <div className="relative">
        <img
          className="rounded-md border border-neutral-800"
          loading="lazy"
          alt={alt || 'Image'}
          src={src || placeholderSrc}
          onError={handleImageError}
          {...props}
        />
        {alt && <p className="text-sm text-stone-400 mt-2">{alt}</p>}
      </div>
    );
  },

  // Video
  video({ node, alt, src, ...props }) {
    const placeholderSrc = '/not-found.png';

    const handleVideoError = (event) => {
      event.target.src = placeholderSrc;
      consola.error(new Error(`Video at path ${src} could not be found.`));
    };

    return (
      <div className="relative">
        <video
          src={src}
          className="border border-neutral-800 rounded-md"
          onError={handleVideoError}
          {...props}
        >
          Your browser does not support the video tag.
        </video>
        {alt && <p className="text-sm text-stone-400 mt-2">{alt}</p>}
      </div>
    );
  },

  // Iframe
  iframe({ node, ...props }) {
    return (
      <iframe
        width={props.width}
        height={props.height}
        className="aspect-video mb-4 prose-invert"
        {...props}
      />
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
      <h1 className="group text-zinc-100 hover:text-soft text-3xl duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300" />
        </Link>
      </h1>
    );
  },

  h2({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h2 className="group text-zinc-100 hover:text-soft text-2xl duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300" />
        </Link>
      </h2>
    );
  },

  h3({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h3 className="group text-zinc-100 hover:text-soft text-xl duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300" />
        </Link>
      </h3>
    );
  },

  h4({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h4 className="group text-zinc-100 hover:text-soft text-lg duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300" />
        </Link>
      </h4>
    );
  },

  h5({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h5 className="group text-zinc-100 hover:text-soft text-base duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300" />
        </Link>
      </h5>
    );
  },
  h6({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h6 className="group text-neutral-500 hover:text-soft text-sm duration-300 font-semibold mt-5 relative" {...props}>
        <Link href={`#${headerId}`} className="no-underline flex items-center">
          {children}
          <LinkIcon size={15} color="gray" className="ml-2 opacity-0 group-hover:opacity-100 duration-300" />
        </Link>
      </h6>
    );
  },

  // Lists
  ul({ node, children, ...props }) {
    return <ul className="list-disc marker:text-neutral-500 pl-6 my-4" {...props}>{children}</ul>;
  },

  ol({ node, children, ...props }) {
    return <ol className="list-decimal marker:text-neutral-500 pl-6 my-4" {...props}>{children}</ol>;
  },

  li({ node, children, ...props }) {
    return <li className="my-2 marker:text-neutral-500 pl-2" {...props}>
      {children}
    </li>;
  },

  // Quotes
  blockquote({ node, children, ...props }) {
    return (
      <blockquote className="border-l-4 border-neutral-800/90 pl-2 py-0.5 my-1">
        <div className="px-3">
          {children}
        </div>
      </blockquote>
    );
  },

  // Strong and Emphasis
  strong({ node, children, ...props }) {
    return <strong className="font-normal text-zinc-100 brightness-200" {...props}>{children}</strong>;
  },
  em({ node, children, ...props }) {
    return <em className="italic mr-0.5" {...props}>{children}</em>;
  },

  // Links
  a({ node, children, ...props }) {
    return (
      <a className="text-zinc-100 hover:text-zinc-300 border-b border-neutral-500 duration-300" {...props}>
        {children}
      </a>
    );
  },

  // Keyboard (aka inline code)
  kbd({ node, children, ...props }) {
    return (
      <kbd className="text-zinc-300 p-1.5 bg-[#1A1A1A] border border-neutral-700 shadow-sm shadow-neutral-500 rounded-md tags tracking-tighter m-0.5" {...props}>
        {children}
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
    return <thead className="bg-neutral-800 bg-opacity-70 text-soft" {...props}>{children}</thead>;
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

export default MarkdownComponents;