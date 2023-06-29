import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Loading from '../components/shared/Loading';
import SocialLogin from '../pages/SocialLogin';

const Hosting = lazy(() => import('../pages/Hosting'));
const Main = lazy(() => import('../pages/Main'));
const Detail = lazy(() => import('../pages/detail'));
const NotFound = lazy(() => import('../pages/404'));
const Reservation = lazy(() => import('../pages/Reservation'));
const Interest = lazy(() => import('../pages/Interest'));
const SocialAddInfo = lazy(() => import('../pages/SocialAddInfo'));
const Pay = lazy(() => import('../pages/Pay'));

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
        path: 'pay',
        element: (
          <Suspense fallback={<Loading />}>
            <Pay />
          </Suspense>
        ),
      },
      {
        path: 'reservation',
        element: (
          <Suspense fallback={<Loading />}>
            <Reservation />
          </Suspense>
        ),
      },
      {
        path: 'interest_list',
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
    ],
  },
]);

export default router;
