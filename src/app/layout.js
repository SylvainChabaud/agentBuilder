'use client';

import React from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import { GlobalStyle } from './styles/globals';
import { LayoutWrapper, Main, Footer } from './styles/layout';
import HeaderWrapper from './components/header';
import FooterWrapper from './components/footer';

// default styling
import '@xyflow/react/dist/style.css';
import AppLayout from './appLayout';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
