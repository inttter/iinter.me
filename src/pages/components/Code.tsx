import React, { ReactNode } from 'react';

interface CodeBlockProps {
  onClick?: () => void;
  children: ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ onClick, children }) => {
  return (
    <div className="rounded-lg overflow-hidden bg-black text-white font-mono font-semibold tracking-tight leading-3 text-sm cursor-pointer">
      <pre className="p-2.5 overflow-x-auto" onClick={onClick}>
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;