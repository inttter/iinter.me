import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaStar } from 'react-icons/fa6';
import projectsData from '../../data/projects.json';
import Navbar from '../../components/Navbar';
import Head from 'next/head';

export default function Projects() {
  const [stars, setStars] = useState({});

  useEffect(() => {
    const fetchStars = async () => {
      const starsData = {};
      for (const project of projectsData) {
        try {
          const response = await fetch(`https://api.github.com/repos/inttter/${project.name}`);
          const data = await response.json();
          starsData[project.github] = data.stargazers_count;
        } catch (error) {
          console.error(`Failed to fetch stars for ${project.github}: ${error}`);
        }
      }
      setStars(starsData);
    };
    fetchStars();
  }, []);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-8 space-y-6 flex-col">
        <div className="flex items-center justify-start">
          <Head>
            <title>Projects | Inter</title>
          </Head>
          <div className="md:-py-0 py-20">
            <div>
              <motion.div
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.5 }}
                className="flex justify-end"
              >
                <Link href="https://github.com/inttter?tab=repositories" target="_blank" rel="noopener noreferrer" passHref>
                  <div className="text-xs code mb-2 flex items-center group">
                    <span className="text-stone-400 hover:text-stone-500 duration-300">
                      All repositories
                    </span> 
                    <ArrowUpRight size={15} className="m-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 text-stone-400 group-hover:text-stone-500 duration-200" />
                  </div>
                </Link>
              </motion.div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                {projectsData.map((project, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    transition={{ duration: 0.5 }}
                    className="animate-blurred-fade-in duration-700"
                  >
                    <div className="bg-[#141414] md:bg-[#181818] border-2 border-neutral-800 duration-300 p-3 rounded-md block antialiased">
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5 }}
                        className="flex justify-between items-center"
                      >
                        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="group" passHref>
                          <span className="flex items-center">
                            <span 
                              className={`border-b border-dashed border-neutral-600 hover:border-neutral-500 ${!project.maintained ? "text-amber-300 hover:text-amber-400 duration-300 tooltip tooltip-right bg-transparent" : "text-soft hover:text-stone-300 hover:text-opacity-80 duration-300 bg-transparent"}`}
                              data-tip={!project.maintained ? "Deprecated, visit for details." : ""}
                              data-theme={!project.maintained ? "black" : ""}
                              aria-label="Project Name"
                            >
                              {project.name}
                            </span>
                            <ArrowUpRight size={15} className="m-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-[1.5px] group-hover:text-soft duration-200" />
                          </span>
                        </Link>
                        <motion.div 
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }} 
                          transition={{ duration: 0.5 }}
                          className="flex items-center"
                        >
                          {stars[project.github] !== undefined && (
                              <Link href={`${project.github}/stargazers`} target="_blank" rel="noopener noreferrer">
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ duration: 0.5 }}
                                  className="text-xs text-soft bg-[#141414] hover:bg-[#202020] border border-neutral-800 hover:border-neutral-700 animate-blurred-fade-in duration-300 px-2 py-1 rounded-md mr-1.5 mb-0.5 flex items-center"
                                  aria-label="GitHub Star Count"
                                >
                                  <FaStar size={13} className="md:mb-0 mb-0.5 mr-0.5 text-yellow-400" />
                                  {stars[project.github]}
                                </motion.span>
                              </Link>
                          )}
                          <Link 
                            href={project.github} 
                            target="_blank" rel="noopener noreferrer" 
                            className="mr-1 md:mr-0.5 -mt-1 text-neutral-600 hover:text-soft duration-300"
                            aria-label="GitHub Repository Link"
                          >
                            <FaGithub size={18} />
                          </Link>
                        </motion.div>
                      </motion.div>
                      <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5 }}
                        className="text-stone-400 text-sm py-2.5 animate-blurred-fade-in duration-700"
                        aria-label="Project Description"
                      >
                        {project.description}
                      </motion.p>
                      {project.tags && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="-mx-1 p-1 rounded-md text-xs flex flex-wrap items-center"
                          aria-label="Project Tags"
                        >
                          {project.tags.map((tag, tagIndex) => (
                            <span key={tagIndex} className="mr-2">
                              <span className="text-soft bg-[#141414] border border-neutral-800 px-2 md:py-1.5 py-1 rounded-md tags tracking-tight">{tag}</span>
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