import React, { useEffect, useState } from 'react';
import { Wrapper } from './Header.styles';
import { useScroll } from '../../hooks';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = (props) => {
  const scroll = useScroll();
  const [position, setPosition] = useState<string>('static');

  useEffect(() => {
    setPosition(scroll.y > 85 ? 'fixed' : 'static');
  }, [scroll]);

  return (
    <Wrapper className={position}>
      <h1>{props.title}</h1>
    </Wrapper>
  );
};

export default Header;
