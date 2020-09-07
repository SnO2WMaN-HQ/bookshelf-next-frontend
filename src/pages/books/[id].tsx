import clsx from 'clsx';
import {useRouter} from 'next/router';
import React from 'react';

import {Table} from '~/components/book/BookDetail';
import {useGetBookQuery} from '~~/generated/graphql';

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
              <Table
                {...data.book}
                price={data.book?.price || undefined}
                isbn={data.book?.isbn || undefined}
                publishedAt={data.book?.publishedAt || undefined}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default BookPage;
