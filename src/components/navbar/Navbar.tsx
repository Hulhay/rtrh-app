import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from './Navbar.styles';
import {
  BsCalendarEvent,
  BsCalendarEventFill,
  BsPeople,
  BsPeopleFill,
} from 'react-icons/bs';
import { RiQrScanFill, RiQrScanLine } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import { useScroll } from '../../hooks';

const Navbar: React.FC = () => {
  const loc = useLocation();
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
      <Link to={'/kajian'}>
        {loc.pathname === '/kajian' ? (
          <BsCalendarEventFill className="icon" />
        ) : (
          <BsCalendarEvent className="icon" />
        )}
      </Link>
      <Link to={'/scan'}>
        {loc.pathname === '/scan' ? (
          <RiQrScanFill className="icon" />
        ) : (
          <RiQrScanLine className="icon" />
        )}
      </Link>
      <Link to={'/jamaah'}>
        {loc.pathname === '/jamaah' ? (
          <BsPeopleFill className="icon" />
        ) : (
          <BsPeople className="icon" />
        )}
      </Link>
    </Wrapper>
  );
};

export default Navbar;
