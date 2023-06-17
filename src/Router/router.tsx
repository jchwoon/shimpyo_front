import { createBrowserRouter } from 'react-router-dom';
import Hosting from '../pages/Hosting';
import App from '../App';
import Home from '../pages/Home';
import Detail from '../pages/detail';
import NotFound from '../pages/404';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'hosting',
        element: <Hosting />,
      },
      {
        path: 'detail',
        element: <Detail />,
      },
    ],
  },
]);

export default router;
