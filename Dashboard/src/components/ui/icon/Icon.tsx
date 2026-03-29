import React from 'react';

interface IconProps {
  icon: string;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ icon, className, size }) => {
  // This is a placeholder component. In a real application, you would
  // dynamically load SVG icons based on the 'icon' prop or use a sprite.
  // For now, it will just render a div with the icon name.
  return (
    <div className={className} style={{ fontSize: size }}>
      {/* Placeholder for icon: {icon} */}
      {/* You would typically render an SVG here */}
    </div>
  );
};

export default Icon;
