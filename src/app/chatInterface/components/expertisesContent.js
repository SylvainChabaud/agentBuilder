import { useEffect, useState } from 'react';

const ExpertisesContent = ({ expertises, onChangeExpertise }) => {
  // État local pour gérer la liste des experts
  const [localExpertises, setLocalExpertises] = useState(expertises);

  useEffect(() => {
    console.info('expertises', expertises);
    setLocalExpertises(expertises);
  }, [expertises]);

  // Fonction pour supprimer un expert
  const handleRemoveExpert = (expertId) => {
    const isConfirmed = confirm(
      'êtes-vous sûr de vouloir suppprimer cette expertise ?'
    );

    if (isConfirmed) {
      const filteredExpertises = localExpertises.filter(
        (exp) => exp.id !== expertId
      );
      setLocalExpertises(filteredExpertises);
      onChangeExpertise(expertId, true);
    }
  };

  if (!localExpertises || localExpertises.length === 0) {
    return (
      <p style={{ color: '#6B7280', fontSize: '14px' }}>
        Aucun expert disponible.
      </p>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '20px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        maxWidth: '800px',
        border: '1px solid #ddd',
        marginTop: '20px',
      }}
    >
      {localExpertises
        .filter((expert) => expert.name) // Filtrer les expertises valides
        .map((expert) => (
          <div
            key={expert.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '6px 12px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#ffffff',
              backgroundColor: '#3B82F6',
              borderRadius: '9999px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563EB')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#3B82F6')}
          >
            <span onClick={() => onChangeExpertise(expert)}>{expert.name}</span>

            {/* Bouton de suppression */}
            <span
              onClick={(e) => {
                e.stopPropagation(); // Empêche le clic de déclencher l'événement parent
                handleRemoveExpert(expert.id);
              }}
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                width: '18px',
                height: '18px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '12px',
                fontWeight: 'bold',
                // backgroundColor: 'red',
                color: 'white',
                borderRadius: '50%',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease-in-out',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              }}
              //   onMouseEnter={(e) => (e.target.style.backgroundColor = '#b91c1c')}
              //   onMouseLeave={(e) => (e.target.style.backgroundColor = 'red')}
            >
              ❌
            </span>
          </div>
        ))}
    </div>
  );
};

export default ExpertisesContent;
