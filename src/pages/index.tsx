import clsx from 'clsx';
import React from 'react';

import {useBooksQuery} from '~/generated/graphql';

export interface Props {
  className?: string;
  userAgent?: string;
}

export const Component: React.FC<Props> = ({className}) => {
  const {data, loading, error} = useBooksQuery();

  return (
    <main className={clsx(className)}>
      <ul
        className={clsx(
          'grid',
          'grid-cols-1',
          'lg:grid-cols-8',
          'lg:grid-cols-12',
          'gap-2',
        )}
      >
        {!loading &&
          data.manyBooks.map(({title, id, cover}) => (
            <li key={id}>
              <img
                className={clsx('select-none', 'pointer-events-none')}
                src={cover}
                alt={title}
              />
              <p className={clsx('text-sm', 'truncate')}>{title}</p>
            </li>
          ))}
      </ul>
    </main>
  );
};

export default Component;
