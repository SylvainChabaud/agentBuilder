import { APPS_LIST, NODE_PARAMS } from '../constants';
import {
  DeleteNodeButtonStyled,
  NodeParametersPanel,
  ParameterRow,
  StyledInput,
  StyledSelect,
} from './styles';
import { useEffect, useState, useMemo } from 'react';
import { handleFetchSheets } from '../../../../lib/services/sheets/getFiles';
import { handleGmailLoginClient } from '../../../../src/app/components/gmail/oAuth/handleGmailLoginClient';
import { APPS_LABELS } from '../../../../lib/constants';

const NodeParameters = ({
  onChangeNodeParams,
  nodeName,
  nodeBg,
  nodeApp,
  nodeExpertise,
  nodeFile,
  nodeSheet,
  expertisesList,
}) => {
  const [error, setError] = useState();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (nodeApp === APPS_LABELS.SHEET && nodeExpertise === 'sheets') {
      console.info('NodeParameters useEffect');

      const handleListSheets = async () => {
        try {
          setError(null);

          const accessToken = await handleGmailLoginClient('/sheets/');
          console.info('gmail access token (list)', accessToken);

          const { data } = await handleFetchSheets(accessToken);
          console.info('json', data);

          setFiles(data);
        } catch (err) {
          setError(err.message);
          setFiles([]);
        }
      };

      handleListSheets();
    }
  }, [nodeApp, nodeExpertise]);

  const shouldDisplaysSheetsFiles =
    nodeApp === APPS_LABELS.SHEET && nodeExpertise === 'sheets';

  const currentExpertiseList = useMemo(() => {
    console.info('🔄 Recalcul de currentExpertiseList', {
      nodeApp,
      expertisesList,
    });

    return expertisesList.filter((expertise) => {
      if (nodeApp === APPS_LIST[4].id) {
        return expertise?.id === 'sheets';
      } else if (nodeApp === APPS_LIST[0].id) {
        return (
          expertise?.id === 'gmailEmails' ||
          expertise?.id === 'sendEmail' ||
          expertise?.id === 'webSearch'
        );
      } else if (nodeApp === APPS_LIST[5].id) {
        return expertise?.id === 'displaysRanking';
      } else if (nodeApp === APPS_LIST[3].id) {
        return false;
      } else if (nodeApp === APPS_LIST[1].id) {
        return false;
      } else if (nodeApp === APPS_LIST[2].id) {
        return (
          expertise?.id !== 'gmailEmails' &&
          expertise?.id !== 'sendEmail' &&
          expertise?.id !== 'sheets' &&
          expertise?.id !== 'displaysRanking' &&
          expertise?.id !== 'webSearch'
        );
      } else {
        return false;
      }
    });
  }, [expertisesList, nodeApp]);

  console.info('currentFiles 1', { nodeSheet, nodeFile, files });

  const currentFiles = files?.find((file) => file?.id === nodeFile?.id);

  console.info('currentFiles 2', currentFiles);

  return (
    <NodeParametersPanel>
      <ParameterRow>
        <label>Label :</label>
        <StyledInput
          value={nodeName}
          onChange={({ target: { value } }) =>
            onChangeNodeParams({ type: NODE_PARAMS.NAME, value })
          }
        />
      </ParameterRow>

      <ParameterRow>
        <label>Color :</label>
        <StyledInput
          type="color"
          value={nodeBg}
          onChange={({ target: { value } }) =>
            onChangeNodeParams({ type: NODE_PARAMS.BG_COLOR, value })
          }
        />
      </ParameterRow>

      <ParameterRow>
        <label>Application :</label>
        <StyledSelect
          value={nodeApp}
          onChange={({ target: { value } }) => {
            onChangeNodeParams({ type: NODE_PARAMS.SELECT_APP, value });
          }}
        >
          <option value="" disabled>
            Sélectionner une app
          </option>
          {APPS_LIST.map((app) => (
            <option key={app?.id} value={app?.id}>
              {app.name}
            </option>
          ))}
        </StyledSelect>
      </ParameterRow>

      <ParameterRow>
        <label>Expertise :</label>
        <StyledSelect
          value={nodeExpertise}
          onChange={({ target: { value } }) => {
            onChangeNodeParams({ type: NODE_PARAMS.EXPERTISE, value });
          }}
        >
          <option value="" disabled>
            Sélectionner une expertise
          </option>
          {currentExpertiseList.map((app) => (
            <option key={app?.id} value={app?.id}>
              {app?.name}
            </option>
          ))}
        </StyledSelect>
      </ParameterRow>

      {shouldDisplaysSheetsFiles && (
        <>
          <ParameterRow>
            <label>Fichier :</label>
            <StyledSelect
              value={nodeFile?.id}
              onChange={({ target: { value } }) => {
                const foundedFile = files?.find((file) => file.id === value);

                onChangeNodeParams({
                  type: NODE_PARAMS.FILE,
                  file: foundedFile,
                });
              }}
            >
              <option value="" disabled>
                Sélectionner un fichier
              </option>
              {files.map((file) => (
                <option key={file?.id} value={file?.id}>
                  {file?.name}
                </option>
              ))}
            </StyledSelect>
          </ParameterRow>

          <ParameterRow>
            <label>Feuille :</label>
            <StyledSelect
              value={nodeSheet}
              onChange={({ target: { value } }) => {
                onChangeNodeParams({
                  type: NODE_PARAMS.SHEET,
                  value,
                });
              }}
            >
              <option value="" disabled>
                Sélectionner une feuille
              </option>
              {currentFiles?.sheetNames &&
                currentFiles.sheetNames.map((sheet, id) => (
                  <option key={id} value={sheet}>
                    {sheet}
                  </option>
                ))}
            </StyledSelect>
          </ParameterRow>
        </>
      )}

      <ParameterRow>
        <DeleteNodeButtonStyled
          onClick={() => onChangeNodeParams({ type: NODE_PARAMS.DELETE })}
        >
          Supprimer le nœud
        </DeleteNodeButtonStyled>
      </ParameterRow>
    </NodeParametersPanel>
  );
};

export default NodeParameters;
