import { useState, useRef, useEffect } from 'react';
import { MODELS } from './constants';
import { setExpertise } from 'lib/expertiseManager/setExpertise';
import { getExpertises } from 'lib/expertiseManager/getExpertises';
import { deleteExpertise } from 'lib/expertiseManager/deleteExpertise';
import { useSession } from 'next-auth/react';

export const useChatInterface = () => {
  const [builderValues, setBuilderValues] = useState({});
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedModel, setSelectedModel] = useState(MODELS[1]);
  const [currentExpertises, setCurrentExpertises] = useState([]);

  // TODO
  // const userId = '6ec9d968-10ef-48be-b136-28dbe422fbda';

  const { data: session } = useSession();
  const userId = session?.user?.id;

  console.info('messages', { messages, inputMessage, userId });
  const messagesEndRef = useRef(null);
  const formRef = useRef(null);

  // Défilement automatique vers le dernier message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getCurrentExpertises = async () => {
    const currentExpertises = await getExpertises();
    console.info('currentExpertises', currentExpertises);
    setCurrentExpertises(currentExpertises);
  };

  useEffect(() => {
    getCurrentExpertises();
  }, []);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const newMessage = {
      id: messages.length,
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    try {
      setIsLoading(true);
      setError(null);
      setInputMessage('');
      setMessages((prev) => [...prev, newMessage]);

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          messages: [...messages, newMessage],
          model: selectedModel.model,
          modelSource: selectedModel?.modelSource,
        }),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP (${response.status})`);
      }

      const data = await response.json();

      console.info('data fetch', data);
      const aiMessage = {
        id: messages.length + 1,
        role: 'assistant',
        // Récupération du contenu depuis data.message.content
        content: data.message.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Erreur:', error);
      setError(error.message);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 1,
          role: 'assistant',
          content: '⚠️ Erreur de connexion au serveur IA',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSelectedModel = (modelId) => {
    console.info('onSelectedModel', modelId);
    const modelObj = MODELS.find(({ id }) => id === modelId);
    console.info('modelObj', modelObj);

    setSelectedModel(modelObj);
  };

  const onDeleteMessage = ({ id: idToDelete }) => {
    console.info('onDeleteMessage', idToDelete);
    setMessages((messages) => {
      return messages.filter(({ id }) => id !== idToDelete);
    });
  };

  const onRestartFromMessage = ({ id: messageId }) => {
    console.info('onRestartFromMessage', messageId);
    // Filtrer les messages pour ne garder que ceux jusqu'au message sélectionné inclus
    setMessages((prevMessages) => {
      const messageIndex = prevMessages.findIndex(({ id }) => id === messageId);
      if (messageIndex !== -1) {
        return prevMessages.slice(0, messageIndex + 1);
      }
      return prevMessages;
    });
  };

  const onCreateExpert = async (data) => {
    const convertOutputs = (outputs) => {
      return outputs.reduce((acc, item) => {
        acc[item.name] = item.values.join('|').toUpperCase();
        return acc;
      }, {});
    };

    const formattedExpertise = {
      id: data.name,
      name: data.name,
      outputs: convertOutputs(data.outputs),
      context: messages,
      model: selectedModel.id,
    };

    console.info('onCreateExpert', {
      messages,
      data,
      selectedModel,
      formattedExpertise,
    });

    await setExpertise(formattedExpertise);
    getCurrentExpertises();
  };

  const onChangeExpertise = async (expert, hasDeleted) => {
    if (hasDeleted) {
      console.info('onChangeExpertise', { expert, hasDeleted });

      await deleteExpertise(expert);
      setMessages([]);
      setBuilderValues({ name: '' });
      return;
    }

    console.info('onChangeExpertise', expert);
    setMessages(expert.context);
    const modelsToSet = MODELS.find(({ id }) => id === expert.model);
    console.info('modelsToSet', modelsToSet);

    setSelectedModel(modelsToSet);
    setBuilderValues({
      name: expert.name,
      outputs: expert.outputs,
    });
  };

  return {
    formRef,
    isLoading,
    messages,
    error,
    inputMessage,
    selectedModelName: selectedModel.id,
    messagesEndRef,
    currentExpertises,
    builderValues,
    handleSubmit,
    onSelectedModel,
    onDeleteMessage,
    onRestartFromMessage,
    setInputMessage,
    onCreateExpert,
    onChangeExpertise,
  };
};
