import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Top from '../../components/BackToTop';
import { request } from 'graphql-request';
import { SiAnilist } from "react-icons/si";
import { CircleX, Star } from 'lucide-react';
import consola from 'consola';
import Image from 'next/image';

const IndexPage = () => {
  const [watchlist, setWatchlist] = useState({
    watching: [],
    completed: [],
    planned: [],
  });
  const [profilePicture, setProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [favourites, setFavourites] = useState([]);
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
              favourites {
                anime {
                  nodes {
                    id
                    title {
                      english
                    }
                    coverImage {
                      large
                    }
                  }
                }
              }
            }
          }
        }
      `;
  
      try {
        const data = await request('https://graphql.anilist.co', query);
        const lists = data.MediaListCollection.lists;
        const user = data.MediaListCollection.user;
        const favourites = user.favourites.anime.nodes;
  
        setWatchlist({
          watching: parseEntries(lists, 'CURRENT'),
          completed: parseEntries(lists, 'COMPLETED'),
          planned: parseEntries(lists, 'PLANNING')
        });
  
        if (user) {
          setProfilePicture(user.avatar.large);
          setUsername(user.name);
          setFavourites(favourites);
        }
      } catch (error) {
        consola.error('An error occurred:', error);
        setErrorMessage('Error fetching list. Check the console for more details, or wait a few minutes and try again.');
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="animate-blurred-fade-in duration-1000"
            >
              <WatchlistCategory title="Watching" list={watchlist.watching} favourites={favourites} />
            </motion.div>
          )}
          {watchlist.completed.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="animate-blurred-fade-in duration-1000"
            >
              <WatchlistCategory title="Completed" list={watchlist.completed} favourites={favourites} />
            </motion.div>
          )}
          {watchlist.planned.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="animate-blurred-fade-in duration-500"
            >
              <WatchlistCategory title="Plan To Watch" list={watchlist.planned} favourites={favourites} />
            </motion.div>
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
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center bg-red-500 bg-opacity-40 text-zinc-200 px-4 py-2 rounded-md">
              <CircleX size={60} className="mr-3" /> {errorMessage}
            </div>
          </motion.div>
        )}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="flex justify-end items-center text-sm text-neutral-600 animate-blurred-fade-in duration-500">
            {profilePicture && (
              <Link href={`https://anilist.co/user/${username}`} target="_blank" rel="noopener noreferrer" className="group hover:bg-neutral-800 hover:text-zinc-100 p-2 rounded-md duration-300 flex items-center">
                <Image src={profilePicture} alt="AniList Profile Picture" width={30} height={30} className="rounded-md mr-2.5 -rotate-6 group-hover:-rotate-2 group-hover:scale-110 group-active:scale-105 duration-300" />
                View {username}'s full AniList <SiAnilist className="m-1 group-hover:text-sky-400 duration-100" /> profile
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const WatchlistCategory = ({ title, list, favourites }) => {
  return (
    <div>
      <div className="text-2xl mx-3 tracking-tighter font-semibold mb-3 text-zinc-100">{title}</div>
      {list.map(item => (
        <Link key={item.id} href={`https://anilist.co/anime/${item.id}`} target="_blank" rel="noopener noreferrer" className="group">
          <div key={item.id} className="relative flex items-center hover:bg-neutral-950 p-3 rounded-md duration-300">
            {item.coverImage && (
              <div className="group relative">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  width={70}
                  height={70}
                  layout="intrinsic"
                  className="rounded-lg animate-blurred-fade-in border-2 border-neutral-700 group-hover:border-zinc-300 duration-300"
                />
              </div>
            )}
            <div className="px-3 flex-grow flex-shrink-0 md:max-w-[500px] max-w-[200px] overflow-ellipsis truncate text-zinc-100 md:text-lg text-md tracking-tigh">
            {favourites.some(fav => fav.id === item.id) && (
              <span className="absolute right-2.5 font-semibold top-3 flex items-center bg-transparent tooltip tooltip-left" data-tip={`This is position number ${favourites.findIndex(fav => fav.id === item.id) + 1} on my favourites list!`} data-theme="lofi">
                <span className="text-sm text-neutral-600 mr-1.5 flex items-center">
                  #{favourites.findIndex(fav => fav.id === item.id) + 1}
                </span>
                <Star size={15} color="yellow" fill="yellow" />
              </span>
            )}
            {item.title}
              {title !== "⌚ Plan To Watch" && item.score && item.score > 0 ? (
                <span className="absolute sm:right-2 bg-neutral-800 group-hover:bg-neutral-950 text-neutral-300 px-2 py-1 rounded-md text-xs font-medium tooltip tooltip-top bottom-2 right-2 md:right- group-hover:scale-110 group-hover:rotate-6 duration-300" data-tip="Rating" data-theme="lofi">
                  {item.score}/10
                </span>
              ) : (
                null // null so that the "0" that gets appended to the {item.title} won't show
              )}
            </div>
          </div>
        </Link>
      ))}
      <div className="flex items-center justify-center">
        <hr className="w-full border-t border-neutral-800 mt-2" />
      </div>
    </div>
  );
};

export default IndexPage;