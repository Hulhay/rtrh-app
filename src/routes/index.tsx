import { createBrowserRouter } from 'react-router-dom';
import { CreateJamaahSuccess, Jamaah, Kajian, NotFound, Scan } from '../pages';
import { BaseLayout } from './layout';

const Routes = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Kajian />,
      },
      {
        path: 'jamaah',
        element: <Jamaah />,
      },
      {
        path: 'scan',
        element: <Scan />,
      },
    ],
  },
  {
    path: '/jamaah/new',
    element: <CreateJamaahSuccess />,
  },
]);

export default Routes;
