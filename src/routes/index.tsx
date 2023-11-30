import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages';

const Routes = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default Routes;
