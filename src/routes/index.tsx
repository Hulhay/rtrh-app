import { createBrowserRouter } from 'react-router-dom';
import {
  AutoScan,
  CreateJamaahSuccess,
  Jamaah,
  JamaahDetail,
  Kajian,
  KajianDetail,
  Login,
  Menu,
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
    path: 'auto-scan',
    loader: loader,
    element: <AutoScan />,
  },
  {
    path: 'jamaah/new',
    loader: loader,
    element: <CreateJamaahSuccess />,
  },
  {
    path: 'jamaah/:id',
    loader: loader,
    element: <JamaahDetail />,
  },
  {
    path: 'menu',
    loader: loader,
    element: <Menu />,
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
