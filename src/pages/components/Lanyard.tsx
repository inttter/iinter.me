import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function Username() {
  const [status, setStatus] = useState<string>('loading... 𖦹');
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

        const gameActivity = data.data.activities.find((activity: any) => activity.type === 0);
        const gameName = gameActivity ? gameActivity.name : '';

        const spotifyActivityData = data.data.spotify;

        let updatedStatus = '';

        if (gameActivity) {
          updatedStatus = `🎮 Playing ${gameName}`;
        } else if (spotifyActivityData) {
          setSpotifySong(spotifyActivityData.song);
          setSpotifyArtist(spotifyActivityData.artist);
          setSpotifyAlbum(spotifyActivityData.album);
          setSpotifyTime(spotifyActivityData.timestamps.end);
          updatedStatus = `🎧 ${spotifyActivityData.song} by ${spotifyActivityData.artist}`;
        }

        const statusMap: Record<string, string> = {
          online: '🟢 online',
          idle: '🟡 idle',
          dnd: '🔴 dnd',
          offline: '💤 offline'
        };

        setStatus(statusMap[discordStatus] + (updatedStatus ? ' • ' + updatedStatus : ''));
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
      <span className="text-ctp-green">inter</span>
      <p className="text-sm text-gray-500" onClick={handleStatusClick}>{status}</p>
    </>
  );
}

export default Username;