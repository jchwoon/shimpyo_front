import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import App from '../App';
import Loading from '../components/shared/Loading';

const Hosting = lazy(() => import('../pages/Hosting'));
const Main = lazy(() => import('../pages/Main'));
const Detail = lazy(() => import('../pages/detail'));
const NotFound = lazy(() => import('../pages/404'));
const Reservation = lazy(() => import('../pages/Reservation'));
const Interest = lazy(() => import('../pages/Interest'));

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
    ],
  },
]);

export default router;
