import { fetchOutlookEmails } from 'lib/services/outlook/fetchEmails';
import { useEffect, useState } from 'react';

export const useEmails = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEmails = async () => {
      setLoading(true);

      const { emails, error } = await fetchOutlookEmails();

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
