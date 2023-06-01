import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Hosting from '../pages/Hosting';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'hosting',
        element: <Hosting />,
      },
    ],
  },
]);

export default router;
