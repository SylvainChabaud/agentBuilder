'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Header, DropdownContent, LoginButton } from './styles';

export default function HeaderWrapper({ openLoginModal }) {
  const [isGmailDropdownVisible, setIsGmailDropdownVisible] = useState(false);
  const [isEmailsDropdownVisible, setIsEmailsDropdownVisible] = useState(false);

  const { data: session } = useSession();

  // S'assurer que l'URL de base est définie pour la redirection
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

  console.log('🔍 URL de redirection:', baseUrl);

  return (
    <Header>
      <h1>Automation Builder</h1>
      <nav>
        <Link href="/">Accueil</Link>
        <Link href="/agentBuilder">Automations</Link>
        <Link href="/chatInterface">Models</Link>

        <div
          className="nav-item"
          onMouseEnter={() => setIsEmailsDropdownVisible(true)}
          onMouseLeave={() => setIsEmailsDropdownVisible(false)}
        >
          Apps
          <DropdownContent
            className={isEmailsDropdownVisible ? 'visible' : ''}
            style={{ left: '75%' }}
          >
            <Link href="/sheets">Sheets</Link>
            <Link href="/webSearch">WebSearch</Link>

            <div
              className="nav-item"
              onMouseEnter={() => setIsGmailDropdownVisible(true)}
              onMouseLeave={() => setIsGmailDropdownVisible(false)}
            >
              Gmail
              <DropdownContent
                className={isGmailDropdownVisible ? 'visible' : ''}
                style={{ right: '0%', top: '50%' }}
              >
                <Link href="/gmail/emails">Mes emails</Link>
                <Link href="/gmail/sendEmail">Envoyer un email</Link>
              </DropdownContent>
            </div>
          </DropdownContent>
        </div>

        {session ? (
          <Link href="/api/auth/signout">Déconnexion</Link>
        ) : (
          <LoginButton onClick={openLoginModal}>Connexion</LoginButton>
        )}
      </nav>
    </Header>
  );
}
