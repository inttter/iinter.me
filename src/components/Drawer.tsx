import React, { useState } from 'react';
import { Drawer } from "vaul";
import { Toaster, toast } from 'sonner';
import CodeBlock from './Code';
import projectsData from '../data/projects.json';
import { FiGithub, FiBook } from "react-icons/fi";
import { CgDanger } from "react-icons/cg";
import '@fontsource/geist-mono';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';

function ProjectsDrawer() {
  const [copied, setCopied] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
          toast.success('Copied to your clipboard!');
        })
        .catch(err => {
          console.error('Error copying text to clipboard:', err);
        });
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to your clipboard!');
    }
  };

  const handleProjectsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <Toaster position="bottom-right" />
      <Drawer.Root open={isDrawerOpen} onClose={closeDrawer} shouldScaleBackground>
        <Drawer.Trigger asChild>
          <ul className="menu menu-horizontal bg-base-200 hover:bg-[#EBD2B6] hover:bg-opacity-10 duration-300 rounded-box">
            <li>
              <a onClick={handleProjectsClick} href="/">Projects</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
          </ul>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-black flex flex-col rounded-t-[20px] h-[96%] mt-24 fixed bottom-0 left-0 right-0 drawer">
            <div className="p-4 bg-neutral-950 rounded-t-[10px] flex-1 overflow-y-auto scroll-smooth scrollbar-thin">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-neutral-800 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="text-3xl font-semibold leading-none tracking-tight duration-300 mb-4 text-[#EBD2B6]">
                  Projects
                </Drawer.Title>
                <p className="text-zinc-400 tracking-normal">
                  My featured work. Click on a project's name to go to the project page.
                  Click on the code blocks to copy the text to your clipboard.
                  <span className="text-gray-500 bg-transparent"> (tip: scroll to see more!)</span>
                </p>
                <br />
                <ul className="space-y-4">
                  {projectsData.map((project, index) => (
                    <li key={index}> 
                        <a href={project.link} className="text-zinc-100 hover:text-[#EBD2B6] duration-150 text-lg font-semibold leading-none tracking-tight">{project.name}</a>
                      <span className="ml-1">-</span> {project.description}
                      <br /><br />
                      {/* install command */}
                      {project.install && (
                        <CodeBlock onClick={() => copyToClipboard(project.install)}>
                          {project.install}
                        </CodeBlock>
                      )}
                      {project.install && <br />}
                      {project.source && (
                        <a href={project.source} className="rounded-md mb-2 w-full bg-neutral-900 hover:scale-105 px-10 py-2.5 flex justify-center items-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 duration-300">
                          <span>View Source</span>
                          <FiGithub className="ml-2" />
                        </a>
                      )}
                      {/* docs button */}
                      {project.docs && (
                        <a href={project.docs}>
                          <a className="rounded-md mb-6 w-full bg-neutral-900 hover:scale-105 px-10 py-2.5 flex justify-center items-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 duration-300">
                            <span>Documentation</span>
                            <FiBook className="ml-2" />
                          </a>
                        </a>
                      )}
                      {/* blog post button */}
                      {project.blogPost && (
                        <a href={project.blogPost} className="rounded-md mb-6 w-full bg-neutral-900 hover:scale-105 px-10 py-2.5 flex justify-center items-center text-sm font-semibold text-white shadow-smfocus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 duration-300">
                          <span>Blog Post</span>
                          <FiBook className="ml-2" />
                        </a>
                      )}
                      {/* warning message for things which are deprecated/unmaintained */}
                      {!project.maintained && (
                        <div className="flex items-center bg-red-500 bg-opacity-40 text-white p-4 rounded-md mt-2">
                          <CgDanger className="mr-2" />
                          <span>The above project is deprecated/not maintained.</span>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="p-4 bg-neutral-950 border-t border-black mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <div className="text-xs text-zinc-600 hover:text-zinc-300 duration-300 flex items-center gap-0.25">
                  2024 - All licensed under the MIT License.
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export default ProjectsDrawer;