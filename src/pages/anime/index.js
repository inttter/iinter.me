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
import { ArrowUpRight, Clock, Check } from 'lucide-react';

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

          // Format start date of show
          let startDate = "";
          if (entry.startedAt?.year && entry.startedAt?.month && entry.startedAt?.day) {
            const day = entry.startedAt.day.toString().padStart(2, "0");
            const month = entry.startedAt.month.toString().padStart(2, "0");
            const year = entry.startedAt.year.toString().slice(-2);
            startDate = `${day}/${month}/${year}`; // eg. 05/03/25
          }

          // Format completion date of show
          let finishDate = "";
          if (entry.completedAt?.year && entry.completedAt?.month && entry.completedAt?.day) {
            const day = entry.completedAt.day.toString().padStart(2, "0");
            const month = entry.completedAt.month.toString().padStart(2, "0");
            const year = entry.completedAt.year.toString().slice(-2);
            finishDate = `${day}/${month}/${year}`; // eg. 05/03/25
          }

          accumulator.push({
            id: entry.media.id,
            title: title,
            coverImage: entry.media.coverImage ? entry.media.coverImage.large : null,
            score: entry.score,
            notes: entry.notes,
            progress: entry.progress,
            episodes: entry.media.episodes,
            startDate: startDate,
            finishDate: finishDate
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
    181444: "The Fragrant Flower Blooms With Dignity",
    181841: "CITY THE ANIMATION",
    21127: "Steins;Gate 0",
    186712: "Bocchi the Rock! 2nd Season"
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
          <div className="flex justify-end items-center text-sm text-stone-400 animate-blurred-fade-in duration-500" aria-label="AniList Profile Link">
            {username && (
              <Link 
                href={`https://anilist.co/user/${username}`} 
                target="_blank" rel="noopener noreferrer" 
                className="group hover:text-zinc-100 duration-300 flex items-center"
              >
                <SiAnilist className="mr-1" /> AniList Profile <ArrowUpRight size={15} />
              </Link>
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
                <span className="text-zinc-200 hover:text-zinc-200/70 font-medium md:text-lg text-base text-[15px] truncate duration-300" aria-label="Anime Title">
                  {item.title}
                </span>
              </Link>
              {title === "Watching" && item.startDate && (
                // Show start date of show
                <div className="text-xs text-soft font-normal flex items-center -mt-1 mb-[1px] md:gap-x-0 gap-x-[3px]">
                  <Clock size={12} className="text-stone-400" /> Started {item.startDate}
                </div>
              )}
              {title == "Completed" && item.finishDate && (
                // Show completion date of show
                <div className="text-xs text-soft font-normal flex items-center -mt-1 mb-[1px] md:gap-x-0 gap-x-[3px]">
                  <Check size={12} className="text-stone-400" /> Finished {item.finishDate}
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
                  className="absolute bottom-3 right-3 bg-neutral-800/80 border border-neutral-700/60 text-soft px-2 py-1 rounded-md text-xs font-medium hover:cursor-help tooltip tooltip-left duration-300" 
                  data-tip="Episodes Watched" 
                  data-theme="black" 
                  aria-label="Anime Episode Progress"
                >
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