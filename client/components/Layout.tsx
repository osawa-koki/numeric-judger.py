import React, { ReactNode } from 'react';
import Head from 'next/head';
import Pages from './pages';

type Props = {
  children?: ReactNode
  title?: string
};

const default_title = '🐍 numeric-judger 🐍';

const Layout = ({ children, title = default_title }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Pages />
    </header>
      {children}
  </div>
);

export default Layout;
