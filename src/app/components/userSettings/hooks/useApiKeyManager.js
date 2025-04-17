'use client';
import { useEffect, useState } from 'react';
import { saveApiKey } from '../../../../../lib/usersManager/saveApiKey';
import { deleteApiKey } from '../../../../../lib/usersManager/deleteApiKey';
// import { useSession } from 'next-auth/react';

export function useApiKeyManager() {
  const [apiKey, setApiKey] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // const { data: session } = useSession();

  // const userId = session?.user?.id;
  const userId = '6ec9d968-10ef-48be-b136-28dbe422fbda';

  // useEffect(() => {
  //   const stored = localStorage.getItem('user_api_key');
  //   if (stored) setApiKey(stored);
  // }, []);

  const saveKey = async () => {
    if (userId && apiKey) {
      const result = await saveApiKey(userId, apiKey);
      if (result) {
        setSaved(true);
        setTimeout(() => setSaved(false), 1500);
      }
    }
  };

  const clearKey = async () => {
    setApiKey('');
    setSaved(false);

    if (userId) {
      const result = await deleteApiKey(userId);
      if (result) {
        setDeleted(true);
        setTimeout(() => setDeleted(false), 1500);
      }
    }
  };

  return { apiKey, setApiKey, saveKey, clearKey, saved, deleted };
}
