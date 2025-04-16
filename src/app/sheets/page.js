import React from 'react';
import Sheets from 'src/app/components/sheets';

const SheetsPage = () => {
  return (
    <div>
      <h1>Sheets</h1>
      <p>Bienvenue sur l’intégration GOOGLE SHEETS.</p>
      <Sheets />
    </div>
  );
};

export default SheetsPage;

// import React from 'react';

// const AffaireJuridique = () => {
//   const data = {
//     Employeur: 'Entreprise XYZ',
//     Salarié: 'Mme Claire Martin',
//     Poste: 'Ingénieure logicielle',
//     'Clause litigieuse':
//       'Clause de non-concurrence interdisant de travailler pour toute entreprise du même secteur pendant 5 ans après le départ.',
//     'Article du Code du Travail invoqué':
//       'Article L1121-1 du Code du Travail et L. 1221-1',
//     'Arguments du salarié':
//       'Clause abusive car trop longue et sans contrepartie financière. Elle empêche la liberté de travailler.',
//     "Arguments de l'employeur":
//       "Protection des intérêts de l'entreprise contre la concurrence.",
//     'Jurisprudence potentielle':
//       "Cour de Cassation, Soc., 10 juillet 2002, n° 00-45.135 : une clause de non-concurrence doit être limitée dans le temps, l'espace et prévoir une compensation financière.",
//     'Impact de la clause':
//       'Limite fortement la liberté professionnelle du salarié, perte de revenu.',
//     'Demandes du salarié':
//       'Annulation de la clause et indemnisation pour préjudice subi.',
//     resume:
//       "Conflit entre Mme Claire Martin, ingénieure logicielle, et son employeur Entreprise XYZ concernant une clause de non-concurrence. La clause interdit à Mme Martin de travailler dans le même secteur pendant 5 ans après son départ, sans contrepartie financière. Mme Martin argue que la clause est abusive, limitant sa liberté de travailler, tandis que l'employeur la justifie par la protection des intérêts de l'entreprise. La jurisprudence (Cour de Cassation, 10 juillet 2002) indique qu'une telle clause doit être limitée dans le temps et l'espace, et prévoir une compensation financière. L'impact de la clause sur Mme Martin est significatif, limitant sa liberté professionnelle et causant une perte de revenu. Elle demande l'annulation de la clause et une indemnisation pour préjudice subi.",
//     optimizedplaidoirie:
//       "Monsieur le Président, Mesdames et Messieurs les Juges, je plaide aujourd'hui pour l'annulation de la clause de non-concurrence imposée à Mme Claire Martin par l'Entreprise XYZ, clause qui, en l'état, est non seulement abusive mais aussi contraire aux principes établis par notre jurisprudence. Comme le rappelle l'arrêt de la Cour de Cassation du 10 juillet 2002, une clause de non-concurrence doit être limitée dans le temps et dans l'espace, et surtout, elle doit prévoir une compensation financière équitable pour le salarié. Or, dans le cas de Mme Martin, cette clause est dépourvue de toute contrepartie financière, tout en lui interdisant de travailler dans son secteur de compétence pendant cinq années. Une telle durée, sans compensation, est manifestement disproportionnée et porte une atteinte injustifiée à sa liberté d'entreprendre et à son droit au travail. De plus, l'impact de cette clause sur Mme Martin est indéniable : elle se voit privée de la possibilité d'exercer sa profession, ce qui entraîne une perte de revenus significative et une atteinte à sa carrière. Face à ces éléments, il est clair que la clause en question doit être annulée pour abus, et que Mme Martin doit être indemnisée pour le préjudice subi. Je vous demande donc, Mesdames et Messieurs les Juges, de bien vouloir faire droit à nos demandes en annulant cette clause abusive et en condamnant l'Entreprise XYZ à verser à Mme Martin une indemnisation juste et équitable pour le préjudice qu'elle a subi. Je vous remercie de votre attention.",
//     judgechallenge:
//       "Quels textes précis ou jurisprudences récentes appuient cette affirmation concernant la nécessité d'une compensation financière équitable pour la validité d'une clause de non-concurrence ? Comment cette interprétation s'accorde-t-elle avec l'arrêt récent rendu par la Cour de cassation dans une affaire similaire ? Quelles preuves tangibles viennent renforcer l'argument selon lequel la clause est abusive en l'absence de contrepartie financière ? N'existe-t-il pas des jurisprudences contradictoires à cet argument ? Si oui, comment justifiez-vous votre position malgré ces éléments ? Pouvez-vous préciser en quoi la décision que vous citez s'applique exactement à la présente affaire ? Votre raisonnement ne semble-t-il pas négliger certains aspects essentiels du droit du travail tels que la liberté contractuelle des parties ?",
//     adversarialchallenge:
//       "Analyse des faits : La clause de non-concurrence en question est effectivement soumise à des conditions strictes, notamment en termes de limitation dans le temps et dans l'espace, ainsi que de compensation financière. Cependant, l'argumentation de l'avocat adverse omet de considérer que l'Entreprise XYZ a agi dans le cadre de la protection légitime de ses intérêts économiques, un principe reconnu par l'article L. 1221-1 du Code du travail. La durée de cinq ans, bien que longue, peut être justifiée par la nature hautement concurrentielle du secteur d'activité de Mme Martin et la nécessité pour l'entreprise de protéger ses investissements et son savoir-faire. Références législatives : L'article L. 1221-1 du Code du travail prévoit que les clauses de non-concurrence doivent être nécessaires à la protection des intérêts légitimes de l'entreprise, proportionnées au but recherché et ne pas porter une atteinte injustifiée à la liberté d'entreprendre du salarié. Dans ce cas, la clause répond à ces critères. Jurisprudence : La Cour de Cassation, dans son arrêt du 10 juillet 2002, a effectivement rappelé les conditions de validité d'une clause de non-concurrence, mais elle a également reconnu que ces clauses peuvent être valides si elles sont justifiées par des intérêts légitimes de l'employeur et proportionnées. Principes juridiques et raisonnements : L'absence de compensation financière ne rend pas automatiquement la clause abusive. La jurisprudence admet que dans certains cas, notamment lorsque le salarié a accès à des informations stratégiques ou à une clientèle sensible, la protection des intérêts de l'entreprise peut justifier une telle clause sans compensation financière. Conséquences pour l'employeur : L'annulation de la clause de non-concurrence exposerait l'Entreprise XYZ à un risque de concurrence déloyale et à la divulgation de ses secrets commerciaux, portant ainsi préjudice à ses intérêts légitimes. Conclusion : Les arguments de l'avocat adverse ne tiennent pas compte de la nécessité pour l'Entreprise XYZ de protéger ses intérêts économiques légitimes. La clause de non-concurrence est justifiée et proportionnée, et sa validité doit être confirmée.",
//     legalassistant:
//       "Monsieur le Président, Mesdames et Messieurs les Juges, aujourd'hui, je défends Mme Claire Martin contre une clause de non-concurrence imposée par l'Entreprise XYZ, une clause qui bafoue les principes fondamentaux de notre droit du travail. La jurisprudence, notamment l'arrêt de la Cour de Cassation du 10 juillet 2002, est claire : une clause de non-concurrence doit être encadrée dans le temps et l'espace, et surtout, compensée financièrement. Pourtant, dans le cas de Mme Martin, cette clause est non seulement dépourvue de toute contrepartie financière mais aussi d'une durée excessive de cinq ans, une entrave manifeste à sa liberté d'entreprendre et à son droit au travail. Les conséquences pour Mme Martin sont tangibles : une carrière mise en pause, une perte de revenus considérable. Face à cette réalité, l'annulation de cette clause abusive et une juste indemnisation pour Mme Martin ne sont pas seulement des demandes, mais une nécessité pour rétablir l'équité. Je vous prie donc, Mesdames et Messieurs les Juges, de reconnaître l'abus et d'accorder à Mme Martin la réparation qu'elle mérite. Merci.",
//     strategicplan:
//       "Pour affiner la plaidoirie et mieux anticiper les objections, voici trois questions stratégiques à poser aux autres experts : 1. Pour l'Avocat Adversaire : 'Quelles sont les spécificités du secteur d'activité de Mme Martin qui justifieraient une clause de non-concurrence de cinq ans sans compensation financière, et comment ces spécificités s'alignent-elles avec les principes de proportionnalité et de nécessité établis par la jurisprudence ?' 2. Pour le Juge : 'En considérant les arrêts récents de la Cour de Cassation, quels critères utiliseriez-vous pour évaluer si l'absence de compensation financière dans une clause de non-concurrence constitue une atteinte disproportionnée à la liberté d'entreprendre du salarié ?' 3. Pour l'Avocat Plaignant : 'Avez-vous des exemples de jurisprudences où des clauses de non-concurrence sans compensation financière ont été annulées, et comment ces cas pourraient-ils être utilisés pour renforcer l'argumentation en faveur de Mme Martin ?'",
//     OptimizedPlaidoirie:
//       "Monsieur le Président, Mesdames et Messieurs les Juges, aujourd'hui, je défends Mme Claire Martin contre une clause de non-concurrence qui, bien que légalement encadrée, contrevient aux principes fondamentaux du droit du travail Français. L'article L. 1221-1 du Code du Travail établit clairement que toute clause de non-concurrence doit être limitée dans le temps et l'espace, et accompagnée d'une compensation financière. Ces conditions sont non négociables pour garantir l'équilibre entre les intérêts de l'employeur et les droits du salarié.\\ \\ La jurisprudence récente confirme cette position. Par exemple, dans un arrêt du 10 novembre 2021, la Cour de Cassation a annulé une clause de non-concurrence pour absence de compensation financière, soulignant que celle-ci est une condition indispensable à la validité de la clause (Cass. soc., 10 nov. 2021, n° 20-16.284). De plus, un autre arrêt récent du 16 mars 2022 a précisé que la durée de la clause ne peut excéder trois ans, sauf circonstances exceptionnelles (Cass. soc., 16 mars 2022, n° 21-11.563). Ces jurisprudences récentes font écho à la présente affaire, où la clause s'étend sur cinq ans sans aucun justificatif particulier, et sans compensation financière.\\ \\ Face à ces éléments, la défense de l'Entreprise XYZ arguant de la protection de ses intérêts économiques ne saurait prospérer. Si every employeur a légalement le droit de protéger ses intérêts, ce droit ne doit pas se faire au détriment des droits Fondamentaux du salarié, tels que la liberté d'entreprendre et le droit au travail. La jurisprudence admet des exceptions à la compensation financière uniquement lorsque le salarié a eu accès à des informations stratégiques ou à une clientèle sensible, éléments qui ne sont pas établis dans ce dossier.\\ \\ En l'absence de contrepartie financière, la clause de non-concurrence imposée à Mme Martin ne peut être que qualifiée d'abusives. Les conséquences pour elle sont réelles et graves: une carrière suspendue, des revenus perdus, une liberté d'entreprendre bafouée. Ces dommages justifient pleinement une annulation de la clause et une indemnisation appropriée.\\ \\ Je vous prie donc, Mesdames et Messieurs les Juges, de reconnaître l'abus de droit commis par l'Entreprise XYZ et d'accorder à Mme Martin la réparation qu'elle mérite. La justice sociale et l'équité commandent que la liberté de travail de Mme Martin soit restaurée. Merci.",
//   };

//   const formatText = (text) => {
//     return text.split('\\ \\').map((paragraph, i) => (
//       <p key={i} style={{ marginBottom: '1em' }}>
//         {paragraph}
//       </p>
//     ));
//   };

//   return (
//     <div
//       style={{
//         fontFamily: 'Arial, sans-serif',
//         maxWidth: '900px',
//         margin: '0 auto',
//         padding: '20px',
//         color: '#333',
//         lineHeight: '1.6',
//       }}
//     >
//       <h1
//         style={{
//           color: '#2c3e50',
//           borderBottom: '2px solid #3498db',
//           paddingBottom: '10px',
//           textAlign: 'center',
//         }}
//       >
//         Dossier Juridique : Clause de Non-Concurrence
//       </h1>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Parties en présence
//         </h2>
//         <p>
//           <strong>Employeur :</strong> {data.Employeur}
//         </p>
//         <p>
//           <strong>Salarié :</strong> {data.Salarié}
//         </p>
//         <p>
//           <strong>Poste occupé :</strong> {data.Poste}
//         </p>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Objet du litige
//         </h2>
//         <p>
//           <strong>Clause litigieuse :</strong> {data['Clause litigieuse']}
//         </p>
//         <p>
//           <strong>Articles invoqués :</strong>{' '}
//           {data['Article du Code du Travail invoqué']}
//         </p>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Arguments des parties
//         </h2>
//         <div
//           style={{
//             backgroundColor: '#f8f9fa',
//             padding: '15px',
//             borderRadius: '5px',
//             marginBottom: '15px',
//           }}
//         >
//           <h3 style={{ color: '#16a085' }}>Position du salarié</h3>
//           <p>{data['Arguments du salarié']}</p>
//           <p>
//             <strong>Demandes :</strong> {data['Demandes du salarié']}
//           </p>
//         </div>
//         <div
//           style={{
//             backgroundColor: '#f8f9fa',
//             padding: '15px',
//             borderRadius: '5px',
//           }}
//         >
//           <h3 style={{ color: '#16a085' }}>Position de l'employeur</h3>
//           <p>{data["Arguments de l'employeur"]}</p>
//         </div>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Cadre juridique
//         </h2>
//         <p>
//           <strong>Jurisprudence :</strong> {data['Jurisprudence potentielle']}
//         </p>
//         <p>
//           <strong>Impact de la clause :</strong> {data['Impact de la clause']}
//         </p>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Synthèse du dossier
//         </h2>
//         <div
//           style={{
//             backgroundColor: '#e8f4f8',
//             padding: '15px',
//             borderRadius: '5px',
//           }}
//         >
//           {formatText(data.resume)}
//         </div>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Plaidoirie optimisée
//         </h2>
//         <div
//           style={{
//             backgroundColor: '#f5f5f5',
//             padding: '15px',
//             borderRadius: '5px',
//             fontStyle: 'italic',
//           }}
//         >
//           {formatText(data.OptimizedPlaidoirie)}
//         </div>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Questions du juge
//         </h2>
//         <div
//           style={{
//             backgroundColor: '#fff8e1',
//             padding: '15px',
//             borderRadius: '5px',
//           }}
//         >
//           {formatText(data.judgechallenge)}
//         </div>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Réponse adverse
//         </h2>
//         <div
//           style={{
//             backgroundColor: '#ffebee',
//             padding: '15px',
//             borderRadius: '5px',
//           }}
//         >
//           {formatText(data.adversarialchallenge)}
//         </div>
//       </div>

//       <div style={{ marginBottom: '30px' }}>
//         <h2
//           style={{
//             color: '#2980b9',
//             borderLeft: '4px solid #3498db',
//             paddingLeft: '10px',
//           }}
//         >
//           Plan stratégique
//         </h2>
//         <div
//           style={{
//             backgroundColor: '#e8f5e9',
//             padding: '15px',
//             borderRadius: '5px',
//           }}
//         >
//           {formatText(data.strategicplan)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AffaireJuridique;
