import clsx from 'clsx';
import React from 'react';
import Link from 'next/link';

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
  <div
    className={clsx(
      className,
      'flex',
      'flex-col',
      'bg-white',
      'shadow',
      'hover:shadow-md',
    )}
  >
    <Link href="/books/[id]" as={`/books/${id}`}>
      <a
        className={clsx(
          'flex-grow',
          'flex',
          'flex-col',
          'justify-center',
          'bg-gray-200',
        )}
      >
        <img
          className={clsx('select-none', 'pointer-events-none', 'text-xs')}
          src={cover}
          alt={title}
        />
      </a>
    </Link>
    {showDetails && (
      <div className={clsx('p-1')}>
        <p className={clsx('text-xs', 'select-all', {truncate: true})}>
          {title}
        </p>
      </div>
    )}
  </div>
);

export const BookLink: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
