import { createBrowserRouter } from 'react-router-dom';
import Hosting from '../pages/Hosting';
import Detail from '../pages/Detail';
import App from '../App';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
