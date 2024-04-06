import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { post } = this.props.__NEXT_DATA__.props.pageProps;
    const isBlogPostPage = !!post;
    const isBlogIndexPage = this.props.__NEXT_DATA__.props.pageProps.isBlogIndexPage;

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          {/* Metadata for blog index page */}
          {isBlogIndexPage && (
            <>
              <meta property="og:description" content="inter's (mediocre) blog." />
              <meta property="og:url" content="https://iinter.me/blog" />
              <meta property="og:image" content="https://iinter.me/external-assets/blog-index.png" />
              <meta name="twitter:image" content="https://iinter.me/external-assets/blog-index.png" />
              <meta name="twitter:card" content="summary_large_image" />
            </>
          )}
          {/* Metadata for blog post page */}
          {isBlogPostPage && (
            <>
              <meta property="og:title" content={post.frontmatter.title} />
              <meta property="og:image" content={post.frontmatter.image} />
              <meta property="og:description" content={post.frontmatter.description} />
              <meta name="twitter:image" content={post.frontmatter.image} />
              <meta name="twitter:card" content="summary_large_image" />
            </>
          )}
          {/* Default metadata */}
          {!isBlogIndexPage && !isBlogPostPage && (
            <>
              <meta property="og:image" content="https://iinter.me/external-assets/og-card.png" />
              <meta name="twitter:image" content="https://iinter.me/external-assets/og-card.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta property="og:description" content="A racing game enthusiast, and also cat lover." />
            </>
          )}
          <meta property="og:title" content="inter" />
          <meta property="og:site_name" content="iinter.me" />
          <meta property="og:url" content="iinter.me" />
          <meta property="og:type" content="website" />
          <meta name="theme-color" content="#161617" />
          <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
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