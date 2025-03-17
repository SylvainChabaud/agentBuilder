import { fetchOutlookEmails } from 'lib/services/outlook/fetchEmails';
import { useEffect, useState } from 'react';
import { handleMsalLoginClient } from '../msal/handleMsalLoginClient';

export const useEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmails = async () => {
      setLoading(true);

      const accessToken = await handleMsalLoginClient();
      const { emails, error } = await fetchOutlookEmails(accessToken);

      setEmails(emails);
      setError(error);
      setLoading(false);
    };

    getEmails();
  }, []);

  return {
    emails,
    loading,
    error,
  };
};
