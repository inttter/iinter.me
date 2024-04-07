import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Lanyard({ showUsername = true, showEmoji = true, showAlbumArt = true }: { showUsername?: boolean, showEmoji?: boolean, showAlbumArt?: boolean }) {
  const [status, setStatus] = useState('✈️ Finding status...');
  const [emoji, setEmoji] = useState('');
  const [spotifySong, setSpotifySong] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState('');
  const [spotifyAlbum, setSpotifyAlbum] = useState('');
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
        let newEmoji = '';

        if (discordStatus === 'online') {
          newEmoji = '🟢';
        } else if (discordStatus === 'idle') {
          newEmoji = '🟡';
        } else if (discordStatus === 'dnd') {
          newEmoji = '🔴';
        } else if (discordStatus === 'offline') {
          newEmoji = '💤';
        }

        setEmoji(showEmoji ? newEmoji : '');

        const gameActivity = data.data.activities.find(activity => activity.type === 0);
        const gameName = gameActivity ? gameActivity.name : '';
        const gameStartTime = gameActivity ? gameActivity.timestamps.start : '';
        const gameDuration = gameActivity ? calculateDuration(gameStartTime) : '';

        const spotifyActivityData = data.data.spotify;

        let updatedStatus = '';

        if (gameActivity) {
          updatedStatus = `Playing ${gameName} for ${gameDuration}`;
        } else if (spotifyActivityData) {
          updatedStatus = `Listening to ${spotifyActivityData.song} by ${spotifyActivityData.artist}`;
          setSpotifySong(spotifyActivityData.song);
          setSpotifyArtist(spotifyActivityData.artist);
          setSpotifyAlbum(spotifyActivityData.album);
          setSpotifyAlbumArt(spotifyActivityData.album_art_url);
          setSpotifyTrackId(spotifyActivityData.track_id);
        }

        setStatus(updatedStatus);
      })
      .catch(error => {
        console.error('Error fetching Discord status:', error);
        setStatus('🤷‍♂️ Couldn\'t find a status');
      });
  }, [showEmoji]);

  const calculateDuration = (startTime: string) => {
    const start = new Date(startTime);
    const now = new Date();
    const duration = Math.floor((now.getTime() - start.getTime()) / 60000); // Convert milliseconds to minutes
    return `${duration} minutes`;
  };

  return (
    <>
      {showUsername && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="font-semibold text-zinc-100 justify-start tracking-tight grayscale"
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
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            src={spotifyAlbumArt}
            className="w-12 h-12 rounded-md focus:outline-none focus:caret-gray-400 border border-gray-800 focus:border-red-200 duration-300"
            alt="Album Art"
            style={{ marginRight: '8px' }}
          />
          {spotifyTrackId ? (
            <motion.a
              href={`https://open.spotify.com/track/${spotifyTrackId}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm tracking-normal text-gray-500 hover:text-gray-400 duration-300 justify-start overflow-elipsis"
            >
              {status}
            </motion.a>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm tracking-normal text-gray-500 justify-start overflow-elipsis"
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      )}
      {!showAlbumArt && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {spotifyTrackId ? (
            <motion.a
              href={`https://open.spotify.com/track/${spotifyTrackId}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm tracking-normal text-gray-500 hover:text-gray-400 duration-300 justify-start overflow-elipsis"
            >
              {status}
            </motion.a>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-sm tracking-normal text-gray-500 justify-start overflow-elipsis"
            >
              {status}
            </motion.p>
          )}
        </motion.div>
      )}
    </>
  );
}

export default Lanyard;