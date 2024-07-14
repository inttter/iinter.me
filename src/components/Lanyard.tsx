import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import Image from 'next/image';
import consola from 'consola';

function Lanyard({ showUsername = true, showEmoji = true, showAlbumArt = true }) {
  const [status, setStatus] = useState('✈️ Finding status...');
  const [emoji, setEmoji] = useState(null);
  const [spotifySong, setSpotifySong] = useState(null);
  const [spotifyArtist, setSpotifyArtist] = useState(null);
  const [spotifyAlbumArt, setSpotifyAlbumArt] = useState('');
  const [spotifyTrackId, setSpotifyTrackId] = useState('');
  const [spotifyStart, setSpotifyStart] = useState(0);
  const [spotifyEnd, setSpotifyEnd] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [isSongPlaying, setIsSongPlaying] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const USER_ID = '514106760299151372';

  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`)
        .then(response => response.json())
        .then(data => {
          const discordStatus = data.data.discord_status;
          let statusDot = null;
          
          if (discordStatus === 'online') {
            statusDot = (
              <span className="h-4 w-4 rounded-full bg-green-500 absolute bottom-0 right-0 mb-1 mr-1 tooltip tooltip-top" data-tip="Online" data-theme="black"></span>
            );
          } else if (discordStatus === 'idle') {
            statusDot = (
              <span className="h-4 w-4 rounded-full bg-amber-400 absolute bottom-0 right-0 mb-1 mr-1 tooltip tooltip-top" data-tip="Idle" data-theme="black"></span>
            );
          } else if (discordStatus === 'dnd') {
            statusDot = (
              <span className="h-4 w-4 rounded-full bg-red-500 absolute bottom-0 right-0 mb-1 mr-1 tooltip tooltip-top" data-tip="Do Not Disturb" data-theme="black"></span>
            );
          } else if (discordStatus === 'offline') {
            statusDot = (
              <span className="h-4 w-4 rounded-full bg-gray-500 absolute bottom-0 right-0 mb-1 mr-1 tooltip tooltip-top" data-tip="Offline" data-theme="black"></span>
            );
          }

          setEmoji(showEmoji ? statusDot : null);

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
            setSpotifyStart(data.data.spotify.timestamps.start);
            setSpotifyEnd(data.data.spotify.timestamps.end);
            setIsSongPlaying(true);
          } else {
            // if no Spotify data, reset states to initial values
            setSpotifySong(null);
            setSpotifyArtist(null);
            setSpotifyAlbumArt('');
            setSpotifyTrackId('');
            setSpotifyStart(0);
            setSpotifyEnd(0);
            setIsSongPlaying(false);
          }

          if (data.data.discord_user.avatar && data.data.discord_user.avatar.startsWith('a_')) {
            // for animated avatars, use 'gif'
            setProfilePicture(`https://api.lanyard.rest/${USER_ID}.gif`);
          } else {
            // for static avatars, use 'png'
            setProfilePicture(`https://api.lanyard.rest/${USER_ID}.png`);
          }
        })
        .catch(error => {
          consola.error('An error occurred when trying to fetch a response from Lanyard:', error);
          setStatus('🤷‍♂️ Unknown Status');
        });
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
      setIsSongPlaying(false);
    };
  }, [showEmoji, showAlbumArt]);

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(Date.now());
    };

    const interval = setInterval(updateCurrentTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTimestamp = (timestamp) => {
    const minutes = Math.floor(timestamp / 60000);
    const seconds = Math.floor((timestamp % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    if (!isSongPlaying || spotifyEnd === 0 || spotifyEnd <= spotifyStart) {
      return 0;
    }

    const current = Math.min(Date.now(), spotifyEnd);
    const progress = ((current - spotifyStart) / (spotifyEnd - spotifyStart)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const elapsed = Math.min(currentTime - spotifyStart, spotifyEnd - spotifyStart);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`relative ${showAlbumArt && spotifyAlbumArt ? 'md:w-11/12 w-full rounded-xl px-1' : ''}`}
    >
      <div className="flex items-center">
        {showUsername && (
          <div className="flex items-center relative">
            {profilePicture && !showAlbumArt && (
              <div className="relative">
                <Image
                  src={profilePicture}
                  alt="Profile Picture"
                  width={64}
                  height={64}
                  className="rounded-lg border-2 border-neutral-600 mr-2"
                />
                {emoji && showEmoji && (
                  <div className="absolute -bottom-1.5 right-0">
                    {emoji}
                  </div>
                )}
              </div>
            )}
            <span className="font-semibold text-stone-300 tracking-tight animate-blurred-fade-in duration-1000">
              Inter
            </span>
          </div>
        )}
      </div>
      {showAlbumArt && spotifyAlbumArt && spotifySong && spotifyArtist && (
        <div className="group">
          <Link href={`https://open.spotify.com/track/${spotifyTrackId}`} target="_blank" rel="noopener noreferrer">
            <motion.div
              className="flex items-center hover:bg-neutral-900 border border-transparent hover:border-neutral-700 transform px-2 py-2 -mt-2 rounded-xl transition duration-300 -mx-2.5 md:-mx-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Image src={spotifyAlbumArt} className="rounded-md animate-blurred-fade-in duration-750" width={70} height={70} alt="Album Art" style={{ marginRight: '8px' }} />
              <div className="w-[240px] md:w-[460px]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="truncate"
                >
                  <div className="text-lg text-stone-300 tracking-tight animate-blurred-fade-in duration-300 mx-1 truncate">
                    {spotifySong}
                  </div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.2 }}
                  className="text-sm tracking-normal text-stone-500 justify-start truncate px-1 mr-1 flex items-center"
                >
                  by <span className="font-semibold ml-1">{spotifyArtist}</span> <FaSpotify className="ml-1" />
                </motion.p>
                {/* progress bar hidden on mobile because current timestamp always becomes end timestamp?? */}
                <div className="hidden items-center justify-between mt-1 ml-1 md:flex">
                  <span className="text-sm text-stone-500">{formatTimestamp(elapsed)}</span>
                  <div className="relative w-full mx-2 h-2 bg-neutral-800 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 0.5, ease: 'linear' }}
                      className="absolute h-full bg-stone-500 rounded-full"
                    />
                  </div>
                  <span className="text-sm text-stone-500">{formatTimestamp(spotifyEnd - spotifyStart)}</span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      )}
      {!showAlbumArt && (
        <div className="flex items-center">
          <motion.p
            className="text-base tracking-normal text-neutral-600 justify-start overflow-ellipsis animate-blurred-fade-in duration-1000 truncate mt-2 -mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {status}
          </motion.p>
        </div>
      )}
    </motion.div>
  );
}

export default Lanyard;