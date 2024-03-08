import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          <meta property="og:title" content="inter" />
          <meta property="og:image" content="https://inttter.com/assets/external-assets/og.png" />
          <meta property="og:site_name" content="iinter.me" />
          <meta property="og:url" content="iinter.me" />
          <meta property="og:type" content="website" />
          <meta property="og:description" content="games + cats + computers." />
          <meta name="theme-color" content="#0A0A0A" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument