import { AppProps } from 'next/app'
import '../styles/index.css'
import Head from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
      <Component {...pageProps} />
      </Head>
    </>
  );
}

export default MyApp;