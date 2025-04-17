import Link from 'next/link';

export default function AccountValidation() {
  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '4rem 2rem',
        background: 'linear-gradient(to bottom, #f9f9f9, #e0f0ff)',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#111' }}>
        Votre email est en cours de validation 🚀
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          maxWidth: '600px',
          lineHeight: '1.6',
          marginBottom: '2rem',
          color: '#444',
        }}
      >
        Merci de vous être inscrit sur{' '}
        <span style={{ color: '#0070f3' }}>AgentBuilder</span> ! Votre compte
        sera activé sous 24 heures. Vous recevrez un email de confirmation dès
        que tout sera prêt. En attendant, préparez-vous à créer vos agents
        intelligents et automatiser vos processus !
      </p>

      {/* Bouton qui lance la déconnexion */}
      <Link href="/api/auth/signout">
        <button
          style={{
            backgroundColor: '#0070f3',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '14px 28px',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          Déconnexion
        </button>
      </Link>
    </main>
  );
}
