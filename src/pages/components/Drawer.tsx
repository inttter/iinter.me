import React, { useState } from 'react';
import { Drawer } from "vaul";
import Image from 'next/image';
import { Toaster, toast } from 'sonner';
import CodeBlock from './Code';

function ProjectsDrawer() {
  const [copied, setCopied] = useState(false);

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
      // a fallback for browsers that do not support navigator.clipboard (fuck you safari!)
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

  return (
    <>
      <Toaster position="bottom-right" />
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <button className="cursor-pointer duration-200 hover:scale-125 active:scale-100 hover:rotate-12">
            <i className="fa-solid fa-folder fa-xl"></i>
          </button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-black flex flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
            <div className="p-4 bg-neutral-900 rounded-t-[10px] flex-1 overflow-y-auto">
              <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-600 mb-8" />
              <div className="max-w-md mx-auto">
                <Drawer.Title className="text-3xl font-bold mb-4 text-white">
                  Projects
                </Drawer.Title>
                <p className="text-zinc-300 mb-2 tracking-wide">
                  These are most of my projects that I am actively working on.
                  Click on the names of the projects to be taken to the GitHub
                  page for it. Those with terminal commands are NPM packages which
                  you can click on to copy the command to your clipboard.
                 <span className="text-gray-500 bg-transparent"> (tip: scroll to see more!)</span>
                </p>
                <br />
                <p className="text-zinc-300 mb-2">
                  <strong>
                    <a href="https://github.com/inttter/md-badges" className="hover:text-ctp-pink duration-300 text-lg font-semibold leading-none tracking-tight">md-badges</a>
                  </strong> - An extensive list of Shields.io badges, aka these:
                  <br /><br />
                  <div className="flex justify-center">
                    <Image src="badges/discord-badge.svg" alt="Discord Shields.io badge" width={80} height={30} className="mr-4"></Image>
                    <Image src="badges/chatgpt-badge.svg" alt="ChatGPT Shields.io badge" width={80} height={80} className="mr-4"></Image>
                    <Image src="badges/firefox-badge.svg" alt="Firefox Shields.io badge" width={80} height={80} className="mr-4"></Image>
                    <Image src="badges/youtube-badge.svg" alt="YouTube Shields.io badge" width={80} height={80} className="mr-4"></Image>
                  </div>
                </p>
                <br />
                <hr />
                <br />
                <p className="text-zinc-300 mb-2 space-y-4">
                  <strong>
                    <a href="https://mdbcli.xyz" className="hover:text-ctp-pink duration-300 text-lg font-semibold leading-none tracking-tight">mdbadges-cli</a>
                  </strong> - The CLI version of the above list. It lets you find Shields.io badges without needing to leave the terminal.
                  <CodeBlock onClick={() => copyToClipboard('npm install -g mdbadges-cli')}>
                    npm install -g mdbadges-cli
                  </CodeBlock>
                </p>
                <br />
                <hr className="p-1 rounded-lg" />
                <br />
                <p className="text-zinc-300">
                  <strong>
                    <a href="https://github.com/inttter/create-ps" className="hover:text-ctp-pink duration-300 text-lg font-semibold leading-none tracking-tight">create-ps</a>
                  </strong> - Creates the foundations for an NPM package.
                  <br /><br />
                  <CodeBlock onClick={() => copyToClipboard('npx cps new-project')}>
                    npx cps new-project
                  </CodeBlock>
                </p>
                <br />
                <hr />
                <br />
                <p className="text-zinc-300 mb-2 space-y-4">
                  <strong>
                    <a href="https://discid.xyz" className="hover:text-ctp-pink duration-300">discid</a>
                  </strong> - A simple command-line tool to check a user's Discord status using Lanyard.
                  <div className="flex space-x-2">
                    <CodeBlock onClick={() => copyToClipboard('npm install -g discid')}>
                      npm install -g discid
                    </CodeBlock>
                    <CodeBlock onClick={() => copyToClipboard('discid 514106760299151372')}>
                      discid 514106760299151372
                    </CodeBlock>
                  </div>
                </p>
              </div>
            </div>
            <div className="p-4 bg-neutral-900 border-t border-black mt-auto">
              <div className="flex gap-6 justify-end max-w-md mx-auto">
                <a
                  className="text-xs text-zinc-600 hover:text-zinc-300 duration-300 flex items-center gap-0.25"
                  href="https://github.com/inttter"
                  target="_blank"
                >
                  Want more? Check out my GitHub.
                  <svg
                    fill="none"
                    height="16"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="16"
                    aria-hidden="true"
                    className="w-3 h-3 ml-1"
                  >
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14L21 3"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </>
  );
}

export default ProjectsDrawer;