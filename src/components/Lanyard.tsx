import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Username() {
  const [status, setStatus] = useState<string>('loading... ߷');
  const [emoji, setEmoji] = useState<string>('');
  const [spotifySong, setSpotifySong] = useState<string>('');
  const [spotifyArtist, setSpotifyArtist] = useState<string>('');
  const [spotifyAlbum, setSpotifyAlbum] = useState<string>('');
  const [spotifyTime, setSpotifyTime] = useState<string>('');

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

        setEmoji(newEmoji);

        const gameActivity = data.data.activities.find((activity: any) => activity.type === 0);
        const gameName = gameActivity ? gameActivity.name : '';

        const spotifyActivityData = data.data.spotify;

        let updatedStatus = '';

        if (gameActivity) {
          updatedStatus = `🎮 Playing ${gameName}`;
        } else if (spotifyActivityData) {
          updatedStatus = `🎧 Listening to ${spotifyActivityData.song} by ${spotifyActivityData.artist}`;
          setSpotifySong(spotifyActivityData.song);
          setSpotifyArtist(spotifyActivityData.artist);
          setSpotifyAlbum(spotifyActivityData.album);
          setSpotifyTime(spotifyActivityData.timestamps.end);
        }

        setStatus(updatedStatus);
      })
      .catch(error => {
        console.error('Error fetching Discord status:', error);
        setStatus('🤷‍♂️ idk');
      });
  }, []);

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
      <span className="text-zinc-300 font-semibold justify-start tracking-tight">Inter</span>
      {emoji && (
        <span style={{ fontSize: '0.3em', verticalAlign: 'middle', paddingLeft: '10px' }}>
          {emoji}
        </span>
      )}
      <p className="text-sm tracking-normal text-gray-500 justify-start overflow-elipsis" onClick={handleStatusClick}>{status}</p>
    </>
  );
}

export default Username;