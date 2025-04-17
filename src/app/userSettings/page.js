'use client';

import React from 'react';
import UserSettings from 'src/app/components/userSettings';

const UserSettingsPage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Paramètres utilisateur</h1>
        <p style={styles.description}>
          Gérez vos préférences personnelles, sécurisez vos accès API.
        </p>
      </header>

      <main style={styles.card}>
        {/* Section API */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>🔐 Sécurité & Clé API</h2>
          <p style={styles.sectionText}>
            Votre clé API est <strong>chiffrée</strong> et stockée de manière
            privée sur nos serveurs. <br />
            Elle est uniquement utilisée lors de vos appels IA. Vous pouvez la
            modifier ou la supprimer à tout moment.
          </p>
          <UserSettings />
        </section>

        {/* Section Aide */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>❓ Besoin d’aide ?</h2>
          <p style={styles.sectionText}>
            Une question ou un doute sur la sécurité ou vos paramètres ? <br />
            N’hésitez pas à nous contacter, nous sommes là pour vous aider.
          </p>
        </section>
      </main>
    </div>
  );
};

export default UserSettingsPage;

// 🎨 STYLES INLINE
const styles = {
  container: {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
  },
  header: {
    borderBottom: '2px solid #eee',
    marginBottom: '30px',
    paddingBottom: '10px',
  },
  title: {
    fontSize: '32px',
    margin: '0 0 10px 0',
  },
  description: {
    fontSize: '15px',
    color: '#666',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    padding: '24px',
  },
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  sectionText: {
    fontSize: '14px',
    color: '#555',
    lineHeight: '1.6',
  },
};
