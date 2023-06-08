import { createBrowserRouter } from 'react-router-dom';
import Hosting from '../pages/Hosting';
import Home from '../pages/Home';
import App from '../App';

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
    ],
  },
]);

export default router;
