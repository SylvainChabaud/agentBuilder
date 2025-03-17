'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header, DropdownContent } from './styles';

export default function HeaderWrapper() {
  const [isGmailDropdownVisible, setIsGmailDropdownVisible] = useState(false);
  const [isEmailsDropdownVisible, setIsEmailsDropdownVisible] = useState(false);

  return (
    <Header>
      <h1>Automation Builder</h1>
      <nav>
        <Link href="/">Accueil</Link>
        <Link href="/agentBuilder">Automations</Link>
        <Link href="/chatInterface">Models</Link>
        {/* <Link href="/sheets">Sheets</Link> */}

        {/* Menu Gmail avec dropdown */}
        {/* <div
          className="nav-item"
          onMouseEnter={() => setIsGmailDropdownVisible(true)}
          onMouseLeave={() => setIsGmailDropdownVisible(false)}
        >
          Gmail
          <DropdownContent
            className={isGmailDropdownVisible ? 'visible' : ''}
            style={{ left: '75%' }}
          >
            <Link href="/gmail/emails">Mes emails</Link>
            <Link href="/gmail/sendEmail">Envoyer un email</Link>
          </DropdownContent>
        </div> */}

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

            <div
              className="nav-item"
              onMouseEnter={() => setIsGmailDropdownVisible(true)}
              onMouseLeave={() => setIsGmailDropdownVisible(false)}
            >
              Gmail
              <DropdownContent
                className={isGmailDropdownVisible ? 'visible' : ''}
                style={{ right: '0%', top: '40%' }}
              >
                <Link href="/gmail/emails">Mes emails</Link>
                <Link href="/gmail/sendEmail">Envoyer un email</Link>
              </DropdownContent>
            </div>
          </DropdownContent>
        </div>
      </nav>
    </Header>
  );
}
