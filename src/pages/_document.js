import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const urlPath = ctx.req ? ctx.req.url : '';
    const isPostPage = urlPath && urlPath.startsWith('/writing/');
    const postSlug = isPostPage ? urlPath.split('/writing/')[1] : '';

    return { ...initialProps, isPostPage, postSlug };
  }

  render() {
    const { isPostPage, postSlug } = this.props;
    const post = this.props.__NEXT_DATA__.props.pageProps.post || {};

    const description = 'A racing game, computer and also cat lover.';
    const writingDescription = 'Writing about things that I find interesting or think about.';
    const siteUrl = 'https://iinter.me';
    const defaultImage = `${siteUrl}/external-assets/og-card.png`;

    const postTitle = post.frontmatter?.title || 'Post Title';
    const postDescription = post.frontmatter?.description || 'Post Description';
    const postImage = post.frontmatter?.image || defaultImage;

    const canonicalUrl = isPostPage ? `${siteUrl}/writing/${postSlug}` : `${siteUrl}${this.props.__NEXT_DATA__.props.pageProps.path || ''}`;
    const ogUrl = isPostPage ? canonicalUrl : `${siteUrl}${this.props.__NEXT_DATA__.props.pageProps.path || ''}`;

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          <link rel="canonical" href={canonicalUrl} />
          {isPostPage ? (
            <>
              <meta property="og:url" content={ogUrl} />
              <meta property="og:title" content={postTitle} />
              <meta property="og:image" content={postImage} />
              <meta property="og:description" content={postDescription} />
              <meta name="description" content={postDescription} />
              <meta name="twitter:image" content={postImage} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:description" content={postDescription} />
              <meta name="twitter:title" content={`${postTitle} | Inter`} />
            </>
          ) : this.props.__NEXT_DATA__.props.pageProps.isWritingIndexPage ? (
            <>
              <meta property="og:title" content="Writing | Inter" />
              <meta property="og:description" content={writingDescription} />
              <meta property="og:image" content={`${siteUrl}/external-assets/writing-index.png`} />
              <meta property="og:url" content={`${siteUrl}/writing`} />
              <meta name="description" content={writingDescription} />
              <meta name="twitter:image" content={`${siteUrl}/external-assets/writing-index.png`} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:description" content={writingDescription} />
              <meta name="twitter:title" content="Writing | Inter" />
            </>
          ) : (
            <>
              <meta property="og:image" content={defaultImage} />
              <meta property="og:description" content={description} />
              <meta property="og:title" content="Inter" />
              <meta name="description" content={description} />
              <meta name="twitter:description" content={description} />
              <meta name="twitter:image" content={defaultImage} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="Inter" />
            </>
          )}
          
          {/* Global tags for all pages */}
          <meta property="og:site_name" content="Inter" />
          <meta name="theme-color" content="#161617" />
          <html lang="en" />
  
          {/* Favicons */}
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