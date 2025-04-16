// WorkflowsList.jsx
const WorkflowsList = ({
  onSelectWorkflow,
  removeWorkflow,
  selectedWorkflowName,
  workflowsList = [],
}) => {
  console.info('workflowsList', workflowsList);

  // Si data est vide ou non défini, on affiche un message
  if (!workflowsList || workflowsList.length === 0) {
    return <div>Aucune donnée à afficher.</div>;
  }

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '400px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {workflowsList.map((workflow, id) => {
          // console.info('workflow', workflow);
          // Vérifie si ce workflow est le workflow sélectionné
          const isSelected = workflow.name === selectedWorkflowName;

          return (
            <div
              key={id}
              onClick={() => onSelectWorkflow(workflow)}
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: isSelected ? '#6593fa' : '#abc4fb', // Couleur différente si sélectionné
                padding: '6px 12px',
                fontSize: '14px',
                fontWeight: '600',
                color: '#ffffff',
                borderRadius: '9999px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
                position: 'relative',
                // Si sélectionné, on ajoute une petite border pour bien repérer
                border: isSelected ? '2px solid #E0E0E0' : 'none',
              }}
              onMouseEnter={(e) => {
                // On survole la puce
                e.currentTarget.style.backgroundColor = '#6593fa'; // Couleur plus sombre par défaut
              }}
              onMouseLeave={(e) => {
                // On quitte la puce
                e.currentTarget.style.backgroundColor = isSelected
                  ? '#6593fa' // Revient à la couleur "sélectionnée"
                  : '#abc4fb'; // Revient à la couleur "normale"
              }}
            >
              <span>{workflow.name}</span>

              <span
                onClick={(e) => {
                  e.stopPropagation(); // Empêche de déclencher `onSelectWorkflow`
                  removeWorkflow(workflow.id);
                }}
                style={{
                  marginLeft: '8px',
                  fontWeight: 'bold',
                  color: '#FF4D4D',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#FF0000')}
                onMouseLeave={(e) => (e.target.style.color = '#FF4D4D')}
              >
                ✖
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkflowsList;
