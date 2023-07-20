import styled from 'styled-components';
import { AiFillHeart } from 'react-icons/ai';

import ImageContainer from '../components/detail/Container/ImageContainer';
import MainContainer from '../components/detail/Container/MainContainer';

import { ThemeProvider } from '@mui/material/styles';
import NavbarTheme from '../components/Main/OverrideTheme/NavbarTheme';
import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';

import { useState, useEffect, useRef } from 'react';

// import Navbar from '../components/Main/Navbar/Navbar';
import Navbar from '../components/shared/Navbar/Navbar';
import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';

import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { Height, Display, Change } from '../recoil/navBarAtoms';
import { loginModalAtom, joinModalAtom } from '../recoil/modalAtoms';
import { loginStateAtom } from '../recoil/userAtoms';

import CssBaseline from '@mui/material/CssBaseline';
import ToggleFavorite from '../components/detail/Container/ToggleFavorite';

import NewMobileFooter from '../components/shared/MobileFooter/NewMobileFooter';

import UserMenuItem from '../components/shared/UserMenu/UserMenuItem';

import SearchBar from '../components/Main/Navbar/SearchBar';

import JoinModal from '../components/shared/Modal/JoinModal';
import LoginModal from '../components/shared/Modal/LoginModal';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

import CustomizedBottomNavigation from '../components/shared/MobileFooter/CustomizedBottomNavigaton';

import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { CustomIcon } from '../components/shared/MobileFooter/CustomIcon';

import useHttpRequest from '../hooks/useHttpRequest';

import { DETAIL_PAGE_API_PATH, DETAIL_PAGE_REVIEWS_API_PATH } from '../constants/api/homeListApi';
import useLogout from '../hooks/useLogout';

export default function Detail() {

  const { houseId } = useParams()
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 750);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // const [loginState, setLoginState] = useState(false);
  const [appbarheight, setAppBarHeight] = useRecoilState(Height);
  const setLoginModal = useSetRecoilState(loginModalAtom);
  const setJoinModal = useSetRecoilState(joinModalAtom);
  const loginState = useRecoilValue(loginStateAtom)

  const navigate = useNavigate();
  const { logoutHandler } = useLogout();

  const menuItems = (
    <div>
      {loginState ? (
        <div>
          <UserMenuItem label="프로필" onClick={() => console.log('hi')} />
          <UserMenuItem label="계정" onClick={() => navigate('/account-settings')} />
          <UserMenuItem divide label="관심 숙소" onClick={() => navigate('/wishlists')} />
          <UserMenuItem divide label="호스트가 되어보세요" onClick={() => navigate('/hosting')} />
          <UserMenuItem label="로그아웃" onClick={() => logoutHandler()} />
        </div>
      ) : (
        <div>
          <UserMenuItem label="로그인" onClick={() => setLoginModal(true)} />
          <UserMenuItem label="회원가입" onClick={() => setJoinModal(true)} />
          <UserMenuItem label="예약내역" onClick={() => navigate('/check/non-member')} />
        </div>
      )}
    </div>
  );

  const [customDisplay, setCustomDisplay] = useRecoilState(Display);
  const [change, setChange] = useRecoilState(Change);
  const handleClick = () => {
    setAppBarHeight('80px');
    setCustomDisplay(false);
    setChange(false);
  };

  const value0 = <BottomNavigationAction icon={<CustomIcon />} label="홈" onClick={() => navigate('/')} />;
  const value1 = (
    <BottomNavigationAction icon={<FavoriteIcon />} label="관심 숙소" onClick={() => console.log('hi im value1')} />
  );
  const value2 = (
    <BottomNavigationAction icon={<AccountCircleIcon />} label="로그인" onClick={() => setLoginModal(true)} />
  );

  //디테일 페이지 데이터 요청

  const { responseData, sendRequest, errorMessage, isLoading } = useHttpRequest();

  useEffect(() => {
    sendRequest({ url: `${DETAIL_PAGE_API_PATH}/${houseId}` })
  }, [])

  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (!responseData) return;
    if (responseData.result) {
      setData(responseData.result);
    }
  }, [responseData]);

  //리뷰 데이터 요청

  const [reviewData, setReviewData] = useState([]);
  const [nextReview, setNextReview] = useState(true)
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const { responseData: reviewResponseData, sendRequest: reviewSendRequest, errorMessage: ReviewErrorMessage, isLoading: reviewIsLoading } = useHttpRequest();


  useEffect(() => {
    if (nextReview) reviewSendRequest({ url: `${DETAIL_PAGE_REVIEWS_API_PATH}/${houseId}?page=${page}` })
    // if (nextReview) reviewSendRequest({ url: `${DETAIL_PAGE_REVIEWS_API_PATH}?page=4` })
  }, [page])

  useEffect(() => {

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && nextReview) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      });

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [nextReview]);

  // const handleIntersection = (entries: IntersectionObserverEntry[]) => {
  //   const entry = entries[0];
  //   if (entry.isIntersecting && nextReview) {
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  useEffect(() => {
    if (!reviewResponseData) return;
    if (reviewResponseData.result) {
      const newData: any = reviewResponseData.result;
      console.log("newData:", newData)
      const newDataReview: [] = newData.review;
      const newDataNextReview = newData.hasNext;
      if (newDataNextReview === false) setNextReview(false);
      setReviewData((prevData) => [...prevData, ...newDataReview]);
    }
  }, [reviewResponseData]);

  console.log("nextReview:", nextReview)
  console.log("page:", page)

  //리뷰 데이터 요청 끝

  function houseType(val: string) {
    let answer = ''
    switch (val) {
      case "MOTEL":
        answer = "모텔";
        break;
      case "PENSION":
        answer = "펜션";
        break;
      case "HOTEL":
        answer = "호텔";
        break;
      case "GUEST":
        answer = "게스트 하우스";
        break;
    }
    return answer
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CssBaseline />
        {isLargeScreen ? (
          <Navbar menuItems={menuItems} logoPath="/" height={appbarheight}>
            <SearchBar />
          </Navbar>
        ) : (
          <ThemeProvider theme={MobileNavbarTheme}>
            <MobileNavbar />
          </ThemeProvider>
        )}
        <Container>
          <CustomizedDarkDiv onClick={handleClick} customDisplay={customDisplay} />
          <Description>
            <TitleWrapper>
              <Title>
                {data ? data.house.name : null}
              </Title>
              <DescriptionLocation>{data ? data.house.sido + " " + data.house.sigungu + "의 " + houseType(data.house.type) : null}</DescriptionLocation >
            </TitleWrapper>
            <ToggleButtonWrapper>
              <ToggleFavorite />
            </ToggleButtonWrapper>
          </Description>
          <ImageContainer
            images={data ? data.house.houseImages : []}
          />
          <MainContainer
            houseName={data ? data.house.name : ''}
            houseContents={data ? data.house.contents : ''}
            options={data ? data.house.options : []}
            rooms={data ? data.rooms : []}
            lat={data ? data.house.lat : null}
            lng={data ? data.house.lng : null}
            reviewData={reviewData ? reviewData : []}
            reviewIsLoading={reviewIsLoading}
            houseId={houseId ? houseId : ''}
          />
        </Container>
      </div>
      <div ref={observerRef} style={{ height: '10px' }} />
      {isLargeScreen ? null : (
        <NewMobileFooter defaultValue={null} Action0={value0} Action1={value1} Action2={value2} />
      )}
      <LoginModal redirectPath='/detail' />
      <JoinModal />

    </>
  );
}

const Container = styled.div`
  padding: 70px 60px;
  max-width: 1220px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: 749px) {
    padding: 70px 24px 0px 24px;
    width: 100%;
  }
  @media screen and (max-width: 599px) {
    padding: 70px 16px 0px 16px;
    width: 100%;
  }
`;

const TitleWrapper = styled.div``;

const ToggleButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: bold;
  font-family: 'Noto Sans KR';
`;

const Description = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const DescriptionLocation = styled.div`
  text-decoration: underline;
`;

const CustomizedDarkDiv = styled.div<{ customDisplay: boolean }>`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  visibility: ${({ customDisplay }) => (customDisplay ? 'visible' : 'hidden')};
  transition: 0.2s ease;
  z-index: 3;
`;

