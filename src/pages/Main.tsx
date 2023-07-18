import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';

// import Navbar from '../components/Main/Navbar/Navbar';

import Navbar from '../components/shared/Navbar/Navbar';

import MobileNavbar from '../components/Main/MobileNavbar/MobileNavbar';
import Cards from '../components/Main/Cards/Cards';

import MobileNavbarTheme from '../components/Main/OverrideTheme/MobileNavbarTheme';
import NewMobileFooter from '../components/shared/MobileFooter/NewMobileFooter';

import { useState, useEffect, useRef } from 'react';
import AdditionalInfoModal from '../components/Main/Modal/AdditionalInfoModal';
import JoinModal from '../components/shared/Modal/JoinModal';
import LoginModal from '../components/shared/Modal/LoginModal';
import IdFindModal from '../components/Main/Modal/IdFindModal';
import PasswordFindModal from '../components/Main/Modal/PasswordFindModal';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';
import UserMenuItem from '../components/shared/UserMenu/UserMenuItem';

import SearchBar from '../components/Main/Navbar/SearchBar';

import { Height } from '../recoil/navBarAtoms';

import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { CustomIcon } from '../components/shared/MobileFooter/CustomIcon';

import { useNavigate } from 'react-router-dom';

import { loginModalAtom, joinModalAtom } from '../recoil/modalAtoms';
import { loginStateAtom } from '../recoil/userAtoms';

import useLogout from '../hooks/useLogout';

import useHttpRequest from '../hooks/useHttpRequest';
import { MAIN_PAGE_HOME_LIST_API_PATH } from '../constants/api/homeListApi';

import { objectPlaceholder } from '../recoil/navBarAtoms';

export default function Main() {
  const [searchParams] = useSearchParams();
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false);
  const setLoginModal = useSetRecoilState(loginModalAtom);
  // const [loginState, setLoginState] = useState(false);
  const [appbarheight, setAppBarHeight] = useRecoilState(Height);
  const [isToReservationCheck, setIsToReservationCheck] = useState(false);
  const navigate = useNavigate();
  const setJoinModal = useSetRecoilState(joinModalAtom);
  const loginState = useRecoilValue(loginStateAtom)
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

  useEffect(() => {
    if (searchParams.get('redirect_url')?.includes('/reservations')) {
      setIsToReservationCheck(true);
    }

    if (searchParams.has('redirect_url')) {
      setLoginModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const value0 = <BottomNavigationAction icon={<CustomIcon />} label="홈" onClick={() => navigate('/')} />;
  const value1 = (
    <BottomNavigationAction icon={<FavoriteIcon />} label="관심 숙소" onClick={() => console.log('hi im value1')} />
  );
  const value2 = (
    <BottomNavigationAction icon={<AccountCircleIcon />} label="로그인" onClick={() => setLoginModal(true)} />
  );

  const location = useLocation();
  const isSearchPage = location.pathname.includes('/search/');
  console.log("isSearchPage:", isSearchPage)

  //메인 페이지 데이터 요청

  const { responseData, sendRequest, errorMessage, isLoading } = useHttpRequest();
  const [nextData, setNextData] = useState(true)
  const [page, setPage] = useState(0);

  const observerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   sendRequest({
  //     url: `${MAIN_PAGE_HOME_LIST_API_PATH}`,
  //     method: "POST",
  //     body: {
  //       page: 0
  //     }
  //   })
  // }, [])

  useEffect(() => {
    if (nextData && !isSearchPage)
      sendRequest({
        url: `${MAIN_PAGE_HOME_LIST_API_PATH}`,
        method: "POST",
        body: {
          page: page
        }
      })
  }, [page])

  useEffect(() => {

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (entry.isIntersecting && nextData) {
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
  }, [nextData]);

  // const [data, setData] = useState<any>(null);

  const [data, setData] = useState<any>([]);

  // useEffect(() => {
  //   if (!responseData) return;
  //   if (responseData.result) {
  //     setData(responseData.result);
  //   }
  // }, [responseData]);

  useEffect(() => {
    if (!responseData) return;
    if (responseData.result) {
      const newData: any = responseData.result;
      console.log("newData:", newData)
      if (newData.length === 0) setNextData(false)
      setData((prevData: Array<any>) => [...prevData, ...newData]);
    }
  }, [responseData]);

  console.log("data:", data)

  //검색 데이터 요청



  const city = searchParams.get('city')
  const district = searchParams.get('district')
  const firstPickedDate = searchParams.get('firstpickeddate')
  const secondPickedDate = searchParams.get('secondpickeddate')
  const totalguestnumber = searchParams.get('totalguestnumber')
  const houseTypeValue = searchParams.get('housetype')

  console.log("page:", page)

  useEffect(() => {
    if (nextData && isSearchPage)
      sendRequest({
        url: `${MAIN_PAGE_HOME_LIST_API_PATH}`,
        method: "POST",
        body: {
          page: page,
          city: city === "null" ? null : city,
          district: district === "null" ? null : district,
          checkin: firstPickedDate === "Invalid date" ? null : firstPickedDate,
          checkout: secondPickedDate === "Invalid date" ? null : secondPickedDate,
          people: totalguestnumber === "0" ? null : totalguestnumber,
          type: houseTypeValue === "null" ? null : houseTypeValue
        }
      })
  }, [page])

  return (
    <>
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
      <Cards cards={data ? data : []} />
      {nextData && <div ref={observerRef} style={{ height: '10px' }} />}
      {isLargeScreen ? null : <NewMobileFooter defaultValue={0} Action0={value0} Action1={value1} Action2={value2} />}
      <LoginModal isToReservationCheck={isToReservationCheck} redirectPath='/' />
      <JoinModal />
      <AdditionalInfoModal />
      <IdFindModal />
      <PasswordFindModal />
    </>
  );
}
