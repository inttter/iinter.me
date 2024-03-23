import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { post } = this.props.__NEXT_DATA__.props.pageProps;
    const isBlogPostPage = !!post;

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          {isBlogPostPage && (
            <>
              <meta property="og:image" content={post.frontmatter.image} />
              <meta name="twitter:image" content={post.frontmatter.image} />
              <meta property="og:description" content={post.frontmatter.description} />
            </>
          )}
          {!isBlogPostPage && (
            <>
              <meta property="og:image" content="https://iinter.me/external-assets/og.png" />
              <meta name="twitter:image" content="https://iinter.me/external-assets/og.png" />
              <meta property="og:description" content="games + cats + computers." />
            </>
          )}
          <meta property="og:title" content="inter" />
          <meta property="og:site_name" content="iinter.me" />
          <meta property="og:url" content="iinter.me" />
          <meta property="og:type" content="website" />
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

export default MyDocument;