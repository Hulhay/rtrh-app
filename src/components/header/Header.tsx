import React, { useEffect, useState } from 'react';
import { Wrapper } from './Header.styles';
import { IoIosArrowBack } from 'react-icons/io';
import { useScroll } from '../../hooks';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  backEnabledTo?: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const scroll = useScroll();
  const [position, setPosition] = useState<string>('static');

  useEffect(() => {
    setPosition(scroll.y > 85 ? 'fixed' : 'static');
  }, [scroll]);

  return (
    <Wrapper className={position}>
      {props.backEnabledTo && (
        <Link to={props.backEnabledTo}>
          <IoIosArrowBack className="icon" />
        </Link>
      )}
      <h1>{props.title}</h1>
    </Wrapper>
  );
};

export default Header;
