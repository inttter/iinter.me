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
        <Head>
          <title>Projects | Inter</title>
        </Head>

        <div className="w-full max-w-3xl py-3= space-y-4">
          {projectsData.map((project, index) => (
            <div key={index} className="animate-blurred-fade-in duration-300">
              {index !== 0 && 
                <hr className="border-neutral-700/60 my-2" />
              }

              <div className="flex justify-between items-center w-full py-1 group">
                <div className="flex items-center gap-1">
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-200 hover:text-zinc-100 text-base font-medium flex items-center duration-300"
                  >
                    {project.name}
                    <ArrowUpRight size={15} className="ml-0.5 group-hover:translate-x-[1.5px] text-stone-400/80 group-hover:text-zinc-100 duration-200" />
                  </Link>
                </div>

                <div className="flex items-center gap-2 text-sm text-stone-400">
                  {stars[project.github] !== undefined && (
                    <>
                      <Link
                        href={`${project.github}/stargazers`}
                        target="_blank"
                        className="text-xs text-soft hover:text-zinc-100 flex items-center animate-blurred-fade-in duration-300"
                        aria-label="GitHub Star Count"
                      >
                        <FaStar size={13} className="mr-0.5 text-yellow-400" />
                        {stars[project.github]}
                      </Link>
                    </>
                  )}

                  <Link
                    href={project.github}
                    target="_blank"
                    className="text-stone-400/80 hover:text-soft flex items-center duration-300"
                    aria-label="GitHub Repository"
                  >
                    <FaGithub size={18} />
                  </Link>
                </div>
              </div>

              <div className="space-y-2 animate-blurred-fade-in duration-300">
                <div className="text-stone-300 text-sm mb-2">
                  {project.description}
                </div>

                {project.tags && (
                  <div className="flex flex-wrap gap-2 truncate whitespace-pre-wrap duration-300">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs text-stone-400 font-mono tracking-normal duration-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Navbar />
      </div>
    </div>
  );
}