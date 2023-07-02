import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Loading from '../components/shared/Loading';
import SocialLogin from '../pages/SocialLogin';
import AuthCheck from '../components/AuthCheck/AuthCheck';

const Hosting = lazy(() => import('../pages/Hosting'));
const Main = lazy(() => import('../pages/Main'));
const Detail = lazy(() => import('../pages/detail'));
const Accommodation = lazy(() => import('../pages/Accommodation'));
const NotFound = lazy(() => import('../pages/404'));
const CheckReservation = lazy(() => import('../pages/CheckReservation'));
const Interest = lazy(() => import('../pages/Interest'));
const SocialAddInfo = lazy(() => import('../pages/SocialAddInfo'));
const CheckReservationDetail = lazy(() => import('../pages/CheckReservationDetail'));

const onlyLogin = 'ONLY_LOGIN';
const onlyLogout = 'ONLY_LOGOUT';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck Component={Main} option={null} />
          </Suspense>
        ),
      },
      {
        path: 'hosting',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck Component={Hosting} option={onlyLogin} />
          </Suspense>
        ),
      },
      {
        path: 'detail',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck Component={Detail} option={null} />
          </Suspense>
        ),
      },
      {
        path: 'reservations',
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthCheck Component={CheckReservation} option={onlyLogin} />
              </Suspense>
            ),
          },
          {
            path: 'detail',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthCheck Component={CheckReservationDetail} option={onlyLogin} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'interest_lists',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck Component={Interest} option={onlyLogin} />
          </Suspense>
        ),
      },
      {
        path: 'social',
        children: [
          {
            path: 'login',
            element: <AuthCheck Component={SocialLogin} option={onlyLogout} />,
          },
          {
            path: 'add_info',
            element: (
              <Suspense fallback={<Loading />}>
                <AuthCheck Component={SocialAddInfo} option={onlyLogout} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'accommodation',
        element: (
          <Suspense fallback={<Loading />}>
            <AuthCheck Component={Accommodation} option={onlyLogin} />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
