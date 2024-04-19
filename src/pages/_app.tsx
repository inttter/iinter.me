import { AppProps } from 'next/app'
import '../styles/index.css'
import Head from '../components/Layout';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import '@fontsource/geist-sans';
import '@fontsource/geist-sans/700.css';
import '@fontsource/geist-sans/600.css';
import '@fontsource/geist-mono';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
      </Head>
    </>
  );
}

export default MyApp;