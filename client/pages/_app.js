import 'bootstrap/dist/css/bootstrap.min.css';

import '../styles/styles.scss';

import '../styles/index.scss';
import '../styles/about.scss';
import '../styles/contact.scss';

import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>💓 Simple Next Study 💓</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/png" href="/simple-next-study.ssg.ts/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};
