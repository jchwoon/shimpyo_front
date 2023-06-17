import { createBrowserRouter } from 'react-router-dom';
import Hosting from '../pages/Hosting';
import App from '../App';
import Home from '../pages/Home';
import Detail from '../pages/detail';
import Main from '../pages/Main';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
            {
                path: 'login',
                element: <Home />,
            },
        ],
    },
]);

export default router;