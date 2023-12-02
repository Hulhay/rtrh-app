import { createBrowserRouter } from 'react-router-dom';
import { Home, Jamaah, Kajian, Scan } from '../pages';
import { BaseLayout } from './layout';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'jamaah',
        element: <Jamaah />,
      },
      {
        path: 'scan',
        element: <Scan />,
      },
      {
        path: 'kajian',
        element: <Kajian />,
      },
    ],
  },
]);

export default Routes;
