import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import { consola } from 'consola';
import hljs from 'highlight.js';
import 'highlight.js/styles/base16/qualia.css';
import Link from 'next/link';
import { toast } from 'sonner';
import { Check, Copy, Link as LinkIcon } from 'lucide-react';

const MarkdownComponents = {
  // Code block
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
      toast.success('Code was successfully copied to your clipboard!');

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    };

    return (
      <div className="relative mt-4">
        <button
          onClick={handleCopy}
          className="absolute top-2.5 right-2 text-zinc-100 bg-neutral-900 hover:bg-neutral-800 border md:border-2 border-neutral-800 hover:border-neutral-700 duration-300 rounded-md p-1.5 mr-1 hover:cursor-pointer tooltip tooltip-left"
          data-tip={copied ? "Copied!" : "Copy"}
          data-theme="bumblebee"
          aria-label="Copy Code To Clipboard"
        >
          {copied ? (
            <Check size={20} className="w-4 h-4 text-emerald-400 transform transition-transform duration-300" />
          ) : (
            <Copy size={20} className="w-4 h-4 transform transition-transform duration-300" />
          )}
        </button>
        <pre
          className="p-4 rounded-lg text-zinc-200 bg-neutral-900/60 border border-neutral-800 font-mono text-[14px] md:text-sm leading-5 whitespace-pre overflow-auto"
          aria-label="Code Block"
        >
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} {...props} />
        </pre>
      </div>
    );
  },

  // Inline code
  code({ node, inline, children, ...props }) {
    return (
      <code
        className="text-zinc-200 px-1 py-0.5 bg-neutral-800 ring ring-neutral-700/60 rounded-md whitespace-pre-wrap break-words"
        {...props}
      >
        {children}
      </code>
    );
  },

  // Line break
  br() {
    return <br className="my-3" />;
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
    return <p className="my-3" {...props}>{children}</p>;
  },

  // Headers
  h1({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h1 className="group text-zinc-100 text-2xl duration-300 font-medium mt-5 relative" {...props}>
        <span className="flex items-center">
          {children}
          <Link href={`#${headerId}`} className="no-underline flex items-center ml-2">
            <LinkIcon size={15} className="opacity-0 text-stone-400/80 hover:text-zinc-300 group-hover:opacity-100 duration-300" />
          </Link>
        </span>
      </h1>
    );
  },

  h2({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h2 className="group text-zinc-100 text-xl duration-300 font-medium mt-5 relative" {...props}>
        <span className="flex items-center">
          {children}
          <Link href={`#${headerId}`} className="no-underline flex items-center ml-2">
            <LinkIcon size={15} className="opacity-0 text-stone-400/80 hover:text-zinc-300 group-hover:opacity-100 duration-300" />
          </Link>
        </span>
      </h2>
    );
  },

  h3({ node, children, ...props }) {
    const headerId = props.id;
    return (
      <h3 className="group text-zinc-100 text-[17px] duration-300 font-medium mt-5 relative" {...props}>
        <span className="flex items-center">
          {children}
          <Link href={`#${headerId}`} className="no-underline flex items-center ml-2">
            <LinkIcon size={15} className="opacity-0 text-stone-400/80 hover:text-zinc-300 group-hover:opacity-100 duration-300" />
          </Link>
        </span>
      </h3>
    );
  },

  // Lists
  ul({ node, children, ...props }) {
    return <ul className="list-disc marker:text-zinc-100 pl-4 space-y-1 mt-4" {...props}>{children}</ul>;
  },

  ol({ node, children, ...props }) {
    return <ol className="list-decimal marker:text-zinc-100 pl-4 space-y-1 mt-4" {...props}>{children}</ol>;
  },

  li({ node, children, ...props }) {
    return <li className="marker:text-zinc-100 pl-2 space-y-1 mt-2" {...props}>{children}</li>;
  },

  // Quotes
  blockquote({ node, children, ...props }) {
    return (
      <blockquote className="border-l-4 border-neutral-700/60 pl-2 py-0.5 my-1">
        <div className="px-3">
          {children}
        </div>
      </blockquote>
    );
  },

  // Bold
  strong({ node, children, ...props }) {
    return <strong className="font-medium text-zinc-100" {...props}>{children}</strong>;
  },
  
  // Italic
  em({ node, children, ...props }) {
    return <em className="italic mr-0.5" {...props}>{children}</em>;
  },

  // Link
  a({ node, children, ...props }) {
    return (
      <a className="text-zinc-100 hover:text-zinc-300/90 border-b border-neutral-500 duration-300" {...props}>
        {children}
      </a>
    );
  },

  // Keyboard
  kbd({ node, children, ...props }) {
    return (
      <kbd className="px-1 py-0.5 bg-neutral-800 border border-neutral-700/60 rounded-md text-sm m-0.5" {...props}>
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

  // Table
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
    return <thead className="bg-neutral-800/70 text-soft" {...props}>{children}</thead>;
  },

  tbody({ node, children, ...props }) {
    return <tbody {...props}>{children}</tbody>;
  },

  tr({ node, children, ...props }) {
    return <tr className="border border-neutral-800" {...props}>{children}</tr>;
  },

  th({ node, children, ...props }) {
    return <th className="px-4 py-2 text-left font-normal text-zinc-100" {...props}>{children}</th>;
  },

  td({ node, children, ...props }) {
    return <td className="px-4 py-1.5" {...props}>{children}</td>;
  },

  // Footnote
  footnoteBlock: ({ node, ...props }) => (
    <section data-footnotes="" className="footnotes" {...props}>
      <ol className="prose-ol:pl-5 prose-ol:mb-2 marker:text-stone-400">{props.children}</ol>
    </section>
  ),
};

export default MarkdownComponents;