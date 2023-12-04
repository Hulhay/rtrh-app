import { RouterProvider } from 'react-router-dom';
import Routes from './routes';
import { Provider } from 'react-redux';
import { store } from './store';

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={Routes} />
    </Provider>
  );
};

export default App;
