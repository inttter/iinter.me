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
import Image from 'next/image';

const IndexPage = () => {
  const [watchlist, setWatchlist] = useState({
    watching: [],
    completed: [],
    planned: [],
  });
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState(''); // State to hold the username
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
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
            user {
              name
              avatar {
                large
              }
            }
          }
        }
      `;

      try {
        const data = await request('https://graphql.anilist.co', query);
        const lists = data.MediaListCollection.lists;
        const user = data.MediaListCollection.user;

        setWatchlist({
          watching: parseEntries(lists, 'CURRENT'),
          completed: parseEntries(lists, 'COMPLETED'),
          planned: parseEntries(lists, 'PLANNING')
        });

        if (user) {
          setProfilePicture(user.avatar.large);
          setUsername(user.name); // Set the username
        }
      } catch (error) {
        consola.error('An error occurred:', error);
        setErrorMessage('Error fetching data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  const parseEntries = (lists, status) => {
    return lists.reduce((accumulator, list) => {
      list.entries.forEach(entry => {
        if (entry.status === status) {
          accumulator.push({
            id: entry.media.id,
            title: entry.media.title.english,
            coverImage: entry.media.coverImage ? entry.media.coverImage.large : null,
            score: entry.score
          });
        }
      });
      return accumulator;
    }, []);
  };

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
          <title>Anime List | {username}</title>
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
          <div className="flex justify-end items-center text-sm text-neutral-600">
            {profilePicture && (
              <Link href={`https://anilist.co/user/${username}`} target="_blank" rel="noopener noreferrer" className="group hover:bg-neutral-800 hover:text-zinc-100 p-2 rounded-md duration-300 flex items-center">
                <Image src={profilePicture} alt="AniList Profile Picture" width={30} height={30} className="rounded-md mr-2.5 -rotate-6 group-hover:scale-110 group-active:scale-105 duration-300" />
                View {username}'s AniList <SiAnilist className="ml-1 group-hover:text-sky-400 duration-100" />
              </Link>
            )}
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
                  <Image
                    src={item.coverImage}
                    alt={item.title}
                    width={200}
                    height={200}
                    layout="responsive"
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