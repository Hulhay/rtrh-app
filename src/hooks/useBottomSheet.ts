import { useCallback, useEffect, useRef } from 'react';

interface UseBottomSheetType {
  active: boolean;
  onClose: () => void;
}

export const useBottomSheet = (props: UseBottomSheetType) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const closeBottomSheet = () => {
    if (props.onClose) {
      props.onClose();
    }
  };

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeBottomSheet();
    }
  }, []);

  useEffect(() => {
    console.log(props.active, '<<ac');
  }, [props.active]);

  useEffect(() => {
    if (props.active) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, [props.active, handleOutsideClick]);

  return { ref };
};
