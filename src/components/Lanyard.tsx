import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa6';
import Link from 'next/link';
import Image from 'next/image';
import consola from 'consola';

function Lanyard({ showUsername = true, showEmoji = true, showAlbumArt = true }: { showUsername?: boolean, showEmoji?: boolean, showAlbumArt?: boolean }) {
  const [status, setStatus] = useState('✈️ Finding status...');
  const [emoji, setEmoji] = useState<JSX.Element | null>(null);
  const [spotifySong, setSpotifySong] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState('');
  const [spotifyAlbumArt, setSpotifyAlbumArt] = useState('');
  const [spotifyTrackId, setSpotifyTrackId] = useState('');

  useEffect(() => {
    fetch('https://api.lanyard.rest/v1/users/514106760299151372')
      .then(response => {
        consola.success('%cSuccessfully retrieved data from Lanyard! ', 'color: #2ecc71');
        return response.json();
      })
      .then(data => {
        const discordStatus = data.data.discord_status;
        let statusDot: JSX.Element | null = null;

        if (discordStatus === 'online') {
          statusDot = <span className="h-4 w-4 rounded-full bg-green-500 inline-block tooltip tooltip-right tracking-tight" data-tip="Online" data-theme="lofi"></span>;
        } else if (discordStatus === 'idle') {
          statusDot = <span className="h-4 w-4 rounded-full bg-amber-400 inline-block tooltip tooltip-right tracking-tight" data-tip="Idle" data-theme="lofi"></span>;
        } else if (discordStatus === 'dnd') {
          statusDot = <span className="h-4 w-4 rounded-full bg-red-500 inline-block tooltip tooltip-top tracking-tight" data-tip="Do Not Disturb" data-theme="lofi"></span>;
        } else if (discordStatus === 'offline') {
          statusDot = <span className="h-4 w-4 rounded-full bg-gray-500 inline-block tooltip tooltip-top tracking-tight" data-tip="Offline" data-theme="lofi"></span>;
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
        }
      })
      .catch(error => {
        consola.error('An error occurred when trying to fetch a response from Lanyard:', error);
        setStatus('🤷‍♂️ No Status');
      });
  }, [showEmoji]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`relative ${showAlbumArt && spotifyAlbumArt ? 'md:w-11/12 w-full bg-opacity-5 bg-[#FAFAFA] border border-neutral-700 rounded-lg p-2' : ''}`}
    >
      {showUsername && (
        <span className="font-semibold text-zinc-100 justify-start tracking-tight animate-blurred-fade-in duration-1000">
          Inter
        </span>
      )}
      {emoji && showEmoji && (
        <span className="animate-blurred-fade-in duration-1000" style={{ fontSize: '0.3em', verticalAlign: 'middle', paddingLeft: '10px' }}>
          {emoji}
        </span>
      )}
      {showAlbumArt && spotifyAlbumArt && (
        <motion.div 
          className="flex items-center text-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Image src={spotifyAlbumArt} className="rounded-md animate-blurred-fade-in duration-750" width={50} height={50} alt="Album Art" style={{ marginRight: '8px' }} />
          <div className="w-full overflow-clip truncate">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Link href={`https://open.spotify.com/track/${spotifyTrackId}`} target="_blank" rel="noopener noreferrer" className="text-zinc-100 hover:text-zinc-300 animate-blurred-fade-in duration-100 border-b-2 border-dotted border-neutral-500 hover:border-neutral-300 mx-1">
                {spotifySong}
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="text-xs tracking-normal text-neutral-500 justify-start overflow-elipsis px-1 mr-1"
            >
              {spotifyArtist}
            </motion.p>
          </div>
          <div className="mr-2 flex justify-end items-center">
            <FaSpotify size={30} className="text-neutral-400 opacity-50" />
          </div>
        </motion.div>
      )}
      {!showAlbumArt && (
        <div className="flex items-center">
          <motion.p 
            className="text-sm tracking-normal text-neutral-500 justify-start overflow-elipsis animate-blurred-fade-in duration-1000"
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