import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import { profileImageAtom } from '../../recoil/userAtoms';

interface AvatarProps {
  src?: string;
  width: string;
  height: string;
}

export default function Avatar({ src, width, height }: AvatarProps) {
  const userPofileImage = useRecoilValue(profileImageAtom);

  return (
    <StyleAvatar
      width={width}
      height={height}
      alt="avatar"
      src={src || userPofileImage || '/images/basicProfile.jpg'}
    />
  );
}

const StyleAvatar = styled.img<{ width: string; height: string }>`
  width: ${props => props.width};
  height: ${props => props.height};
  border-radius: 100%;
`;
