import { AppProps } from 'next/app';
import '../styles/index.css';
import Head from '../components/Layout';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/jetbrains-mono';
import '@fontsource/geist-mono';
import { Toaster } from 'sonner';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <div className="selection:bg-neutral-700 selection:text-zinc-300">
          <Component {...pageProps} />
        </div>
        <SpeedInsights />
        <Analytics />
        <Toaster invert />
      </Head>
    </>
  );
}

export default MyApp;