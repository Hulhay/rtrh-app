import { Location } from 'react-router-dom';

export const getMenuActive = (loc: Location<any>) => {
  return loc.pathname === '/' || loc.pathname.includes('kajian')
    ? 'kajian'
    : loc.pathname === '/scan'
      ? 'scan'
      : loc.pathname === '/jamaah'
        ? 'jamaah'
        : loc.pathname === '/menu'
          ? 'menu'
          : '';
};
