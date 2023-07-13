import { useParams } from 'react-router-dom';
import Main from '../layout/Main';
import JoinModal from '../shared/Modal/JoinModal';
import LoginModal from '../shared/Modal/LoginModal';
import styled from 'styled-components';
import useHttpRequest from '../../hooks/useHttpRequest';
import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { editprofileModalAtom } from '../../recoil/modalAtoms';
import EditProfileModal from './Modal/EditProfileModal';
import UserImageSection from './Main/UserImageSection';
import { userIdAtom } from '../../recoil/userAtoms';
import UserIntroduceSection from './Main/UserIntroduceSection';

interface UserProfileData {
  profileImage: string;
  introduce: string;
  nickname: string;
}

export default function UserProfileMain() {
  const { userId } = useParams();
  const myId = useRecoilValue(userIdAtom);
  const setIsOpenEditProfileModal = useSetRecoilState(editprofileModalAtom);
  const { responseData, sendRequest } = useHttpRequest<UserProfileData>();
  const [userProfileData, setUserProfileData] = useState<UserProfileData>({
    introduce:
      '"배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다""배 님은 아직 프로필을 업데이트하지 않았습니다"',
    profileImage: '',
    nickname: '',
  });

  const fetchUserProfileData = async () => {
    await sendRequest({ url: `/api/show-profile/${userId}` });
  };

  useEffect(() => {
    fetchUserProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setUserProfileData(responseData.result);
    }
  }, [responseData]);
  return (
    <>
      <Main>
        <StyleContainer>
          <UserImageSection
            nickname={userProfileData.nickname}
            profileImage={userProfileData.profileImage || '/images/basicProfile.jpg'}
          />
          {userId && +userId === myId && (
            <StyleEditButtonBox>
              <StyleEditButton onClick={() => setIsOpenEditProfileModal(true)}>
                <span style={{ fontSize: '17px' }}>프로필 수정하기</span>
              </StyleEditButton>
            </StyleEditButtonBox>
          )}
          <UserIntroduceSection nickname={userProfileData.nickname} introduce={userProfileData.introduce} />
        </StyleContainer>
      </Main>
      <LoginModal redirectPath={`/users/${userId}`} />
      <JoinModal />
      <EditProfileModal fetchUserProfileData={fetchUserProfileData} userProfileData={userProfileData} />
    </>
  );
}

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 30px 0;
`;

const StyleEditButtonBox = styled.div`
  margin-top: 30px;
  width: 350px;
  display: none;

  @media only screen and (min-width: 762px) {
    display: block;
  }
`;

const StyleEditButton = styled.button`
  border: 2px solid black;
  padding: 0.3rem 0.5rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgb(240, 240, 240);
  }
`;
