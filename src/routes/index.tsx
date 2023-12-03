import { createBrowserRouter } from 'react-router-dom';
import { CreateJamaahSuccess, Home, Jamaah, Kajian, Scan } from '../pages';
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
  {
    path: '/jamaah/new',
    element: <CreateJamaahSuccess />,
  },
]);

export default Routes;
