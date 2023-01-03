import React, { ReactNode } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import setting from '../setting';
import Pages from './pages';

type Props = {
  children?: ReactNode
  title?: string
};

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="shortcut icon" href={`${setting.basePath}favicon.ico`} type="image/x-icon" />
    </Head>
    <header>
      <Pages />
    </header>
      {children}
  </div>
);

export default Layout;
