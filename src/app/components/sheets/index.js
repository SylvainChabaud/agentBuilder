'use client';

// import { useSheets } from './useSheets';
import './styles.css';

export default function Sheets() {
  // const {
  //   files,
  //   error,
  //   rows,
  //   selectedSheetId,
  //   selectedSheetName,
  //   handleSelectSheet,
  //   handleListSheets,
  // } = useSheets();

  return (
    <div>TODO</div>
    // <div className="sheets-container">
    //   <button className="sheets-button" onClick={handleListSheets}>
    //     Lister Google Sheets (5 premiers)
    //   </button>

    //   {error && <p className="sheets-error">Erreur: {error}</p>}

    //   {/* Liste des fichiers */}
    //   {files.length > 0 && (
    //     <div className="sheets-file-list">
    //       <h4>Choisir un fichier et un onglet :</h4>
    //       {files.map((file) => (
    //         <div key={file.id} className="sheets-file-item">
    //           <strong>
    //             {file.name} (ID: {file.id}) - {file.modifiedTime}
    //           </strong>
    //           {file.sheetNames && (
    //             <div>
    //               {file.sheetNames.map((sheetName) => (
    //                 <button
    //                   key={sheetName}
    //                   className="sheets-sheet-button"
    //                   onClick={() =>
    //                     handleSelectSheet(file.id, file.name, sheetName)
    //                   }
    //                 >
    //                   {sheetName}
    //                 </button>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //       ))}
    //     </div>
    //   )}

    //   {/* Tableau des données */}
    //   {selectedSheetId && selectedSheetName && (
    //     <div className="sheets-table-container">
    //       <h4>Contenu de « {selectedSheetName} »</h4>
    //       {rows.length === 0 ? (
    //         <p>Aucune ligne ou en cours de chargement...</p>
    //       ) : (
    //         <table className="sheets-table">
    //           <thead>
    //             <tr>
    //               {rows[0].map((_, index) => (
    //                 <th key={index}>Col {index + 1}</th>
    //               ))}
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {rows.map((row, rowIndex) => (
    //               <tr key={rowIndex}>
    //                 {row.map((cell, colIndex) => (
    //                   <td key={colIndex}>{cell}</td>
    //                 ))}
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       )}
    //     </div>
    //   )}
    // </div>
  );
}
