'use client';

import { MODELS } from './constants';
import { useChatInterface } from './useChatInterface';
import ExpertiseBuilder from './components/expertBuilder';
import ExpertisesContent from './components/expertisesContent';

const ChatInterface = () => {
  const {
    formRef,
    isLoading,
    messages,
    error,
    inputMessage,
    selectedModelName,
    messagesEndRef,
    currentExpertises,
    builderValues,
    handleSubmit,
    onSelectedModel,
    onDeleteMessage,
    setInputMessage,
    onCreateExpert,
    onChangeExpertise,
  } = useChatInterface();

  return (
    <div
      style={{
        display: 'flex',
        gap: '30px',
        padding: '20px',
        backgroundColor: '#f9fafb',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          style={{
            height: '50vh',
            width: '50vw',
            overflowY: 'auto',
            padding: '2rem',
            marginBottom: '1rem',
            backgroundColor: '#333',
          }}
        >
          {messages.map((message, index) => (
            <div key={message.id || index}>
              {index > 0 &&
                messages[index].role !== messages[index - 1].role && (
                  <div style={{ margin: '1rem 0' }}></div>
                )}
              <div
                style={{
                  display: 'flex',
                  justifyContent:
                    message.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '80%',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    backgroundColor:
                      message.role === 'user' ? '#3b82f6' : '#ffffff',
                    color: message.role === 'user' ? '#ffffff' : '#000000',
                    border:
                      message.role === 'user' ? 'none' : '1px solid #e5e7eb',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={() => onDeleteMessage(message)}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: 'transparent',
                      border: 'none',
                      fontSize: '0.65rem',
                      cursor: 'pointer',
                      color: message.role === 'user' ? '#ffefff' : '#000000',
                    }}
                  >
                    ✖
                  </button>

                  <p
                    style={{
                      marginBottom: '10px',
                      fontSize: '13px',
                      color: message.role === 'user' ? '#ffefff' : '#000000',
                    }}
                  >
                    {message.role === 'user' ? 'User' : selectedModelName}
                  </p>

                  <p style={{ paddingRight: '25px', whiteSpace: 'pre-wrap' }}>
                    {message.content}
                  </p>
                  <p
                    style={{
                      fontSize: '0.75rem',
                      marginTop: '0.25rem',
                      opacity: 0.7,
                    }}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            borderTop: '1px solid #e5e7eb',
            backgroundColor: '#ffffff',
            padding: '1rem',
            paddingTop: '1rem',
          }}
          ref={(form) => form && (formRef.current = form)}
        >
          {/* Sélecteur de modèle IA */}
          <div
            style={{
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label
                htmlFor="modelSelector"
                style={{ marginRight: '0.5rem', fontWeight: 'bold' }}
              >
                Sélectionner le modèle IA :
              </label>

              {isLoading && (
                <div
                  style={{
                    position: 'relative',
                    width: '24px',
                    height: '24px',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: '2px solid #3b82f6',
                      borderTopColor: 'transparent',
                      animation: 'spin 0.8s linear infinite',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                </div>
              )}
            </div>

            <select
              id="modelSelector"
              value={selectedModelName}
              onChange={(e) => onSelectedModel(e.target.value)}
              style={{
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
                padding: '0.25rem 0.5rem',
                outline: 'none',
                flex: 1,
              }}
            >
              {MODELS.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Tapez votre message..."
              style={{
                flex: 1,
                border: '1px solid #ccc',
                borderRadius: '0.5rem',
                padding: '0.5rem 1rem',
                outline: 'none',
              }}
              disabled={isLoading}
            />

            <button
              type="submit"
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
                color: '#ffffff',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                border: 'none',
              }}
              disabled={isLoading}
            >
              {isLoading ? 'Envoi...' : 'Envoyer'}
            </button>
          </div>

          {error && (
            <p
              style={{
                color: '#dc2626',
                fontSize: '0.875rem',
                marginTop: '0.5rem',
              }}
            >
              Erreur : {error}
            </p>
          )}
        </form>
      </div>

      <div>
        CREER UN EXPERT
        <ExpertiseBuilder
          onCreateExpert={onCreateExpert}
          builderValues={builderValues}
        />
      </div>

      <div>
        MES EXPERTS
        <ExpertisesContent
          expertises={currentExpertises}
          onChangeExpertise={onChangeExpertise}
        />
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatInterface;
