import { useEffect, useState } from 'react';

interface PositionType {
  y: number;
  curY: number;
}

export const useScroll = () => {
  const [position, setPosition] = useState<PositionType>({
    y: 0,
    curY: 0,
  });

  const handleScroll = () => {
    setPosition((current) => {
      return {
        y: window.scrollY,
        curY: current.y,
      };
    });
  };

  useEffect(() => {
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return position;
};
