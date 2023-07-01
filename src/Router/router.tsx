import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Loading from '../components/shared/Loading';
import SocialLogin from '../pages/SocialLogin';

const Hosting = lazy(() => import('../pages/Hosting'));
const Main = lazy(() => import('../pages/Main'));
const Detail = lazy(() => import('../pages/detail'));
const Accommodation = lazy(() => import('../pages/Accommodation'));
const NotFound = lazy(() => import('../pages/404'));
const CheckReservation = lazy(() => import('../pages/CheckReservation'));
const Interest = lazy(() => import('../pages/Interest'));
const SocialAddInfo = lazy(() => import('../pages/SocialAddInfo'));
const CheckReservationDetail = lazy(() => import('../pages/CheckReservationDetail'));

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
            <Main />
          </Suspense>
        ),
      },
      {
        path: 'hosting',
        element: (
          <Suspense fallback={<Loading />}>
            <Hosting />
          </Suspense>
        ),
      },
      {
        path: 'detail',
        element: (
          <Suspense fallback={<Loading />}>
            <Detail />
          </Suspense>
        ),
      },
      {
        path: 'reservations',
        errorElement: <NotFound />,
        children: [
          {
            path: '',
            element: (
              <Suspense fallback={<Loading />}>
                <CheckReservation />
              </Suspense>
            ),
            errorElement: <NotFound />,
          },
          {
            path: 'detail',
            element: (
              <Suspense fallback={<Loading />}>
                <CheckReservationDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'interest_lists',
        element: (
          <Suspense fallback={<Loading />}>
            <Interest />
          </Suspense>
        ),
      },
      {
        path: 'social',
        children: [
          {
            path: 'login',
            element: <SocialLogin />,
          },
          {
            path: 'add_info',
            element: (
              <Suspense fallback={<Loading />}>
                <SocialAddInfo />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: 'accommodation',
        element: <Accommodation />,
      },
    ],
  },
]);

export default router;
