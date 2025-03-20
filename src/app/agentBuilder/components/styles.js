import styled from 'styled-components';

export const ButtonStyled = styled.button`
  z-index: 4;
  background-color: ${({ bgcolor, disabled }) =>
    disabled ? '#a8a8a8' : bgcolor || '#14b8a6'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ bgcolorhover, disabled }) =>
      disabled ? '#a8a8a8' : bgcolorhover || '#0f766e'};
  }
`;

export const DeleteNodeButtonStyled = styled.button`
  margin-top: 20px;
  padding: 8px 12px;
  background-color: #e3342f;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgb(134, 32, 28);
  }
`;

export const NodeParametersPanel = styled.div`
  background-color: white;
  position: absolute;
  left: 10px;
  /* top: 20px; */
  z-index: 4;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 350px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const ParameterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledSelect = styled.select`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  width: 200px;
`;

export const StyledInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  text-align: center;
  width: 200px;
`;
