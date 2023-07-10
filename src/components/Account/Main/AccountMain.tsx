import styled from 'styled-components';
import Main from '../../layout/Main';
import NicknameInfo from './NicknameInfo';
import useAuthorizedRequest from '../../../hooks/useAuthorizedRequest';
import { useEffect, useState } from 'react';
import EmailInfo from './EmailInfo';
import PhoneInfo from './PhoneInfo';
import ChangePasswordInfo from './ChangePasswordInfo';
import { useNavigate } from 'react-router-dom';
import DeactivationAccount from './DeactivationAccount';
import { USER_INFO_API_PATH } from '../../../constants/api/userApi';

interface ResultUserInfoData {
  userId: number;
  nickname: string;
  email: string;
  phoneNumber: string;
}

export default function AccountMain() {
  const navigation = useNavigate();
  const { responseData, sendRequest } = useAuthorizedRequest<ResultUserInfoData>({});
  const [userInfoData, setUserInfoData] = useState<ResultUserInfoData>({
    userId: 0,
    email: '',
    nickname: '',
    phoneNumber: '',
  });

  const fetchUserInfo = async () => {
    await sendRequest({ url: `${USER_INFO_API_PATH}` });
  };

  useEffect(() => {
    fetchUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!responseData) return;

    if (responseData.isSuccess) {
      setUserInfoData(responseData.result);
    }
  }, [responseData]);
  return (
    <Main>
      <StyleAccountBox>
        <StyleTitle>계정</StyleTitle>
        <StyleNavigationProfile onClick={() => navigation(`/users/${userInfoData.userId}`)}>
          프로필 정보 보기 &rarr;
        </StyleNavigationProfile>
        <NicknameInfo infoContent={userInfoData.nickname} />
        <EmailInfo infoContent={userInfoData.email} />
        <PhoneInfo infoContent={userInfoData.phoneNumber} />
        <ChangePasswordInfo />
        <DeactivationAccount />
      </StyleAccountBox>
    </Main>
  );
}

const StyleTitle = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin-top: 30px;

  @media only screen and (min-width: 764px) {
    margin-top: 100px;
  }
`;

const StyleNavigationProfile = styled.div`
  margin-top: 20px;
  margin-bottom: 30px;
  text-decoration: underline;
  cursor: pointer;
`;

const StyleAccountBox = styled.div`
  margin-bottom: 50px;
  height: auto;

  @media only screen and (min-width: 764px) {
    padding-left: 100px;
    padding-right: 100px;
  }

  @media only screen and (min-width: 924px) {
    padding-left: 200px;
    padding-right: 200px;
  }

  @media only screen and (min-width: 1224px) {
    padding-left: 300px;
    padding-right: 300px;
  }
`;
