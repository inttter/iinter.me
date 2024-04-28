import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Top from '../../components/BackToTop';
import { request } from 'graphql-request';
import { SiAnilist } from "react-icons/si";
import { CircleX } from 'lucide-react';

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
              }
            }
          }
        }
      `;

      try {
        const data = await request('https://graphql.anilist.co', query);
        console.log('Successfully fetched list from https://anilist.co/user/intter/animelist.')
        const lists = data.MediaListCollection.lists;

        const watching = [];
        const completed = [];
        const planned = [];

        lists.forEach(list => {
          list.entries.forEach(entry => {
            const media = entry.media;
            const title = media.title.english;
            const coverImage = media.coverImage ? media.coverImage.large : null;

            switch (entry.status) {
              case 'CURRENT':
                watching.push({ id: media.id, title, coverImage });
                break;
              case 'COMPLETED':
                completed.push({ id: media.id, title, coverImage });
                break;
              case 'PLANNING':
                planned.push({ id: media.id, title, coverImage });
                break;
              default:
                break;
            }
          });
        });

        setWatchlist({ watching, completed, planned });
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setErrorMessage(`Error fetching list. Most likely, the site is being rate-limited by the API. Please try visiting again in a few minutes.`);
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-24 space-y-6 flex-col">
        <div className="flex flex-col space-y-4">
          {watchlist.watching.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <WatchlistCategory title="📺 Watching" list={watchlist.watching} />
            </motion.div>
          )}
          {watchlist.completed.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <WatchlistCategory title="✅ Completed" list={watchlist.completed} />
            </motion.div>
          )}
          {watchlist.planned.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 }}>
              <WatchlistCategory title="⌚ Plan To Watch" list={watchlist.planned} />
            </motion.div>
          )}
        </div>
        <Head>
          <title>anime list | iinter.me</title>
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
            <Link href="https://anilist.co/user/intter/animelist" target="_blank" rel="noopener noreferrer" className="relative mt-2 items-end justify-end tooltip tooltip-left bg-transparent" data-theme="lofi" data-tip="View list on AniList">
              <SiAnilist size={40} className="mr-1 text-neutral-700 hover:text-sky-400 hover:bg-zinc-300 hover:bg-opacity-15 rounded-md p-2 duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const WatchlistCategory = ({ title, list }) => {
  return (
    <div>
      <div className="text-2xl font-semibold mb-6 text-stone-100 tracking-tighter">{title}</div>
      <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
        {list.map(item => (
          <div key={item.id} className="relative">
            {item.coverImage && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, delay: 1.0 }}
                transition={{ duration: 1.0 }}
                className="group relative hover:shadow-2xl hover:shadow-neutral-700 hover:scale-105 active:scale-95 duration-300"
              >
                <Link href={`https://anilist.co/anime/${item.id}`} target="_blank" rel="noopener noreferrer">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="rounded-md mb-2 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-30"
                  />
                  <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-black bg-opacity-50">
                    <span className="text-zinc-50 font-semibold px-3 text-center md:text-left sm:text-lg md:text-md tracking-tighter">
                      {item.title}
                    </span>
                  </span>
                </Link>
              </motion.div>
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