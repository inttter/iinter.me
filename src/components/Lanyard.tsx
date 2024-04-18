import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify } from 'react-icons/fa6';
import Link from 'next/link';

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
        if (!response.ok) {
          throw new Error('Could not fetch from Lanyard.');
        }
        return response.json();
      })
      .then(data => {
        const discordStatus = data.data.discord_status;
        let statusDot: JSX.Element | null = null;

        if (discordStatus === 'online') {
          statusDot = <span className="h-4 w-4 rounded-full bg-green-500 inline-block"></span>;
        } else if (discordStatus === 'idle') {
          statusDot = <span className="h-4 w-4 rounded-full bg-amber-400 inline-block"></span>;
        } else if (discordStatus === 'dnd') {
          statusDot = <span className="h-4 w-4 rounded-full bg-red-500 inline-block"></span>;
        } else if (discordStatus === 'offline') {
          statusDot = <span className="h-4 w-4 rounded-full bg-gray-500 inline-block"></span>;
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
        console.error('Error fetching Discord status:', error);
        setStatus('🤷‍♂️ Couldn\'t find a status');
      });
  }, [showEmoji]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className={`relative ${showAlbumArt && spotifyAlbumArt ? 'md:w-11/12 w-full bg-opacity-5 bg-[#FAFAFA] border border-neutral-700 rounded-lg p-2 selection:bg-[#E8D4B6] selection:text-black' : ''}`}
    >
      {showUsername && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-semibold text-zinc-100 justify-start tracking-tight selection:bg-[#E8D4B6] selection:text-black"
        >
          Inter
        </motion.span>
      )}
      {emoji && showEmoji && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ fontSize: '0.3em', verticalAlign: 'middle', paddingLeft: '10px' }}
        >
          {emoji}
        </motion.span>
      )}
      {showAlbumArt && spotifyAlbumArt && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center' }}
          className="text-zinc-300"
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            src={spotifyAlbumArt}
            className="w-12 h-12 rounded-md duration-300"
            alt="Album Art"
            style={{ marginRight: '8px' }}
          />
          <div className="w-full">
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="border-neutral-600 hover:border-neutral-500 border-b-2 text-zinc-300 duration-300 animate-in fade-in mx-1 overflow-elipsis"
            >
              <Link href={`https://open.spotify.com/track/${spotifyTrackId}`} target="_blank" rel="noopener noreferrer">{spotifySong}</Link>
            </motion.a>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-xs tracking-normal text-neutral-500 justify-start overflow-elipsis px-1 mr-1"
            >
              {spotifyArtist}
            </motion.p>
          </div>
          <div className="mr-2 flex justify-end items-end space-x-1">
            <FaSpotify size={30} className="text-green-500" />
          </div>
        </motion.div>
      )}
      {!showAlbumArt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-sm tracking-normal text-neutral-500 justify-start overflow-elipsis"
          >
            {status}
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Lanyard;