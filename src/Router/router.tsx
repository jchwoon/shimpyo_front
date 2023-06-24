import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import App from '../App';

const Hosting = lazy(() => import('../pages/Hosting'));
const Main = lazy(() => import('../pages/Main'));
const Detail = lazy(() => import('../pages/detail'));
const Accommodation = lazy(() => import('../pages/Accommodation'));
const NotFound = lazy(() => import('../pages/404'));
const KakaoSocialAuth = lazy(() => import('../pages/KakaoSocialAuth'));
const NaverSocialAuth = lazy(() => import('../pages/NaverSocialAuth'));
const GoogleSocialAuth = lazy(() => import('../pages/GoogleSocialAuth'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'hosting',
        element: <Hosting />,
      },
      {
        path: 'detail',
        element: <Detail />,
      },
      {
        path: 'auth/kakao/callback',
        element: <KakaoSocialAuth />,
      },
      {
        path: 'auth/naver/callback',
        element: <NaverSocialAuth />,
      },
      {
        path: 'auth/google/callback',
        element: <GoogleSocialAuth />,
      },
      {
        path: 'accommodation',
        element: <Accommodation />,
      },
    ],
  },
]);

export default router;
