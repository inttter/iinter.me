import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>iinter.me</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {/* Your layout content here */}
      {children}
    </>
  );
}

export default Layout;