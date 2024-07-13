import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaSpotify } from 'react-icons/fa';
import Image from 'next/image';
import consola from 'consola';

function Lanyard({ showUsername = true, showEmoji = true, showAlbumArt = true }) {
  const [status, setStatus] = useState('✈️ Finding status...');
  const [emoji, setEmoji] = useState(null);
  const [spotifySong, setSpotifySong] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState('');
  const [spotifyAlbumArt, setSpotifyAlbumArt] = useState('');
  const [spotifyTrackId, setSpotifyTrackId] = useState('');
  const [spotifyStart, setSpotifyStart] = useState(0);
  const [spotifyEnd, setSpotifyEnd] = useState(0);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/514106760299151372')
      .then(response => {
        consola.success('%cSuccessfully retrieved data from Lanyard!', 'color: #2ecc71');
        return response.json();
      })
      .then(data => {
        const discordStatus = data.data.discord_status;
        let statusDot = null;

        if (discordStatus === 'online') {
          statusDot = (
            <span className="h-4 w-4 rounded-full bg-green-500 inline-block md:mt-0 mt-5 mx-2 tooltip tooltip-right" data-tip="Online" data-theme="black"></span>
          );
        } else if (discordStatus === 'idle') {
          statusDot = (
            <span className="h-4 w-4 rounded-full bg-amber-400 inline-block md:mt-0 mt-5 mx-2 tooltip tooltip-right" data-tip="Idle" data-theme="black"></span>
          );
        } else if (discordStatus === 'dnd') {
          statusDot = (
            <span className="h-4 w-4 rounded-full bg-red-500 inline-block md:mt-0 mt-5 mx-2 tooltip tooltip-right" data-tip="Do Not Disturb" data-theme="black"></span>
          );
        } else if (discordStatus === 'offline') {
          statusDot = (
            <span className="h-4 w-4 rounded-full bg-gray-500 inline-block md:mt-0 mt-5 mx-2 tooltip tooltip-right" data-tip="Offline" data-theme="black"></span>
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
          setCurrentTime(Date.now());
        }
      })
      .catch(error => {
        consola.error('An error occurred when trying to fetch a response from Lanyard:', error);
        setStatus('🤷‍♂️ No Status');
      });

    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [showEmoji]);

  const formatTimestamp = (timestamp) => {
    const minutes = Math.floor(timestamp / 60000);
    const seconds = Math.floor((timestamp % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const calculateProgress = () => {
    const progress = ((currentTime - spotifyStart) / (spotifyEnd - spotifyStart)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  const currentTimestamp = Math.min(currentTime, spotifyEnd);
  const elapsed = currentTimestamp - spotifyStart;

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`relative ${showAlbumArt && spotifyAlbumArt ? 'md:w-11/12 w-full rounded-xl px-1' : ''}`}
    >
      {showUsername && (
        <span className="font-semibold text-stone-300 tracking-tight animate-blurred-fade-in duration-1000">
          Inter
        </span>
      )}
      {emoji && showEmoji && (
        <span className="animate-blurred-fade-in duration-1000" style={{ fontSize: '0.3em', verticalAlign: 'middle' }}>
          {emoji}
        </span>
      )}
      {showAlbumArt && spotifyAlbumArt && (
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
                <div className="flex items-center justify-between mt-1 ml-1">
                  <span className="text-sm text-stone-500">{formatTimestamp(elapsed)}</span>
                  <div className="relative w-full mx-2 h-2 bg-neutral-800 rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${calculateProgress()}%` }}
                      transition={{ duration: 1, ease: 'linear' }}
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
            className="text-sm tracking-normal text-neutral-600 justify-start overflow-ellipsis animate-blurred-fade-in duration-1000 truncate"
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