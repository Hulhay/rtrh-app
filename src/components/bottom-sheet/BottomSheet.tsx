import React, { useEffect } from 'react';

import { BgBottomSheet } from './BottomSheet.styles';
import { useBottomSheet } from '../../hooks';

interface BottomSheetProps {
  active: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = (props) => {
  const { ref } = useBottomSheet({
    active: props.active,
    onClose: props.onClose,
  });

  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = props.active ? 'hidden' : 'auto';
    }
  }, [props.active]);

  return (
    <React.Fragment>
      <div>{props.active && <BgBottomSheet />}</div>
      <div ref={ref}>{props.children}</div>
    </React.Fragment>
  );
};

export default BottomSheet;
