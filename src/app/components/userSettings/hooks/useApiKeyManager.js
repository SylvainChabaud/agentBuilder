'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { saveApiKey } from '/lib/usersManager/saveApiKey';
import { deleteApiKey } from '/lib/usersManager/deleteApiKey';
import { getUserById } from '/lib/usersManager/getUserById';

export function useApiKeyManager() {
  // TODO
  // const userId = '6ec9d968-10ef-48be-b136-28dbe422fbda';
  const { data: session, status } = useSession(); // 👈 auth session
  const userId = session?.user?.id;

  const [llmSettings, setLlmSettings] = useState({
    apiKeyInput: '',
    hasKey: false,
    baseUrl: '',
    model: '',
  });

  const [saved, setSaved] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      const user = await getUserById(userId);
      if (user?.llmSettings) {
        setLlmSettings((prev) => ({
          ...prev,
          hasKey: user.llmSettings.hasKey,
          baseUrl: user.llmSettings.baseUrl,
          model: user.llmSettings.model,
        }));
      }
    };

    fetchData();
  }, [userId]);

  const handleChange = (field, value) => {
    setLlmSettings((prev) => ({ ...prev, [field]: value }));
  };

  const saveKey = async () => {
    if (!userId) return;

    const payload = {
      apiKey: llmSettings.apiKeyInput,
      baseUrl: llmSettings.baseUrl,
      model: llmSettings.model,
    };

    const result = await saveApiKey(userId, payload);

    if (result) {
      setSaved(true);
      setLlmSettings((prev) => ({ ...prev, hasKey: true }));
      setTimeout(() => setSaved(false), 1500);
    }
  };

  const clearKey = async () => {
    if (!userId) return;

    const result = await deleteApiKey(userId);
    if (result) {
      setLlmSettings((prev) => ({
        ...prev,
        apiKeyInput: '',
        hasKey: false,
      }));
      setDeleted(true);
      setTimeout(() => setDeleted(false), 1500);
    }
  };

  return {
    llmSettings,
    handleChange,
    saveKey,
    clearKey,
    saved,
    deleted,
  };
}
