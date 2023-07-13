import styled from 'styled-components';
import Avatar from '../../shared/Avatar';

interface UserImageSectionProps {
  profileImage: string;
  nickname: string;
}

export default function UserImageSection({ profileImage, nickname }: UserImageSectionProps) {
  return (
    <StyleUserProfileImageBox>
      <StyleImageContents>
        <StyleUserImage>
          <Avatar height="100%" width="100%" src={profileImage} />
        </StyleUserImage>
        <StyleUserNickname>
          <h1 style={{ fontSize: '25px', fontWeight: 'bold' }}>{nickname}</h1>
        </StyleUserNickname>
      </StyleImageContents>
    </StyleUserProfileImageBox>
  );
}

const StyleUserProfileImageBox = styled.div`
  width: 350px;
  border-radius: 10px;
  box-shadow: 0px 3px 10px 5px rgba(100, 100, 100, 25%);
`;

const StyleImageContents = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyleUserImage = styled.div`
  width: 130px;
  height: 130px;
  border-radius: 100%;
  overflow: hidden;
`;

const StyleUserNickname = styled.div`
  margin-top: 10px;
  width: 120px;
  text-align: center;
`;
