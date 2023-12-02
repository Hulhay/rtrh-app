import React, { useCallback, useEffect, useState } from 'react';
import { Wrapper } from './AddButton.styles';
import { IoAdd } from 'react-icons/io5';
import { useScroll } from '../../../../hooks';

interface AddButtonProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const AddButton: React.FC<AddButtonProps> = (props) => {
  const scroll = useScroll();

  const [shift, setShift] = useState<string>('');

  const handleScroll = useCallback(() => {
    setShift(scroll.y > 50 && scroll.y - scroll.curY > 0 ? 'shift' : '');
  }, [scroll.y, scroll.curY]);

  useEffect(() => {
    handleScroll();
  }, [scroll.y, scroll.curY]);

  return (
    <Wrapper className={shift} onClick={props.onClick}>
      <IoAdd className="icon" />
    </Wrapper>
  );
};

export default AddButton;
