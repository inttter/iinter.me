import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    const urlPath = ctx.asPath || ctx.req?.url || '';    
    const isPostPage = urlPath.startsWith('/writing/');
    const postSlug = isPostPage ? urlPath.split('/writing/')[1] : '';

    return { ...initialProps, isPostPage, postSlug, urlPath };
  }

  render() {
    const { isPostPage, postSlug, urlPath } = this.props;
    const post = this.props.__NEXT_DATA__.props.pageProps.post || {};

    const siteUrl = 'https://iinter.me';
    const defaultImage = `${siteUrl}/external/og.png`;
    const defaultDescription = `inter's personal site.`;

    const postTitle = post.frontmatter?.title || 'Post Title';
    const postDescription = post.frontmatter?.description || defaultDescription;
    const postImage = post.frontmatter?.image || defaultImage;

    const canonicalUrl = isPostPage
      ? `${siteUrl}/writing/${postSlug}`
      : `${siteUrl}${urlPath}`;
    const ogUrl = canonicalUrl;

    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
          <link rel="canonical" href={canonicalUrl} />
          {/* Post pages */}
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
          ) : (
            <>
              {/* Meta tags for non-post pages */}
              <meta property="og:url" content={ogUrl} />
              <meta property="og:title" content="iinter.me" />
              <meta property="og:image" content={defaultImage} />
              <meta property="og:description" content={defaultDescription} />
              <meta name="description" content={defaultDescription} />
              <meta name="twitter:image" content={defaultImage} />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:description" content={defaultDescription} />
              <meta name="twitter:title" content="Inter" />
            </>
          )}

          {/* Global meta tags */}
          <meta property="og:site_name" content="Inter" />
          <meta name="theme-color" content="#111110" />

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
