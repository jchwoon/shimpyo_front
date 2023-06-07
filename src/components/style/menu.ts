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
