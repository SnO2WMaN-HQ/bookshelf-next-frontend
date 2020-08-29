import clsx from 'clsx';
import React from 'react';

export interface Props {
  className?: string;
  userAgent?: string;
}

export const Component: React.FC<Props> = ({className}) => {
  return <main className={clsx(className)} />;
};

export default Component;
