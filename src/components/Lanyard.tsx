import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Lanyard({ showUsername = true, showEmoji = true, showAlbumArt = true }) {
  const [status, setStatus] = useState('Loading...');
  const [emoji, setEmoji] = useState('');
  const [spotifySong, setSpotifySong] = useState('');
  const [spotifyArtist, setSpotifyArtist] = useState('');
  const [spotifyAlbum, setSpotifyAlbum] = useState('');
  const [spotifyAlbumArt, setSpotifyAlbumArt] = useState('');
  const [spotifyTime, setSpotifyTime] = useState('');

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
          updatedStatus = `🎮 Playing ${gameName} for ${gameDuration}`;
        } else if (spotifyActivityData) {
          updatedStatus = `🎧 Listening to ${spotifyActivityData.song} by ${spotifyActivityData.artist}`;
          setSpotifySong(spotifyActivityData.song);
          setSpotifyArtist(spotifyActivityData.artist);
          setSpotifyAlbum(spotifyActivityData.album);
          setSpotifyAlbumArt(spotifyActivityData.album_art_url);
          setSpotifyTime(spotifyActivityData.timestamps.end);
        }

        setStatus(updatedStatus);
      })
      .catch(error => {
        console.error('Error fetching Discord status:', error);
        setStatus('🤷‍♂️ Couldn\'t find a status');
      });
  }, [showEmoji]);

  const calculateDuration = startTime => {
    const start = new Date(startTime);
    const now = new Date();
    const duration = Math.floor((now.getTime() - start.getTime()) / 60000); // Convert milliseconds to minutes
    return `${duration} minutes`;
  };

  const handleStatusClick = () => {
    if (status.includes('🎧')) {
      const endTime = new Date(spotifyTime);
      const now = new Date();
      const timeLeft = endTime.getTime() - now.getTime();
      const minutesLeft = Math.floor(timeLeft / 60000);
      const secondsLeft = Math.floor((timeLeft % 60000) / 1000);
      toast.info(`${spotifySong} by ${spotifyArtist}, on ${spotifyAlbum} - ${minutesLeft}min ${secondsLeft}s left`);
    }
  };

  return (
    <>
      {showUsername && (
        <span className="text-[#EBD2B6] font-semibold justify-start tracking-tight">Inter</span>
      )}
      {emoji && showEmoji && (
        <span style={{ fontSize: '0.3em', verticalAlign: 'middle', paddingLeft: '10px' }}>
          {emoji}
        </span>
      )}
      {showAlbumArt && spotifyAlbumArt && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={spotifyAlbumArt} className="w-12 h-12 rounded-md focus:outline-none focus:caret-gray-400 border border-gray-800 focus:border-red-200 duration-300" alt="Album Art" style={{ marginRight: '8px' }} />
          <p className="text-sm tracking-normal text-gray-500 justify-start overflow-elipsis">{status}</p>
        </div>
      )}
      {!showAlbumArt && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p className="text-sm tracking-normal text-gray-500 justify-start overflow-elipsis" onClick={handleStatusClick}>
            {status}
          </p>
        </div>
      )}
    </>
  )};

export default Lanyard;