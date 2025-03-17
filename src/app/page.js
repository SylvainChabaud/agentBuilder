import Link from 'next/link';

const Home = () => {
  return (
    <>
      <h2 style={styles.title}>
        Bienvenue dans l'orchestrateur d'applications
      </h2>
      <section style={styles.container}>
        <p style={styles.subtitle}>
          Commencez à créer vos workflows d'applications.
        </p>
        <Link href="/agentBuilder" style={styles.button}>
          Aller à la page Agents
        </Link>
      </section>
      <section style={styles.container}>
        <p style={styles.subtitle}>Commencez à créer vos experts IA.</p>
        <Link href="/chatInterface" style={styles.button}>
          Aller à la page Models
        </Link>
      </section>
    </>
  );
};

export default Home;

// Styles inline (vous pouvez adapter les couleurs, marges, polices, etc.)
const styles = {
  container: {
    margin: '20px auto',
    width: '50vw',
    minHeight: '100%',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(to bottom right, #e2ecfe, #fff)',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666',
    maxWidth: '600px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  button: {
    backgroundColor: '#0070f3',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
    transition: 'background-color 0.2s ease-in-out',
  },
};
