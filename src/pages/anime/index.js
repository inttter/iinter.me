import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import BackToTop from '../../components/BackToTop';
import { request } from 'graphql-request';
import { SiAnilist } from "react-icons/si";
import { FaHeart } from "react-icons/fa";
import { X } from 'lucide-react';
import consola from 'consola';
import { toast } from 'sonner';
import Image from 'next/image';

const Anime = () => {
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
                  episodes
                }
                status
                score
                notes
                progress
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

        const completedList = parseEntries(lists, 'COMPLETED').sort((a, b) => {
          const aFavIndex = favourites.findIndex(fav => fav.id === a.id);
          const bFavIndex = favourites.findIndex(fav => fav.id === b.id);

          if (a.score !== b.score) {
            // sorts by score
            return b.score - a.score;
          }
          if (aFavIndex !== -1 && bFavIndex === -1) {
            // eg. if a is favorited and b is not
            return -1;
          }
          if (aFavIndex === -1 && bFavIndex !== -1) {
            // eg. if b is favorited and a is not
            return 1;
          }
          if (aFavIndex !== -1 && bFavIndex !== -1) {
            // if both are favorited, then it sorts by favorite rank
            return aFavIndex - bFavIndex;
          }
          // both aren't favorites
          return 0;
        });
  
        setWatchlist({
          watching: parseEntries(lists, 'CURRENT'),
          completed: completedList,
          planned: parseEntries(lists, 'PLANNING')
        });
  
        if (user) {
          setProfilePicture(user.avatar.large);
          setUsername(user.name);
          setFavourites(favourites);
        }
      } catch (error) {
        consola.error('An error occurred:', error);
        setErrorMessage('Cannot fetch list.');
        toast.error('Error fetching list. Check the console for more details, or wait a few minutes and try again.');
      }
    };
  
    fetchData();
  }, []);

  const parseEntries = (lists, status) => {
    return lists.reduce((accumulator, list) => {
      list.entries.forEach(entry => {
        if (entry.status === status) {
          const animeId = entry.media.id;
  
          // Check for any title overrides on the ID
          const title = titleOverrides[animeId] || 
                        entry.media.title.english || 
                        entry.media.title.romaji || 
                        entry.media.title.native || 
                        "Unknown Title";

          accumulator.push({
            id: entry.media.id,
            title: title,
            coverImage: entry.media.coverImage ? entry.media.coverImage.large : null,
            score: entry.score,
            notes: entry.notes,
            progress: entry.progress,
            episodes: entry.media.episodes,
          });
        }
      });
      return accumulator;
    }, []);
  };

  // For anime that do not have an official English title or return `null` for the English title,
  // add the AniList ID of the show to the `titleOverrides` object below, 
  // along with the preferred/correct title to display.
  const titleOverrides = {
    20997: "Charlotte",
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-24 space-y-6 flex-col">
        <Head>
          <title>Anime List | Inter</title>
        </Head>
        {watchlist.watching.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="animate-blurred-fade-in duration-1000"
          >
            <WatchlistCategory title="Watching" list={watchlist.watching} favourites={favourites} />
          </motion.div>
        )}
        {watchlist.completed.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="animate-blurred-fade-in duration-1000"
          >
            <WatchlistCategory title="Completed" list={watchlist.completed} favourites={favourites} />
          </motion.div>
        )}
        {watchlist.planned.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="animate-blurred-fade-in duration-1000"
          >
            <WatchlistCategory title="Plan To Watch" list={watchlist.planned} favourites={favourites} />
          </motion.div>
        )}
        <div className="mt-auto">
          <BackToTop />
        </div>
        <Navbar />
        {errorMessage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center items-center bg-neutral-800 bg-opacity-40 text-zinc-200 px-4 py-2 rounded-md">
              <X size={20} className="mr-3" /> No list found.
            </div>
          </motion.div>
        )}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-end items-center text-sm text-neutral-600 animate-blurred-fade-in duration-500">
            {profilePicture && (
              <Link 
                href={`https://anilist.co/user/${username}`} 
                target="_blank" rel="noopener noreferrer" 
                className="group hover:bg-neutral-800 hover:text-zinc-100 border border-transparent hover:border-soft-gray p-2 rounded-md duration-300 flex items-center"
              >
                <Image 
                  src={profilePicture} 
                  alt="AniList Profile Picture" 
                  width={30} 
                  height={30} 
                  className="border-2 border-soft-gray rounded-full mr-2.5 scale-110 group-active:scale-105 duration-300" 
                />
                View {username}'s full AniList <SiAnilist className="m-1" /> profile
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
      <div className="text-2xl mx-3 mb-3 font-semibold tracking-tighter text-soft">{title}</div>
      {list.map(item => (
        <Link key={item.id} href={`https://anilist.co/anime/${item.id}`} target="_blank" rel="noopener noreferrer" className="group">
          <div className="relative flex items-center hover:bg-neutral-950 border border-transparent hover:border-neutral-700 transform p-3 rounded-xl duration-300">
            {item.coverImage && (
              <div className="relative">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="antialiased rounded-lg shadow-2xl shadow-neutral-500 border border-neutral-600 transition duration-300"
                />
              </div>
            )}
            <div className="px-3 flex-grow flex-shrink-0 md:max-w-[520px] max-w-[220px] truncate md:whitespace-pre-wrap whitespace-nowrap text-stone-200 md:text-lg text-md antialiased">
              {item.title}
              {item.notes && (
                <div className="text-xs text-stone-400 italic mb-4 overflow-hidden overflow-ellipsis">
                  "{item.notes}"
                </div>
              )}
              {title === "Watching" ? (
                <span className="absolute bottom-3 right-3 bg-neutral-800 bg-opacity-80 group-hover:bg-[#292929] border border-transparent text-soft px-2 py-1 rounded-md text-xs font-medium tooltip tooltip-left duration-300" data-tip="Episodes Watched" data-theme="black">
                  {item.progress}/{item.episodes} episodes
                </span>
              ) : item.score && item.score > 0 ? (
                <span className="absolute bottom-3 right-3 bg-neutral-800 bg-opacity-80 group-hover:bg-[#292929] border border-transparent text-soft px-2 py-1 rounded-md text-xs font-medium tooltip tooltip-left duration-300" data-tip="Rating" data-theme="black">
                  {item.score}/10
                </span>
              ) : null}
              {favourites.some(fav => fav.id === item.id) && (
                <span 
                  className={`antialiased absolute right-14 mr-2.5 bottom-3 flex items-center px-2 py-1 border ${favourites.findIndex(fav => fav.id === item.id) === 0 ? 'border-pink-400' : 'border-transparent'} bg-neutral-800 bg-opacity-80 group-hover:bg-[#292929] duration-300 rounded-md font-medium tooltip tooltip-left`} 
                  data-tip="Favorite Position"
                  data-theme="black"
                >
                  <div className={`text-xs flex items-center ${favourites.findIndex(fav => fav.id === item.id) === 0 ? 'text-zinc-100' : 'text-soft'}`}>
                    <FaHeart size={13} className="mr-1 text-pink-400" />
                    #{favourites.findIndex(fav => fav.id === item.id) + 1}
                  </div>
                </span>
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

export default Anime;