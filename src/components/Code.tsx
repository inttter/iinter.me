import React, { ReactNode } from 'react';

interface CodeBlockProps {
  onClick?: () => void;
  children: ReactNode;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ onClick, children }) => {
  return (
    <div className="rounded-md bg-gray-800 bg-opacity-60 text-white shadow-lg overflow-auto scrollbar-hide cursor-pointer active:scale-90 duration-300">
      <pre className="p-4 code" onClick={onClick}>
        {children}
      </pre>
    </div>
  );
};

export default CodeBlock;