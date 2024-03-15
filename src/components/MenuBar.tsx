import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaHome, FaEnvelope, FaGithub } from 'react-icons/fa';

const MenuBar = ({ blogPostFileName }) => {
    const githubURL = blogPostFileName ? `https://github.com/inttter/iinter.me/blob/master/src/pages/blog/posts/${blogPostFileName}.md` : '';
  
    return (
      <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-62 menu menu-horizontal bg-base-200 duration-300 justify-center rounded-full divide-x-2">
        <motion.ul 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
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
        </motion.ul>
      </div>
    );
  };

  export default MenuBar;