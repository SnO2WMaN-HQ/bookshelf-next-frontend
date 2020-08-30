import clsx from 'clsx';
import React from 'react';

export interface ContainerProps {
  className?: string;

  bookId: string;
  title: string;
  cover?: string;

  showDetails: boolean;
}
export type Props = ContainerProps & {};

export const Component: React.FC<Props> = ({
  className,
  title,
  bookId: id,
  cover,
  showDetails,
}) => (
  <div className={clsx(className, 'flex', 'flex-col')}>
    <img
      className={clsx(
        'flex-grow',
        'select-none',
        'pointer-events-none',
        'text-xs',
      )}
      src={cover}
      alt={title}
    />
    {showDetails && (
      <>
        <p className={clsx('text-xs', 'select-all', {truncate: true})}>
          {title}
        </p>
      </>
    )}
  </div>
);

export const Book: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
