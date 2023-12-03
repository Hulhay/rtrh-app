import React from 'react';
import { BackToHomeBtn, Title, Wrapper } from './NotFound.styles';
import { lang } from '../../constants';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Wrapper>
      <Title>{lang('not_found.title')}</Title>
      <Link to={'/'}>
        <BackToHomeBtn>{lang('not_found.back')}</BackToHomeBtn>
      </Link>
    </Wrapper>
  );
};

export default NotFound;
