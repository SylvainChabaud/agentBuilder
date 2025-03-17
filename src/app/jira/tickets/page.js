import JiraTickets from 'src/app/components/jira/tickets';

export default function JiraPage() {
  return (
    <div>
      <h1>Accueil</h1>
      <p>Bienvenue sur l’intégration Jira.</p>
      <JiraTickets />
    </div>
  );
}
