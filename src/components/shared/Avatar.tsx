import styled from 'styled-components';

interface AvatarProps {
  src?: string;
}

export default function Avatar({ src }: AvatarProps) {
  return <StyleAvatar hidden alt="avatar" src={src || '/images/basicProfile.jpg'} />;
}

const StyleAvatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 100%;

  @media only screen and (min-width: 1024px) {
    display: block;
  }
`;
