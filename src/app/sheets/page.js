import React from 'react';
import Emails from 'src/app/components/gmail/emails';
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
