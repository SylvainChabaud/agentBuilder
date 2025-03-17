import { handleFetchSheetContent } from 'lib/services/sheets/getFileContent';
import { handleFetchSheets } from 'lib/services/sheets/getFiles';
import { useState, useEffect } from 'react';
import { handleGmailLoginClient } from 'src/app/components/gmail/oAuth/handleGmailLoginClient';

export const useSheets = () => {
  const [files, setFiles] = useState([]); // Liste d'objets { id, name, sheetNames: [] }
  const [error, setError] = useState(null);

  // Sélection courante
  const [selectedSheetId, setSelectedSheetId] = useState(null);
  const [selectedSheetName, setSelectedSheetName] = useState(null);
  const [rows, setRows] = useState([]); // Lignes de la feuille sélectionnée

  /**
   * 1) Bouton pour lister les Sheets (avec leurs onglets)
   */
  async function handleListSheets() {
    try {
      setError(null);

      const accessToken = await handleGmailLoginClient('/sheets/');
      console.info('gmail access token (list)', accessToken);

      const json = await handleFetchSheets(accessToken);
      setFiles(json.data);
    } catch (err) {
      setError(err.message);
      setFiles([]);
    }
  }

  /**
   * 2) Fonction pour sélectionner un fichier + un onglet
   */
  function handleSelectSheet(fileId, fileName, sheetName) {
    console.info('handleSelectSheet', { fileId, fileName, sheetName });
    setSelectedSheetId(fileId);
    setSelectedSheetName(sheetName);
    setRows([]);
    setError(null);
  }

  /**
   * 3) À chaque fois que l'on choisit un (fileId, sheetName), on va chercher les données
   */
  useEffect(() => {
    // Si on n'a pas encore choisi, on ne fait rien
    if (!selectedSheetId || !selectedSheetName) return;

    const fetchSheetRows = async () => {
      try {
        const accessToken = await handleGmailLoginClient('/sheets/');
        console.info('gmail access token (rows)', {
          accessToken,
          selectedSheetId,
          selectedSheetName,
        });

        const json = await handleFetchSheetContent({
          accessToken,
          selectedSheetId,
          selectedSheetName,
        });
        setRows(json.data); // On suppose data = tableau 2D (les lignes)
      } catch (err) {
        setRows([]);
        setError(err.message);
      }
    };

    fetchSheetRows();
  }, [selectedSheetId, selectedSheetName]);

  return {
    files,
    error,
    rows,
    selectedSheetId,
    selectedSheetName,
    handleSelectSheet,
    handleListSheets,
  };
};
