import Image from 'next/image';
import { useState } from 'react';

export default function SocialLink({ href, src, alt, tooltipText }) {
  const [isHovered, setIsHovered] = useState(false);

  const isDiscord = href === 'https://discord.com/users/514106760299151372';

  return (
    <div 
      className="tooltip tooltip-bottom font-semibold relative group" 
      {...(!isDiscord && { 'data-tip': tooltipText })}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center">
          <Image src={src} alt={alt} width={34} height={0} className="mb-4 hover:scale-110 duration-150" />
          {isHovered && isDiscord && (
            <img 
              className="xl:group-hover:opacity-100 absolute top-10 left-8 z-10 transition-opacity max-w-none opacity-0 pointer-events-none" 
              src="https://lanyard.cnrad.dev/api/514106760299151372?hideDiscrim=true&hideStatus=true&hideProfile=true" 
              alt="Lanyard" 
            />
          )}
        </div>
      </a>
    </div>
  );
}