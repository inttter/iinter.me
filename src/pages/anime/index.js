import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import consola from 'consola';
import Navbar from '@/components/Navbar';
import BackToTop from '@/components/BackToTop';
import { request } from 'graphql-request';
import { SiAnilist } from "react-icons/si";
import { FaHeart } from "react-icons/fa";
import { ArrowUpRight, Play, Check, Clock } from 'lucide-react';

const Anime = () => {
  const [watchlist, setWatchlist] = useState({
    watching: [],
    completed: [],
    planned: [],
  });
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
                  romaji
                  native
                }
                coverImage {
                  large
                }
                episodes
                status
              }
              status
              score
              notes
              progress
              startedAt {
                year
                month
                day
              }
              completedAt {
                year
                month
                day
              }
              createdAt
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
          setUsername(user.name);
          setFavourites(favourites);
        }
      } catch (error) {
        consola.error('An error occurred:', error);
        setErrorMessage('List could not be fetched. You may have hit rate limits. Try again later!');
      }
    };
  
    fetchData();
  }, []);

  const formatDate = (dateOrUnix) => {
    if (!dateOrUnix) return "";
  
    // If unix timestamp
    if (typeof dateOrUnix === "number") {
      const date = new Date(dateOrUnix * 1000);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().slice(-2);
      return `${day}/${month}/${year}`;
    }
  
    // If date object
    const { day, month, year } = dateOrUnix;
    if (!day || !month || !year) return "";
    return `${day.toString().padStart(2, "0")}/${month.toString().padStart(2, "0")}/${year.toString().slice(-2)}`;
  };

  const parseEntries = (lists, status) => {
    return lists.reduce((accumulator, list) => {
      list.entries.forEach(entry => {
        if (entry.status === status) {
          const animeId = entry.media.id;
  
          // Fall back to a romaji or native title for the show
          // if an English name can't be found (ie. if it is null)
          const title = entry.media.title.english || 
                        entry.media.title.romaji || 
                        entry.media.title.native || 
                        "Unknown Title";

          const startDate = formatDate(entry.startedAt); // Format start date of show
          const finishDate = formatDate(entry.completedAt); // Format completion date of show
          const planningSinceDate = formatDate(entry.createdAt); // Format date show was added to 'Planning'

          const isAiring = entry.media.status === "RELEASING";

          accumulator.push({
            id: entry.media.id,
            title: title,
            coverImage: entry.media.coverImage ? entry.media.coverImage.large : null,
            score: entry.score,
            notes: entry.notes,
            progress: entry.progress,
            episodes: entry.media.episodes,
            startDate: startDate,
            finishDate: finishDate,
            isAiring,
            planningSinceDate
          });
        }
      });
      return accumulator;
    }, []);
  };

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-3 md:px-0 py-24 md:py-16 space-y-4">
        <Head>
          <title>Anime List | Inter</title>
        </Head>
        {watchlist.watching.length > 0 && (
          <div className="animate-blurred-fade-in duration-300">
            <WatchlistCategory title="Watching" list={watchlist.watching} favourites={favourites} />
          </div>
        )}
        {watchlist.completed.length > 0 && (
          <div className="animate-blurred-fade-in duration-300">
            <WatchlistCategory title="Completed" list={watchlist.completed} favourites={favourites} />
          </div>
        )}
        {watchlist.planned.length > 0 && (
          <div className="animate-blurred-fade-in duration-300">
            <WatchlistCategory title="Planning" list={watchlist.planned} favourites={favourites} />
          </div>
        )}
        <div className="mt-auto">
          <BackToTop />
        </div>
        {errorMessage && (
          <div className="animate-blurred-fade-in duration-300">
            <div className="flex items-center justify-center text-soft text-7xl font-semibold rounded-md tracking-tighter">
              No list found.
            </div>
            <div className="flex items-center justify-center text-stone-400 text-base md:text-sm rounded-md mt-2" aria-label="Error Message">
              {errorMessage}
            </div>
          </div>
        )}
        <div>
          <div className="flex justify-between items-center text-sm animate-blurred-fade-in duration-500">
            {username && (
              <>
                {/* Display total count of anime watched */}
                <span className="text-stone-400">
                  {watchlist.completed.length + watchlist.watching.length} anime watched
                </span>
                {/* AniList Profile Link */}
                <Link 
                  href={`https://anilist.co/user/${username}`} 
                  target="_blank" rel="noopener noreferrer" 
                  className="group text-stone-400 hover:text-zinc-100 duration-300 flex items-center"
                  aria-label="AniList Profile Link"
                >
                  <SiAnilist className="mr-1" /> AniList Profile <ArrowUpRight size={15} className="ml-0.5" />
                </Link>
              </>
              )}
            </div>
          </div>
        <Navbar />
      </div>
    </div>
  );
};

const WatchlistCategory = ({ title, list, favourites }) => {
  return (
    <div>
      <div className="text-2xl mb-3 mt-0 md:mt-6 font-semibold tracking-tight text-soft">
        {title}
      </div>
      {list.map(item => (
        <div key={item.id} className="group">
          <div className="relative flex items-center py-3">
            {item.coverImage && (
              <div className="relative">
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  width={70}
                  height={70}
                  className="antialiased rounded-md shadow-2xl shadow-neutral-500 border border-neutral-700/60 transition duration-300"
                  aria-label="Anime Cover Image"
                />
              </div>
            )}
            <div className="px-3 flex-grow flex-shrink-0 md:max-w-[520px] max-w-[240px] truncate md:whitespace-pre-wrap whitespace-nowrap antialiased">
              <Link 
                href={`https://anilist.co/anime/${item.id}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center space-x-1 overflow-hidden"
              >
                <span className="text-zinc-200 hover:text-stone-200/70 font-medium md:text-lg text-base text-[15px] truncate duration-300" aria-label="Anime Title">
                  {item.title}
                </span>
              </Link>
              {title === "Watching" && item.startDate && (
                // Show start date of show
                <div className="text-xs text-soft font-normal flex items-center -mt-1 mb-[1px] md:gap-x-0 gap-x-[3px]">
                  <Play size={12} className="text-stone-400" /> Started {item.startDate}
                </div>
              )}
              {title == "Completed" && item.finishDate && (
                // Show completion date of show
                <div className="text-xs text-soft font-normal flex items-center -mt-1 mb-[1px] md:gap-x-0 gap-x-[3px]">
                  <Check size={12} className="text-stone-400" /> Finished {item.finishDate}
                </div>
              )}
              {title === "Planning" && item.planningSinceDate && (
                // Show date show was added to Plan To Watch List
                <div className="text-xs text-soft font-normal flex items-center -mt-1 mb-[1px] md:gap-x-0 gap-x-[3px]">
                  <Clock size={12} className="text-stone-400" /> Since {item.planningSinceDate}
                </div>
              )}
              {item.notes && (
                <div className="text-xs text-stone-400 font-normal mb-4 md:mb-2 overflow-hidden overflow-ellipsis" aria-label="Anime Notes">
                  "{item.notes}"
                </div>
              )}
              {title === "Watching" ? (
                // Anime Episodes Watched
                <span 
                  className="absolute bottom-3 right-3 bg-neutral-800/80 border border-neutral-700/60 text-soft px-2 py-1 rounded-md text-xs font-medium duration-300" 
                >
                  {/* Show an indicator if a show being watched is currently watching */}
                  {item.isAiring && (
                    <div className="w-2 h-2 rounded-full bg-green-500 tooltip tooltip-left mr-1 hover:cursor-help" data-tip="Currently Airing" data-theme="black" />
                  )}
                  {item.progress}/{item.episodes} episodes
                </span>
              ) : item.score && item.score > 0 ? (
                // Anime Score
                <span 
                  className="absolute bottom-3 right-3 bg-neutral-800/80 border border-neutral-700/60 text-soft px-2 py-1 rounded-md text-xs font-medium hover:cursor-help tooltip tooltip-top duration-300" 
                  data-tip="Rating" 
                  data-theme="black" 
                  aria-label="Anime Rating"
                >
                  {item.score}/10
                </span>
              ) : null}
              {/* Favourites Count */}
              {favourites.some(fav => fav.id === item.id) && (
                <span 
                  className={`antialiased absolute right-14 mr-2.5 bottom-3 flex items-center px-2 py-1 border ${favourites.findIndex(fav => fav.id === item.id) === 0 ? 'border-pink-400' : 'border-neutral-700/60'} bg-neutral-800/80 duration-300 rounded-md font-medium hover:cursor-help tooltip tooltip-left`} 
                  data-tip="Favourite Position"
                  data-theme="black"
                  aria-label="Anime Favourite Position"
                >
                  <div className={`text-xs flex items-center ${favourites.findIndex(fav => fav.id === item.id) === 0 ? 'text-zinc-100' : 'text-soft'}`}>
                    <FaHeart size={13} className="mr-1 text-pink-400" />
                    #{favourites.findIndex(fav => fav.id === item.id) + 1}
                  </div>
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-center">
        <hr className="w-full border-t border-neutral-800 mt-2" />
      </div>
    </div>
  );
};

export default Anime;