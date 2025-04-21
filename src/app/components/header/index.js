'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { Header, DropdownContent, LoginButton } from './styles';

export default function HeaderWrapper({ openLoginModal, userName }) {
  const [isGmailDropdownVisible, setIsGmailDropdownVisible] = useState(false);
  const [isEmailsDropdownVisible, setIsEmailsDropdownVisible] = useState(false);
  const [isLogoutDropdownVisible, setLogoutDropdownVisible] = useState(false);

  // const { data: session } = useSession();

  // S'assurer que l'URL de base est définie pour la redirection
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/`;

  console.log('🔍 URL de redirection:', baseUrl);

  return (
    <Header>
      <h1>Automation Builder</h1>
      <nav>
        <Link href="/">Accueil</Link>
        <Link href="/agentBuilder">Automations</Link>
        <Link href="/agentInterface">Agent</Link>
        <Link href="/chatInterface">Models</Link>

        <div
          className="nav-item"
          onMouseEnter={() => setIsEmailsDropdownVisible(true)}
          onMouseLeave={() => setIsEmailsDropdownVisible(false)}
        >
          Apps
          <DropdownContent
            className={isEmailsDropdownVisible ? 'visible' : ''}
            style={{ left: '80%' }}
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
                style={{ left: '100%', top: '55%' }}
              >
                <Link href="/gmail/emails">Mes emails</Link>
                <Link href="/gmail/sendEmail">Envoyer un email</Link>
              </DropdownContent>
            </div>
          </DropdownContent>
        </div>
      </nav>

      <div
        className="user-nav-item"
        onMouseEnter={() => setLogoutDropdownVisible(true)}
        onMouseLeave={() => setLogoutDropdownVisible(false)}
      >
        <div
          style={{
            display: 'flex',
            fontSize: '12px',
            alignItems: 'center',
            color: isLogoutDropdownVisible ? 'black' : 'Moccasin',
          }}
        >
          {userName || 'User'}
        </div>
        <DropdownContent
          className={isLogoutDropdownVisible ? 'visible' : ''}
          style={{ left: '0' }}
        >
          <Link href="/userSettings">Settings</Link>
          <Link href="/api/auth/signout">Déconnexion</Link>
        </DropdownContent>
      </div>
    </Header>
  );
}
