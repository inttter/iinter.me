import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { post, isWritingIndexPage } = this.props.__NEXT_DATA__.props.pageProps;
    const isPostPage = !!post;

    const description = 'A racing game, computer and also cat lover.' // default
    const writingDescription = 'Writing about things that I find interesting or think about.' // writing

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          {isWritingIndexPage && (
            <>
              <meta property="og:title" content="Writing | Inter" />
              <meta property="og:description" content={writingDescription} />
              <meta property="og:image" content="https://iinter.me/external-assets/writing-index.png" />
              <meta property="og:url" content="https://iinter.me/writing" />
              <meta property="description" content={writingDescription} />
              <meta name="twitter:image" content="https://iinter.me/external-assets/writing-index.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:description" content={writingDescription} />
              <meta name="twitter:title" content="Writing | Inter" />
            </>
          )}
          {isPostPage && (
            <>
              <meta property="og:title" content={post.frontmatter.title} />
              <meta property="og:image" content="https://iinter.me/external-assets/writing-index.png" />
              <meta property="og:description" content={post.frontmatter.description} />
              <meta property="description" content={post.frontmatter.description} />
              <meta name="twitter:image" content="https://iinter.me/external-assets/writing-index.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:description" content={post.frontmatter.description} />
              <meta name="twitter:title" content={`${post.frontmatter.title} | Inter`} />
            </>
          )}
          {!isWritingIndexPage && !isPostPage && (
            <>
              <meta property="og:image" content="https://iinter.me/external-assets/og-card.png" />
              <meta property="og:description" content={description} />
              <meta property="og:title" content="Inter" />
              <meta property="description" content={description} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content="https://iinter.me/external-assets/og-card.png" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Inter" />
            </>
          )}
          
          {/* global tags for all pages */}
          <meta property="og:site_name" content="iinter.me" />
          <meta name="theme-color" content="#161617" />
          <html lang="en" />
  
          {/* favicons */}
          <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
          <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
          <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
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