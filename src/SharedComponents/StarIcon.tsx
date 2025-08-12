// components/StarIcon.tsx
import React from 'react';

interface StarIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  style?: React.CSSProperties;
}

const StarIcon: React.FC<StarIconProps> = ({ className, style, ...props }) => (
  <svg
    className={className}
    style={style}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Replace the path below with your actual Star.svg content */}
    <path d="M12 2l3.09 6.26L22 9.27l-5.46 5.32L17.91 22 12 18.27 6.09 22l1.45-7.41L2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default StarIcon;
