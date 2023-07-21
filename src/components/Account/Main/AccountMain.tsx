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
import CouponInfo from './CouponInfo';
import useResponseToViewPort from '../../../hooks/useResponseToViewPort';
import SectionMenuListBox from '../../CheckReservationDetail/ReUse/SectionMenuListBox';
import { BsHouseGearFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import Button from '../../shared/UI/Button';
import useLogout from '../../../hooks/useLogout';
import DeactivationModal from '../Modal/DeactivationModal';
import { accountDeActivationModalAtom } from '../../../recoil/modalAtoms';
import { useSetRecoilState } from 'recoil';

interface ResultUserInfoData {
  userId: number;
  nickname: string;
  email: string;
  phoneNumber: string;
}

export default function AccountMain() {
  const navigation = useNavigate();
  const setAccountDeactivationModal = useSetRecoilState(accountDeActivationModalAtom);
  const { logoutHandler } = useLogout();
  const { viewPortWidth } = useResponseToViewPort();
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
        {viewPortWidth > 764 ? (
          <>
            <StyleTitle>계정</StyleTitle>
            <StyleNavigationProfile onClick={() => navigation(`/users/${userInfoData.userId}`)}>
              프로필 정보 보기 &rarr;
            </StyleNavigationProfile>
            <StyleSubTitle>개인정보</StyleSubTitle>
            <NicknameInfo fetchUserInfo={fetchUserInfo} infoContent={userInfoData.nickname} />
            <EmailInfo fetchUserInfo={fetchUserInfo} infoContent={userInfoData.email} />
            <PhoneInfo fetchUserInfo={fetchUserInfo} infoContent={userInfoData.phoneNumber} />
            <ChangePasswordInfo />
            <StyleSubTitle>쿠폰</StyleSubTitle>
            <CouponInfo />
            <DeactivationAccount />
          </>
        ) : (
          <>
            <StyleTitle>프로필</StyleTitle>
            <SectionMenuListBox
              onClick={() => navigation(`/users/${userInfoData.userId}`)}
              content="프로필 정보 보기"
              icon={CgProfile}
            />
            <StyleLine />
            <StyleSubTitle>호스팅</StyleSubTitle>
            <SectionMenuListBox onClick={() => navigation('/hosting')} content="숙소 관리" icon={BsHouseGearFill} />
            <StyleLine />
            <StyleSubTitle>개인정보</StyleSubTitle>
            <NicknameInfo fetchUserInfo={fetchUserInfo} infoContent={userInfoData.nickname} />
            <EmailInfo fetchUserInfo={fetchUserInfo} infoContent={userInfoData.email} />
            <PhoneInfo fetchUserInfo={fetchUserInfo} infoContent={userInfoData.phoneNumber} />
            <ChangePasswordInfo />
            <StyleSubTitle>쿠폰</StyleSubTitle>
            <CouponInfo />
            <StyleLine />
            <Button label="로그아웃" onClick={() => logoutHandler()} />
            <Button label="계정 비활성화" onClick={() => setAccountDeactivationModal(true)} />
          </>
        )}
      </StyleAccountBox>
      <DeactivationModal />
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

const StyleSubTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
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

const StyleLine = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid rgb(235, 235, 235);
`;
