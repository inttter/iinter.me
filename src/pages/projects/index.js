import React, { useState, useEffect } from 'react';
import projectsData from '@/data/projects.json';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from "lucide-react";
import { FaGithub, FaStar } from 'react-icons/fa6';

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
      <div className="max-w-2xl w-full px-3 md:px-0 py-24 md:py-16 space-y-4">
        <div className="flex items-center justify-start">
          <Head>
            <title>Projects | Inter</title>
          </Head>
          <div className="md:-py-0 py-2">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-3">
                {projectsData.map((project, index) => (
                  <div key={index} className="animate-blurred-fade-in duration-300">
                    <div className="bg-[#141414] md:bg-[#181818] border border-neutral-700/60 duration-300 p-3 rounded-md block antialiased">
                      <div className="flex justify-between items-center">
                        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="group" passHref>
                          <span className="flex items-center">
                            <div>
                              <span
                                className="text-zinc-300 hover:text-zinc-100 text-base bg-transparent duration-300"
                                data-theme="black"
                                aria-label="Project Name"
                              >
                                {project.name}
                              </span>
                            </div>
                            <ArrowUpRight size={15} className="hidden md:block ml-0.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-[1.5px] group-hover:text-soft duration-200" />
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
                              <span
                                className="text-xs text-soft hover:text-zinc-100 animate-blurred-fade-in duration-300 mr-2 mb-0.5 flex items-center"
                                aria-label="GitHub Star Count"
                              >
                                <FaStar size={13} className="md:mb-0 mb-0.5 mr-0.5 text-yellow-400" />
                                {stars[project.github]}
                              </span>
                            </Link>
                          )}
                          <Link 
                            href={project.github} 
                            target="_blank" rel="noopener noreferrer" 
                            className="mr-1 md:mr-0.5 -mt-1 text-stone-400/90 hover:text-soft duration-300"
                            aria-label="GitHub Repository Link"
                          >
                            <FaGithub size={18} />
                          </Link>
                        </motion.div>
                      </div>
                      <div className="text-stone-400 text-sm py-2 -mt-0.5 animate-blurred-fade-in duration-300" aria-label="Project Description">
                        {project.description}
                      </div>
                      {project.tags && (
                        <div className="flex flex-wrap gap-1 truncate whitespace-pre-wrap animate-blurred-fade-in duration-300">
                          {project.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="text-xs text-soft bg-[#141414] border border-neutral-800 px-2 py-1 rounded-md font-mono tracking-tight"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
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