import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import consola from 'consola';
import { FaSpotify } from 'react-icons/fa';
import { ArrowDown } from 'lucide-react';

function Lanyard({ showUsername = true, showStatusDot = true, showAlbumArt = true }) {
  const [status, setStatus] = useState('Finding status...');
  const [statusDot, setStatusDot] = useState(null);
  const [spotifySong, setSpotifySong] = useState(null);
  const [spotifyArtist, setSpotifyArtist] = useState(null);
  const [spotifyAlbumArt, setSpotifyAlbumArt] = useState('');
  const [spotifyTrackId, setSpotifyTrackId] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const USER_ID = '514106760299151372';

  useEffect(() => {
    const avatarUrl = 'https://github.com/inttter.png';
    setProfilePicture(avatarUrl);

  }, [USER_ID]);

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
        .then(response => response.json())
        .then(data => {
          const discordStatus = data.data.discord_status;
          let statusDot = null;
          
          if (discordStatus === 'online') {
            statusDot = (
              <span 
                className="h-4 w-4 rounded-full bg-green-500 absolute bottom-0 right-0 mb-1 mr-1 border border-neutral-800 tooltip tooltip-top" 
                data-tip="Online"
                data-theme="black"
              >
              </span>
            );
          } else if (discordStatus === 'idle') {
            statusDot = (
              <span 
                className="h-4 w-4 rounded-full bg-amber-400 absolute bottom-0 right-0 mb-1 mr-1 border border-neutral-800 tooltip tooltip-top" 
                data-tip="Idle" 
                data-theme="black"
              >
              </span>
            );
          } else if (discordStatus === 'dnd') {
            statusDot = (
              <span 
                className="h-4 w-4 rounded-full bg-red-500 absolute bottom-0 right-0 mb-1 mr-1 border border-neutral-800 tooltip tooltip-top" 
                data-tip="Do Not Disturb" 
                data-theme="black"
              >
              </span>
            );
          } else if (discordStatus === 'offline') {
            statusDot = (
              <span 
                className="h-4 w-4 rounded-full bg-gray-500 absolute bottom-0 right-0 mb-1 mr-1 border border-neutral-800 tooltip tooltip-top" 
                data-tip="Offline" 
                data-theme="black"
              >
              </span>
            );
          }

          setStatusDot(showStatusDot ? statusDot : null);

          const gameActivity = data.data.activities.find(activity => activity.type === 0);
          const gameName = gameActivity ? gameActivity.name : '';

          setStatus(gameName ? `Playing ${gameName}` : '');

          if (data.data.spotify) {
            setSpotifySong(data.data.spotify.song);
            setSpotifyArtist(data.data.spotify.artist);
            if (showAlbumArt && data.data.spotify.album_art_url) {
              setSpotifyAlbumArt(data.data.spotify.album_art_url);
            } else {
              setSpotifyAlbumArt('');
            }
            setSpotifyTrackId(data.data.spotify.track_id);
          } else {
            // If there is no Spotify data, reset states to initial values
            setSpotifySong(null);
            setSpotifyArtist(null);
            setSpotifyAlbumArt('');
            setSpotifyTrackId('');
          }
        })
        .catch(error => {
          consola.error('An error occurred when trying to fetch a response from Lanyard:', error);
          setStatus('Unknown Status');
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 15000);

    return () => {
      clearInterval(interval);
    };
  }, [showStatusDot, showAlbumArt]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`relative ${showAlbumArt && spotifyAlbumArt ? 'md:w-11/12 w-full rounded-xl px-1' : ''}`}
    >
      <div className="flex items-center space-x-3">
        {profilePicture && !showAlbumArt && (
          <div className="relative">
            <Image
              src={profilePicture}
              alt="Profile Picture"
              width={70}
              height={70}
              className="rounded-full border border-neutral-800"
            />
            {/* For Christmas:
            <Image
              src="https://us-east-1.tixte.net/uploads/files.iinter.me/christmas-hat.png"
              alt="Christmas Hat"
              width={60}
              height={60}
              className="absolute -top-3 -right-3"
            />
            */}
            {statusDot && showStatusDot && (
              <div className="absolute -bottom-0.5 -right-1">
                {statusDot}
              </div>
            )}
          </div>
        )}
        <div className="flex flex-col justify-center">
          {showUsername && (
            <span className="font-medium text-5xl text-stone-300 animate-blurred-fade-in duration-1000">
              Inter
            </span>
          )}
          {!showAlbumArt && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-sm text-stone-400/90 overflow-ellipsis animate-blurred-fade-in duration-1000 truncate -mt-0.5"
            >
              {status}
            </motion.div>
          )}
        </div>
      </div>
      {showAlbumArt && spotifyAlbumArt && spotifySong && spotifyArtist && (
        <div>
          <div className="mt-3 flex items-center text-sm text-stone-400 animate-blurred-fade-in duration-700">
            <span className="flex items-center">
              <FaSpotify className="mr-1 text-green-500" /> 
              Currently listening
              <ArrowDown size={15} className="ml-0.5" />
            </span>
          </div>
          <div className="group mt-4">
            <div className="flex items-center px-2 py-2 -mt-2 rounded-lg transition duration-300 ease-in-out -mx-2.5 md:-mx-2">
              <Image
                src={spotifyAlbumArt}
                alt="Album Cover"
                width={70}
                height={70}
                className="rounded-md border border-neutral-800 animate-blurred-fade-in duration-1000"
              />
              <div className="w-[240px] md:w-[460px] ml-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="truncate"
                >
                  <Link 
                    href={`https://open.spotify.com/track/${spotifyTrackId}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <div className="inline-flex text-lg font-medium text-stone-300 hover:text-stone-400 duration-300 border-b border-neutral-700 leading-tight mx-1 truncate">
                      {spotifySong}
                    </div>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-md md:text-sm tracking-normal text-stone-400/90 justify-start truncate px-1 flex items-center"
                >
                  <span className="truncate">
                    {spotifyArtist}
                  </span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Lanyard;