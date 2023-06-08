import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Hosting from '../pages/Hosting';
import Detail from '../pages/detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'hosting',
        element: <Hosting />,
      },
      {
        path: 'detail',
        element: <Detail />,
      }
    ],
  },
]);

export default router;
