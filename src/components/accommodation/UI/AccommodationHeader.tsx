import { startTransition } from 'react';
import styled from 'styled-components';
import Header from '../../layout/Header';
import { useNavigate } from 'react-router-dom';

export default function AccommodationHeader() {
  const navigate = useNavigate();

  const handleOnClick = () => {
    startTransition(() => {
      navigate('/');
    });
  };

  return (
    <Header>
      <StyledLogoImg src="images/logo.png" alt="logo" onClick={handleOnClick}></StyledLogoImg>
    </Header>
  );
}

const StyledLogoImg = styled.img`
  width: 90px;
  height: 40px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
