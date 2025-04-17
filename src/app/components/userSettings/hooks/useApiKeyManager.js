'use client';
import { useEffect, useState } from 'react';
import { saveApiKey } from '../../../../../lib/usersManager/saveApiKey';
import { deleteApiKey } from '../../../../../lib/usersManager/deleteApiKey';
import { getUserById } from '../../../../../lib/usersManager/getUserById';
// import { useSession } from 'next-auth/react';

export function useApiKeyManager() {
  const [userApiKey, setUserApiKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // const { data: session } = useSession();

  // const userId = session?.user?.id;
  const userId = '6ec9d968-10ef-48be-b136-28dbe422fbda';

  useEffect(() => {
    const fetchUserApiKey = async () => {
      const user = await getUserById(userId);

      console.info('fetchUserApiKey', user);

      if (user?.apiKey) {
        setUserApiKey(user.apiKey);
        setInputValue(user.apiKey);
      }
    };

    fetchUserApiKey();
  }, []);

  const handleInput = (e) => {
    setInputValue(e);
  };

  const saveKey = async () => {
    console.info('saveKey');
    if (userId && inputValue) {
      const result = await saveApiKey(userId, inputValue);
      if (result) {
        setSaved(true);
        setUserApiKey(inputValue);
        setTimeout(() => setSaved(false), 1500);
      }
    }
  };

  const clearKey = async () => {
    setInputValue('');
    setUserApiKey('');
    setSaved(false);

    if (userId) {
      const result = await deleteApiKey(userId);
      if (result) {
        setDeleted(true);
        setTimeout(() => setDeleted(false), 1500);
      }
    }
  };

  return {
    inputValue,
    userApiKey,
    handleInput,
    saveKey,
    clearKey,
    saved,
    deleted,
  };
}
