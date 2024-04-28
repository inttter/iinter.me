import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import { request } from 'graphql-request';

const IndexPage = () => {
  const [watchlist, setWatchlist] = useState({
    watching: [],
    completed: [],
    planned: [],
  });

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
        const lists = data.MediaListCollection.lists;

        const watching = [];
        const completed = [];
        const planned = [];

        // Iterate over each list
        lists.forEach(list => {
          // Iterate over entries in the list
          list.entries.forEach(entry => {
            const media = entry.media;
            const title = media.title.english;
            const coverImage = media.coverImage ? media.coverImage.large : null;

            // Determine the status and push to corresponding array
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
      }
    };

    fetchWatchlist();
  }, []);

  return (
    <div className="bg-main min-h-screen flex flex-col justify-center items-center antialiased p-4 md:p-8">
      <div className="max-w-2xl w-full px-4 py-24 space-y-6 flex-col">
        <div className="flex flex-col space-y-4">
          {watchlist.watching.length > 0 && <WatchlistCategory title="Watching" list={watchlist.watching} />}
          {watchlist.completed.length > 0 && <WatchlistCategory title="Completed" list={watchlist.completed} />}
          {watchlist.planned.length > 0 && <WatchlistCategory title="Plan To Watch" list={watchlist.planned} />}
        </div>
        <Head>
        <title>anime list | iinter.me</title>
        </Head>
        <Navbar />
      </div>
    </div>
  );
};

const WatchlistCategory = ({ title, list }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-stone-100 tracking-tighter">{title}</h2>
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
        {list.map(item => (
          <div key={item.id} className="relative">
            {item.coverImage && (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, delay: 1.0 }}
                transition={{ duration: 1.0 }}
                className="group relative"
              >
                <Image
                  src={item.coverImage}
                  alt={item.title}
                  width={200}
                  height={200}
                  priority={true}
                  className="rounded-md mb-2 opacity-100 transition-opacity duration-300 ease-in-out group-hover:opacity-30"
                />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 bg-black bg-opacity-50">
                  <span className="text-zinc-50 font-semibold px-3 text-center md:text-left">
                    {item.title}
                  </span>
                </span>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndexPage;