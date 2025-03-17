import { handleMsalLogout } from 'lib/msal/handleMsalLogout';
import { useEffect, useState } from 'react';

export const useLogout = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      setLoading(true);

      const result = await handleMsalLogout();
      alert(result.message);

      if (result.success) {
        window.location.href = '/'; // Redirection après déconnexion réussie
      }

      setLoading(false);
    };

    handleLogout();
  }, []);

  return { loading };
};
