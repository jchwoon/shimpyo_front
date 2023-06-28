import styled from 'styled-components';

interface AvatarProps {
  src?: string;
  width: string;
  height: string;
}

export default function Avatar({ src, width, height }: AvatarProps) {
  return <StyleAvatar width={width} height={height} alt="avatar" src={src || '/images/basicProfile.jpg'} />;
}

const StyleAvatar = styled.img<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 100%;
`;
