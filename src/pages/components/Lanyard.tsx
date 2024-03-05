import React, { useEffect, useState } from 'react';

function Username() {
  const [status, setStatus] = useState<string>('loading... 𖦹');

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

        const spotifyActivity = data.data.activities.find(activity => activity.name === 'Spotify');
        const spotifySong = spotifyActivity ? spotifyActivity.details : '';
        const spotifyArtist = spotifyActivity && spotifyActivity.state ? spotifyActivity.state : '';

        const gameActivity = data.data.activities.find(activity => activity.type === 0);
        const gameName = gameActivity ? gameActivity.name : '';

        const statusMap: Record<string, string> = {
          online: '🟢 online',
          idle: '🟡 idle',
          dnd: '🔴 dnd',
          offline: '💤 offline'
        };

        let updatedStatus = statusMap[discordStatus] || '🤷‍♂️ idk';

        if (spotifyActivity) {
          updatedStatus += ` • 🎧 ${spotifySong} by ${spotifyArtist}`;
        }

        if (gameActivity) {
          updatedStatus += ` • 🎮 Playing ${gameName}`;
        }

        setStatus(updatedStatus);
      })
      .catch(error => {
        console.error('Error fetching Discord status:', error);
        setStatus('🤷‍♂️ idk');
      });
  }, []);

  return (
    <>
      <span className="text-ctp-green">inter</span>
      <p className="text-sm text-gray-500">{status}</p>
    </>
  );
}

export default Username;

