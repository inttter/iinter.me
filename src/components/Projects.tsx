import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CgDanger } from "react-icons/cg";
import { Github, TriangleAlert, ArrowUpRight } from "lucide-react";
import projectsData from '../data/projects.json';

function Projects() {
  return (
    <motion.div
      className="rounded-t-[20px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-1">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className="py-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="hover:bg-gray-200 hover:bg-opacity-5 duration-200 p-3 rounded-md block hover:shadow-2xl hover:shadow-neutral-800 antialiased">
              <div className="flex items-center">
                <Link href={project.link} target="_blank" rel="noopener noreferer" passHref>
                  <span className="text-zinc-100 hover:text-stone-300 duration-300 flex items-center group">
                    {project.name} <ArrowUpRight size={15} className="text-neutral-500 ml-1 inline-block group-hover:translate-x-0.5 group-active:translate-x-1 duration-300" />
                  </span>
                </Link>
              </div>
              {!project.maintained && (
                <motion.div
                  className="bg-orange-500 bg-opacity-50 text-zinc-300 p-1 px-2 mt-2.5 rounded-md text-xs flex items-center tooltip tooltip-top cursor-help"
                  data-tip="While this project may still work, updates will no longer be provided to it, and any issues which arise will not be fixed."
                  data-theme="lofi"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="hover:blur-[1px] duration-300 flex items-center">
                    <TriangleAlert size={15} strokeWidth="3" className="mr-1" />
                    Deprecated Project
                  </div>
                </motion.div>
              )}
              <motion.p
                className="text-stone-400 text-sm py-2.5"
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