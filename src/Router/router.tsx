import { createBrowserRouter } from 'react-router-dom';
import Hosting from '../pages/Hosting';
import App from '../App';
import Main from '../pages/Main';
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
    ],
  },
]);

export default router;
