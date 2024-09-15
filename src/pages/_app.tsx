import { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from 'sonner';
import Head from '../components/Layout';
import '../styles/index.css';
import '../styles/github-alerts.css';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/jetbrains-mono';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <div className="selection:bg-neutral-700 selection:text-zinc-300">
          <Component {...pageProps} />
          <div className="fixed inset-x-0 top-0 h-16 pointer-events-none">
            <div
              className="w-full h-full backdrop-blur-lg"
              style={{
                maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%),',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)'
              }}
            />
          </div>
        </div>
        <Analytics />
        <Toaster richColors closeButton theme="dark" />
      </Head>
    </>
  );
}

export default MyApp;