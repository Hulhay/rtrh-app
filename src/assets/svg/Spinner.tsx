import React from 'react';

const Spinner: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="50px"
      height="50px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <circle
        cx="50"
        cy="50"
        fill="none"
        stroke="#000000"
        opacity={0.5}
        strokeWidth="8"
        r="24"
        strokeDasharray="113.09733552923255 39.69911184307752"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          repeatCount="indefinite"
          dur="1.1363636363636365s"
          values="0 50 50;360 50 50"
          keyTimes="0;1"
        ></animateTransform>
      </circle>
    </svg>
  );
};

export default Spinner;
