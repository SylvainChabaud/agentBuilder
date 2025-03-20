'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

const mockEmails = [
  {
    type: 'PUB',
    emails: [
      { summary: 'Promo -50% chez Amazon' },
      { summary: 'Offre spéciale abonnement à Netflix' },
      { summary: 'Remise exceptionnelle sur les smartphones' },
    ],
  },
  {
    type: 'PRO',
    emails: [
      { summary: "Réunion d'équipe lundi à 10h" },
      { summary: 'Compte-rendu de la dernière réunion' },
    ],
  },
  {
    type: 'PERSO',
    emails: [
      { summary: "Invitation à l'anniversaire de Sophie" },
      { summary: 'Photos du dernier voyage en Italie' },
    ],
  },
  {
    type: 'RESEAU',
    emails: [{ summary: 'Nouvelle connexion sur LinkedIn' }],
  },
];

const CARD_WIDTH = 350;
const CARD_HEIGHT = 250;
const MARGIN = 20;

const generateNonOverlappingPositions = (
  count,
  containerWidth,
  containerHeight
) => {
  const positions = [];
  const maxAttempts = 500;

  const isOverlapping = (newPos, existingPos) => {
    return (
      newPos.x < existingPos.x + CARD_WIDTH + MARGIN &&
      newPos.x + CARD_WIDTH + MARGIN > existingPos.x &&
      newPos.y < existingPos.y + CARD_HEIGHT + MARGIN &&
      newPos.y + CARD_HEIGHT + MARGIN > existingPos.y
    );
  };

  for (let i = 0; i < count; i++) {
    let newPosition;
    let attempts = 0;
    let hasCollision;

    do {
      newPosition = {
        x: Math.random() * (containerWidth - CARD_WIDTH),
        y: Math.random() * (containerHeight - CARD_HEIGHT),
      };

      hasCollision = positions.some((pos) => isOverlapping(newPosition, pos));
      attempts++;
    } while (hasCollision && attempts < maxAttempts);

    positions.push(newPosition);
  }

  return positions;
};

export default function EmailsDisplay() {
  // const stored = sessionStorage.getItem('emailsVision');
  // const jsonEmailsData = JSON.parse(stored);

  const [emailData, setEmailData] = useState(null);
  const [positions, setPositions] = useState([]);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  console.info('EmailsDisplay 1', emailData);

  useEffect(() => {
    const updatePositions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
        setPositions(
          generateNonOverlappingPositions(emailData?.length, width, height)
        );
      }
    };

    updatePositions();

    if (typeof window !== 'undefined' && emailData === null) {
      const stored = sessionStorage.getItem('emailsVision');
      const jsonEmailsData = stored ? JSON.parse(stored) : [];
      console.info('EmailsDisplay', jsonEmailsData);
      setEmailData(jsonEmailsData);
    }

    window.addEventListener('resize', updatePositions);
    return () => {
      window.removeEventListener('resize', updatePositions);
      sessionStorage.removeItem('emailsData');
    };
  }, [emailData?.length]);

  const removeEmail = (type, index) => {
    setEmailData((prev) =>
      prev
        .map((group) =>
          group.type === type
            ? { ...group, emails: group.emails.filter((_, i) => i !== index) }
            : group
        )
        .filter((group) => group.emails.length > 0)
    );
  };

  const removeGroup = (type) => {
    setEmailData((prev) => prev.filter((group) => group.type !== type));
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '80vw',
        height: '60vh',
        margin: '5vh auto',
        background: '#f9f9f9',
        borderRadius: '20px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        padding: 10,
      }}
    >
      Emails Vision
      <AnimatePresence>
        {emailData?.map((group, index) => {
          const pos = positions[index];
          if (!pos) return null;

          return (
            <motion.div
              key={group.type}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: pos.x,
                y: pos.y,
              }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 120 }}
              drag
              dragConstraints={{
                top: 0,
                left: 0,
                right: containerSize.width - CARD_WIDTH,
                bottom: containerSize.height - CARD_HEIGHT,
              }}
              whileHover={{ scale: 1.05, zIndex: 1 }}
              whileDrag={{ scale: 1.1, zIndex: 2 }}
              style={{
                position: 'absolute',
                background: '#fbead1',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
                width: `${CARD_WIDTH}px`,
                // height: `${CARD_HEIGHT}px`,
                cursor: 'grab',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px',
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    color: '#333',
                    fontSize: '1.2rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                  }}
                >
                  {group.type}
                </h3>
                <motion.button
                  onClick={() => removeGroup(group.type)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    background: '#b5cafa',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '100',
                  }}
                >
                  × Tout supprimer
                </motion.button>
              </div>

              <div
                style={{
                  height: 'calc(100% - 40px)',
                  overflowY: 'auto',
                  paddingRight: '5px',
                }}
              >
                <AnimatePresence>
                  {group.emails.map((email, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      whileHover={{
                        scale: 1.02,
                        boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
                      }}
                      style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '12px',
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                      }}
                    >
                      <span
                        style={{
                          color: '#555',
                          fontSize: '0.95rem',
                          lineHeight: '1.4',
                          paddingRight: '10px',
                        }}
                      >
                        {email.resume}
                      </span>
                      <motion.button
                        onClick={() => removeEmail(group.type, idx)}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.8 }}
                        style={{
                          background: '#b5cafa',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '28px',
                          height: '28px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          flexShrink: 0,
                        }}
                      >
                        ×
                      </motion.button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
