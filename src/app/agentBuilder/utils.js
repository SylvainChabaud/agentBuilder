export function convertEmails(data) {
  const groups = {};

  data.forEach((item) => {
    const type = item.type; // 'PRO' ou 'PERSO'
    const resume = item.resume;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push({ resume });
  });

  // Convertir l'objet de regroupement en tableau d'objets
  return Object.entries(groups).map(([type, emails]) => ({ type, emails }));
}
