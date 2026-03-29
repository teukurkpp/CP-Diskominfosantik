import React from 'react';

interface TitleProps {
  order: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ order, className, children }) => {
  const Tag = `h${order}`;
  return React.createElement(Tag, { className }, children);
};

export default Title;
