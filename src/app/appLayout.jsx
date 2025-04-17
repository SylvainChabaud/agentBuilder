'use client';

import React, { useEffect, useState } from 'react';
import { getProviders, useSession } from 'next-auth/react';
import { Geist, Geist_Mono } from 'next/font/google';

import { GlobalStyle } from './styles/globals';
import { LayoutWrapper, Main } from './styles/layout';
import HeaderWrapper from './components/header';
// import FooterWrapper from './components/footer';
import LoginModal from './components/loginModal';
import WelcomeLanding from './components/welcomeLanding';

import '@xyflow/react/dist/style.css';
import AccountValidation from './components/accountValidation';
import { USER_PERMISSIONS } from './constants';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function AppLayout({ children }) {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const userName = session?.user.name;
  const userPermission = session?.user.permission;
  const isPermittedUser = userPermission === USER_PERMISSIONS.FREE;

  useEffect(() => {
    getProviders().then(setProviders);
  }, []);

  console.info('AppLayout', {
    session,
    providers,
    isLoginModalOpen,
    isPermittedUser,
    userPermission,
    userName,
  });

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <GlobalStyle />
      <LayoutWrapper>
        {!session ? (
          !isPermittedUser ? (
            <>
              <HeaderWrapper
                openLoginModal={openLoginModal}
                userName={userName}
              />
              <Main>{children}</Main>
              {/* <FooterWrapper /> */}
            </>
          ) : (
            <AccountValidation />
          )
        ) : (
          <WelcomeLanding onLoginClick={openLoginModal} />
        )}

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          providers={providers}
        />
      </LayoutWrapper>
    </div>
  );
}
