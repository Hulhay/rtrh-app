import React from 'react';
import { Wrapper } from './Loading.styles';
import Spinner from '../../assets/svg/Spinner';

export interface LoadingProps {
  midScreen?: boolean;
}

const Loading: React.FC<LoadingProps> = (props) => {
  return (
    <Wrapper className={props.midScreen ? 'mid-screen' : ''}>
      <Spinner />
    </Wrapper>
  );
};

export default Loading;
