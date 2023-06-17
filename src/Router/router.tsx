import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Hosting from '../pages/Hosting';
import Accommodation from '../pages/Accommodation';

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
        path: 'accommodation',
        element: <Accommodation/>,
      }
    ],
  },
]);

export default router;
