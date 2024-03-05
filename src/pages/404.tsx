import { useRouter } from 'next/router';
import Link from 'next/link';

export default function FourOhFour() {
  const router = useRouter();

  return (
    <div className="bg-neutral-900 min-h-screen flex flex-col justify-center items-center antialiased scroll-smooth">
      <div className="max-w-xl w-full px-4 py-8 space-y-6 text-center">
        <h1 className="text-7xl md:text-8xl font-bold tracking-wide text-ctp-pink opacity-90 selection:bg-white selection:text-black">404</h1>
        <p className="text-lg text-zinc-300">
          There's no page here, sorry! 
          You may have accessed a link that was invalid or deleted.
        </p>
        <br />
        <Link href="/" className="btn btn-outline btn-secondary rounded-lg" data-theme="cupcake">
          Go Back
        </Link>
      </div>
    </div>
  );
}