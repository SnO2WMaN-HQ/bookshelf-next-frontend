import clsx from 'clsx';
import React from 'react';

import {Book} from './Book';

export interface ContainerProps {
  className?: string;

  books: {id: string; title: string; cover?: string}[];
  limited: boolean;
  showDetails: boolean;
}
export type Props = ContainerProps & {};

export const Component: React.FC<Props> = ({
  className,
  limited,
  books,
  showDetails,
}) => (
  <ul
    className={clsx(className, 'grid', 'grid-cols-3', 'gap-2', {
      // limited
      'sm:max-w-screen-sm': limited,
      'md:max-w-screen-md': limited,
      'lg:max-w-screen-lg': limited,
      'xl:max-w-screen-xl': limited,
      'sm:grid-cols-5': limited,
      'md:grid-cols-6': limited,
      'lg:grid-cols-7': limited,
      'xl:grid-cols-8': limited,
      'uxl:grid-cols-10': limited,
      // unlimited
      'max-w-full': !limited,
      'sm:grid-cols-6': !limited,
      'md:grid-cols-8': !limited,
      'lg:grid-cols-10': !limited,
      'xl:grid-cols-12': !limited,
      'uxl:grid-cols-16': !limited,
      'px-4': !limited,
    })}
  >
    {books.map(({id, ...other}) => (
      <Book key={id} bookId={id} {...other} showDetails={showDetails} />
    ))}
  </ul>
);

export const Bookshelf: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
