import Image from 'next/image';
import Link from 'next/link';

export default function SocialLink({ href, src, alt, tooltipText }) {
  return (
    <div 
      className="tooltip tooltip-bottom font-semibold relative group" 
      data-tip={tooltipText}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center">
          <Image src={src} alt={alt} width={34} height={34} className="mb-4 hover:scale-110 duration-150" />
        </div>
      </Link>
    </div>
  );
}