import clsx from 'clsx';
import React, {useState} from 'react';
import {useRouter} from 'next/router';
import DefaultErrorPage from 'next/error';

import {useBooksQuery, useGetBookQuery} from '~/generated/graphql';
import {BookPrice} from '~/components/book/BookPrice';

export interface Props {
  className?: string;
  userAgent?: string;
}

export const BookPage: React.FC<Props> = ({className}) => {
  const router = useRouter();
  const {id: bookID} = router.query;

  const {data, loading, error} = useGetBookQuery({
    variables: {id: bookID as string},
  });

  return (
    <main className={clsx(className)}>
      <div
        className={clsx(
          'mx-auto',
          'max-w-screen-xl',
          'grid',
          'grid-cols-4',
          'pt-12',
        )}
      >
        <div className={clsx('col-span-1', 'px-8')}>
          {!loading && data && (
            <>
              <div className={clsx()}>
                {data.book.cover && (
                  <img
                    className={clsx('mx-auto')}
                    src={data.book.cover}
                    alt={data.book.title}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className={clsx('col-span-3')}>
          {!loading && data && (
            <div
              className={clsx(
                'flex',
                'flex-col',
                'justify-start',
                'items-start',
                'space-y-4',
              )}
            >
              <h1
                className={clsx(
                  'text-xl',
                  'font-bold',
                  'tracking-wide',
                  'select-all',
                )}
              >
                {data.book.title}
              </h1>
              <table className={clsx('table-auto')}>
                <tbody>
                  {data.book.price && (
                    <tr>
                      <td className={clsx('pr-4')}>
                        <span className={clsx('text-sm', 'font-bold')}>
                          定価
                        </span>
                      </td>
                      <td>
                        <BookPrice
                          className={clsx('text-sm')}
                          {...data.book.price}
                        />
                      </td>
                    </tr>
                  )}
                  {data.book.latestVersion?.isbn && (
                    <tr>
                      <td className={clsx('pr-4')}>
                        <span className={clsx('text-sm', 'font-bold')}>
                          ISBN
                        </span>
                      </td>
                      <td>
                        <span className={clsx('text-sm', 'select-all')}>
                          {data.book.latestVersion?.isbn}
                        </span>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookPage;
