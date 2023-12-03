import React from 'react';
import { Navbar } from '../../components';
import { Outlet } from 'react-router-dom';

const BaseLayout: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Outlet />
    </React.Fragment>
  );
};

export default BaseLayout;
