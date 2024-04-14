import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CgDanger } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import projectsData from '../data/projects.json';

function Projects() {
  return (
    <motion.div
      className="rounded-t-[20px] selection:bg-[#E8D4B6] selection:text-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-3xl md:text-2xl font-semibold leading-none tracking-tight text-zinc-100 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Projects
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-1">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="hover:bg-neutral-800 hover:bg-opacity-70 hover:shadow-2xl hover:shadow-neutral-700 hover:border-neutral-700 border-transparent border-2 duration-300 p-3 rounded-lg">
              <div className="flex items-center">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-300 border-b-2 border-gray-500 hover:border-gray-400 hover:text-zinc-100 duration-300 animate-in fade-in"
                >
                  {project.name}
                </Link>
                {project.github && (
                  <Link
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-neutral-400 duration-300 ml-2 tooltip tooltip-bottom bg-transparent"
                    data-tip="View on GitHub"
                    data-theme="lofi"
                  >
                    <FaGithub />
                  </Link>
                )}
                {!project.maintained && (
                  <motion.div
                    className="bg-[#383131] text-red-200 p-1 px-2 ml-2 rounded-md text-xs flex items-center tooltip tooltip-top cursor-help"
                    data-tip="This project has been deprecated. While it may still work, updates will no longer be provided to it. For more info, visit the repository."
                    data-theme="lofi"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="hover:blur-[1px] duration-300 flex items-center">
                      <CgDanger className="mr-1" />
                      deprecated
                    </div>
                  </motion.div>
                )}
              </div>
              <motion.p
                className="text-zinc-300 text-sm py-2.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {project.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default Projects;