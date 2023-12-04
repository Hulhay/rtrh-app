import React, { useEffect, useState } from 'react';
import { lang } from '../../../../constants';
import { useScroll } from '../../../../hooks';
import { Wrapper } from './Header.styles';

const Header: React.FC = () => {
  const scroll = useScroll();
  const [position, setPosition] = useState<string>('static');

  useEffect(() => {
    setPosition(scroll.y > 85 ? 'fixed' : 'static');
  }, [scroll]);

  return (
    <Wrapper className={position}>
      <h1>{lang('kajian.header')}</h1>
    </Wrapper>
  );
};

export default Header;
