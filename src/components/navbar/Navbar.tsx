import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from './Navbar.styles';
import {
  BsCalendarEvent,
  BsCalendarEventFill,
  BsPeople,
  BsPeopleFill,
} from 'react-icons/bs';
import { RxHamburgerMenu } from 'react-icons/rx';
import { RiQrScanFill, RiQrScanLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks';
import { getMenuActive } from './Navbar.helper';
import { lang } from '../../constants';

const Navbar: React.FC = () => {
  const loc = useLocation();
  const menu = getMenuActive(loc);
  const scroll = useScroll();

  const [hide, setHide] = useState<string>('');

  const handleScroll = useCallback(() => {
    setHide(scroll.y > 50 && scroll.y - scroll.curY > 0 ? 'hidden' : '');
  }, [scroll.y, scroll.curY]);

  useEffect(() => {
    handleScroll();
  }, [scroll.y, scroll.curY]);

  return (
    <Wrapper className={hide}>
      <Link to={'/'}>
        {menu === 'kajian' ? (
          <BsCalendarEventFill className="icon" />
        ) : (
          <BsCalendarEvent className="icon" />
        )}
        <p>{lang('nav.kajian')}</p>
      </Link>
      <Link to={'/scan'}>
        {menu === 'scan' ? (
          <RiQrScanFill className="icon" />
        ) : (
          <RiQrScanLine className="icon" />
        )}
        <p>{lang('nav.scanner')}</p>
      </Link>
      <Link to={'/jamaah'}>
        {menu === 'jamaah' ? (
          <BsPeopleFill className="icon" />
        ) : (
          <BsPeople className="icon" />
        )}
        <p>{lang('nav.jamaah')}</p>
      </Link>
      <Link to={'/menu'}>
        {menu === 'menu' ? (
          <RxHamburgerMenu className="icon-active" />
        ) : (
          <RxHamburgerMenu className="icon" />
        )}
        <p>{lang('nav.menu')}</p>
      </Link>
    </Wrapper>
  );
};

export default Navbar;
