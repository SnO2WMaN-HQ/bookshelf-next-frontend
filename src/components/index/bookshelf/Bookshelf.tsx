import {faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, {useEffect, useRef, useState} from 'react';
import {useIntersection, useMeasure, useWindowSize} from 'react-use';

import {BookLink} from './BookLink';

import {useBooksQuery} from '~~/generated/graphql';

export interface ContainerProps {
  className?: string;

  limited: boolean;
  showDetails: boolean;
}
export type Props = ContainerProps & {
  books: {
    id: string;
    title: string;
    cover?: string;
  }[];
};

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
      <BookLink key={id} bookId={id} {...other} showDetails={showDetails} />
    ))}
  </ul>
);

export const Bookshelf: React.FC<ContainerProps> = (props) => {
  const {data, loading, error, fetchMore, variables} = useBooksQuery({
    variables: {page: 1},
    fetchPolicy: 'cache-and-network',
  });

  const {height: windowHeight} = useWindowSize();
  const [ref, {height}] = useMeasure<HTMLDivElement>();

  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px 0px 25% 0px',
  });

  const [hasNext, setHasNext] = useState(false);

  useEffect(() => {
    setHasNext(data?.manyBooks.pageInfo.hasNextPage || false);
  }, [data?.manyBooks.pageInfo.hasNextPage]);

  useEffect(
    () => {
      if (height < windowHeight) {
        paginate();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [height, windowHeight],
  );

  useEffect(
    () => {
      if (intersection && intersection.isIntersecting) {
        paginate();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [intersection],
  );
  function paginate() {
    if (!loading && hasNext)
      fetchMore({
        variables: {page: data?.manyBooks.pageInfo.nextPage},
        updateQuery(prev, {fetchMoreResult}) {
          if (!fetchMoreResult) return prev;
          fetchMoreResult.manyBooks.docs.unshift(...prev.manyBooks.docs);
          return {...prev, ...fetchMoreResult};
        },
      });
  }

  return (
    <>
      <div ref={ref}>
        <Component
          {...props}
          books={
            data?.manyBooks.docs.map(({id, title, cover}) => ({
              id,
              title,
              cover: cover ? cover : undefined,
            })) || []
          }
        />
      </div>
      {(loading || data?.manyBooks.pageInfo.hasNextPage) && (
        <div
          ref={intersectionRef}
          className={clsx(
            'flex',
            'justify-center',
            'items-center',
            'w-16',
            'h-16',
            'mx-auto',
          )}
        >
          <FontAwesomeIcon
            icon={faCircleNotch}
            className={clsx('text-4xl', 'text-blue-500')}
            spin
          />
        </div>
      )}
    </>
  );
};
