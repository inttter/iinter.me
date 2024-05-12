import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Top from '../../components/BackToTop';
import { request } from 'graphql-request';
import { SiAnilist } from "react-icons/si";
import { CircleX } from 'lucide-react';
import consola from 'consola';

const IndexPage = () => {
  const [watchlist, setWatchlist] = useState({
    watching: [],
    completed: [],
    planned: [],
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchWatchlist = async () => {
      const query = `
        query {
          MediaListCollection(userName: "Intter", type: ANIME) {
            lists {
              entries {
                media {
                  id
                  title {
                    english
                  }
                  coverImage {
                    large
                  }
                }
                status
                score
              }
            }
          }
        }
      `;

      try {
        const data = await request('https://graphql.anilist.co', query);
        consola.success('Successfully fetched list from https://anilist.co/user/intter/animelist.')
        const lists = data.MediaListCollection.lists;

        const watching = [];
        const completed = [];
        const planned = [];

        lists.forEach(list => {
          list.entries.forEach(entry => {
            const media = entry.media;
            const title = media.title.english;
            const coverImage = media.coverImage ? media.coverImage.large : null;
            const score = entry.score;

            switch (entry.status) {
              case 'CURRENT':
                watching.push({ id: media.id, title, coverImage, score });
                break;
              case 'COMPLETED':
                completed.push({ id: media.id, title, coverImage, score });
                break;
              case 'PLANNING':
                planned.push({ id: media.id, title, coverImage, score });
                break;
              default:
                break;
            }
          });
        });

        setWatchlist({ watching, completed, planned });
      } catch (error) {
        consola.error(new Error('An error occurred when fetching the watchlist:', error));
        setErrorMessage(`Error fetching list. Check the console for more details, or wait a few minutes and try again.`);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-24 space-y-6 flex-col">
        <div className="flex flex-col space-y-4">
          {watchlist.watching.length > 0 && (
            <div className="animate-blurred-fade-in duration-300">
              <WatchlistCategory title="💻 Watching Currently" list={watchlist.watching} titleColor="text-blue-400" />
            </div>
          )}
          {watchlist.completed.length > 0 && (
            <div className="animate-blurred-fade-in duration-300">
              <WatchlistCategory title="✅ Completed" list={watchlist.completed} titleColor="text-emerald-400" />
            </div>
          )}
          {watchlist.planned.length > 0 && (
            <div className="animate-blurred-fade-in duration-300">
              <WatchlistCategory title="⌚ Plan To Watch" list={watchlist.planned} titleColor="text-violet-400" />
            </div>
          )}
        </div>
        <Head>
          <title>Anime List | Inter</title>
        </Head>
        <Navbar />
        <div className="mt-auto">
          <Top />
        </div>
        {errorMessage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-center items-center bg-red-500 bg-opacity-40 text-zinc-200 px-4 py-2 rounded-md">
              <CircleX size={60} className="mr-3" /> {errorMessage}
            </div>
          </motion.div>
        )}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.8 }}>
          <div className="flex justify-end">
            <Link href="https://anilist.co/user/intter/animelist" target="_blank" rel="noopener noreferrer" className="relative mt-2 items-end justify-end tooltip tooltip-left bg-transparent" data-theme="lofi" data-tip="View this on my AniList profile">
              <SiAnilist size={40} className="mr-1 text-neutral-700 hover:text-sky-400 hover:bg-zinc-300 hover:bg-opacity-15 rounded-md p-2 duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const WatchlistCategory = ({ title, list, titleColor }) => {
  return (
    <div>
      <div className={`text-2xl font-semibold mb-6 tracking-tighter ${titleColor}`}>{title}</div>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {list.map(item => (
          <div key={item.id} className="relative">
            {item.coverImage && (
              <div key={item.id} className="group relative hover:shadow-2xl hover:shadow-neutral-700 hover:scale-105 active:scale-95 duration-300">
                <Link href={`https://anilist.co/anime/${item.id}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="rounded-md mb-2 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-30 animate-blurred-fade-in"
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-black bg-opacity-50">
                    <span className="text-zinc-50 font-semibold px-3 text-center md:text-left sm:text-lg md:text-md tracking-tighter">
                      {item.title}
                    </span>
                  </span>
                  {title !== "⌚ Plan To Watch" && item.score && item.score > 0 && ( // Check if title is not "Plan To Watch" and score exists and is greater than 0
                    <span className="absolute bottom-1 right-1.5 sm:right-2 md:right-1 bg-neutral-800 text-neutral-300 px-2 py-1 rounded-md text-xs font-medium tooltip tooltip-top group-hover:bottom-2 group-hover:right-2 group-hover:md:right-2 duration-300" data-tip="Rating" data-theme="lofi">
                      {item.score}/10
                    </span>
                  )}
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
        <hr className="w-full border-t border-neutral-800 mt-2" />
      </div>
    </div>
  );
};

export default IndexPage;