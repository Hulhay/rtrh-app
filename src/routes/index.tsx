import { createBrowserRouter } from 'react-router-dom';
import {
  CreateJamaahSuccess,
  Jamaah,
  JamaahDetail,
  Kajian,
  KajianDetail,
  NotFound,
  Scan,
} from '../pages';
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
        path: '/kajian/:id',
        element: <KajianDetail />,
      },
      {
        path: 'jamaah',
        element: <Jamaah />,
      },
    ],
  },
  {
    path: 'scan',
    element: <Scan />,
  },
  {
    path: '/jamaah/new',
    element: <CreateJamaahSuccess />,
  },
  {
    path: '/jamaah/:id',
    element: <JamaahDetail />,
  },
  {
    path: '/not-found',
    element: <NotFound />,
  },
]);

export default Routes;
