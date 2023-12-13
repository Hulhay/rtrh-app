import { createBrowserRouter } from 'react-router-dom';
import {
  CreateJamaahSuccess,
  Jamaah,
  JamaahDetail,
  Kajian,
  KajianDetail,
  Login,
  NotFound,
  Scan,
} from '../pages';
import { BaseLayout } from './layout';
import { loader } from '../helper';

const Routes = createBrowserRouter([
  {
    path: '/',
    loader: loader,
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Kajian />,
      },
      {
        path: 'kajian/:id',
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
    loader: loader,
    element: <Scan />,
  },
  {
    path: 'jamaah/new',
    loader: loader,
    element: <CreateJamaahSuccess />,
  },
  {
    path: 'jamaah/:id',
    element: <JamaahDetail />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: 'not-found',
    element: <NotFound />,
  },
]);

export default Routes;
