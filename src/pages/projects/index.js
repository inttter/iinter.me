import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from 'react-icons/fa6';
import projectsData from '../../data/projects.json';
import Navbar from '../../components/Navbar';
import Head from 'next/head';

export default function ProjectsPage() {
  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Head>
            <title>projects | iinter.me</title>
          </Head>
          <div className="md:-py-0 py-20">
            <div>
              <div className="flex justify-end">
                <Link href="https://github.com/inttter?tab=repositories" target="_blank" rel="noopener noreferrer" passHref>
                  <div className="text-xs code mb-2 flex items-center group">
                    <span className="text-neutral-600 hover:text-neutral-500 duration-300">All repos</span> <ArrowUpRight size={15} className="m-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-[1.5px] text-neutral-600 group-hover:text-neutral-500 duration-200" />
                  </div>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-1">
                {projectsData.map((project, index) => (
                  <motion.div
                    key={index}
                    className="py-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="bg-neutral-800 bg-opacity-20 hover:bg-neutral-500 hover:bg-opacity-5 border border-dashed border-neutral-700 hover:border-neutral-800 duration-300 p-3 rounded-md block antialiased">
                      <div className="flex justify-between items-center">
                        <Link href={project.link} target="_blank" rel="noopener noreferer" className="group" passHref>
                          <span className="flex items-center">
                            <span className="border-b border-dashed border-neutral-600 hover:border-neutral-500 text-zinc-100 hover:text-zinc-300 duration-300">{project.name}</span> <ArrowUpRight size={15} className="m-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-[1.5px] group-hover:text-zinc-300 duration-200" />
                          </span>
                        </Link>
                        <Link href={project.github} target="_blank" rel="noopener noreferer" passHref>
                          <div className="mr-1 md:mr-0.5 mt-0.5 text-neutral-500 hover:text-stone-300 duration-300" aria-label="GitHub Repository">
                            <FaGithub size={18} />
                          </div>
                        </Link>
                      </div>
                      {!project.maintained && (
                        <motion.div
                          className="bg-neutral-950 text-zinc-300 border border-neutral-800 p-1 px-2 mt-2.5 rounded-md text-xs flex items-center tooltip tooltip-top cursor-help"
                          data-tip="Updates will no longer be provided, and any issues that arise will not be fixed."
                          data-theme="lofi"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="hover:blur-[1px] duration-300 flex items-center">
                            ⚠️ This project is
                            <span className="text-zinc-50 underline ml-1">
                              no longer maintained
                            </span>.
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
                      {project.tags && (
                        <motion.div
                          className="-mx-1 p-1 rounded-md text-xs flex flex-wrap items-center"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="mr-2">
                              <span className="text-zinc-300 bg-[#202020] border border-neutral-800 px-2 md:py-1.5 py-1 rounded-md tags tracking-tight">{tag}</span>
                            </span>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Navbar />
      </div>
    </div>
  );
}