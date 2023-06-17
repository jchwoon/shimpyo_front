import styled from 'styled-components';

export const StyleMenuList = styled.div`
  z-index: 10;
  position: absolute;
  border-radius: 1rem;
  min-width: 230px;
  width: auto;
  padding: 1rem 0;
  background-color: white;
  border: 1px solid rgb(244, 244, 244);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  :hover {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  }
`;

export const StyleNumberTypeInput = styled.input`
  outline: none;
  border: 0;

  &::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  &[type='number'] {
    appearance: none;
    -moz-appearance: textfield;
  }
`;

export const StyleButton = styled.button<{ $small: boolean; disabled: boolean }>`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-weight: bold;
  border-radius: 0.3rem;
  text-align: center;
  width: 100%;
  margin: 1rem 0;
  padding: ${props => (props.$small ? '0.5rem 0' : '0.75rem 0')};
`;
