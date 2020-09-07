import clsx from 'clsx';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Merge} from 'type-fest';

import {GetBookQuery} from '~~/generated/graphql';

export type ContainerProps = {
  className?: string;
  isbn?: string;
  publishedAt?: string;
} & Pick<GetBookQuery['book'], 'price'>;
export type Props = Merge<
  ContainerProps,
  {
    price?: string | null;
    isbn?: string | null;
    publishedAt?: string;
    i18n: {[key in 'isbn' | 'price' | 'publishedAt']: string};
  }
>;

export const Component: React.FC<Props> = ({
  className,
  price,
  isbn,
  publishedAt,
  i18n,
}) => (
  <table className={clsx('table-auto')}>
    <tbody>
      {price && (
        <tr>
          <td className={clsx('pr-4')}>
            <span className={clsx('text-sm', 'font-bold')}>{i18n.price}</span>
          </td>
          <td>
            <span>{price}</span>
          </td>
        </tr>
      )}
      {isbn && (
        <tr>
          <td className={clsx('pr-4')}>
            <span className={clsx('text-sm', 'font-bold')}>{i18n.isbn}</span>
          </td>
          <td>
            <span className={clsx('select-all')}>{isbn}</span>
          </td>
        </tr>
      )}
      {publishedAt && (
        <tr>
          <td className={clsx('pr-4')}>
            <span className={clsx('text-sm', 'font-bold')}>
              {i18n.publishedAt}
            </span>
          </td>
          <td>
            <time>{publishedAt}</time>
          </td>
        </tr>
      )}
    </tbody>
  </table>
);

export const Table: React.FC<ContainerProps> = ({
  isbn,
  publishedAt,
  price,
  ...props
}) => {
  const {t} = useTranslation();

  return (
    <Component
      {...props}
      isbn={isbn && t('pages:book.details.display.isbn', {isbn})}
      price={
        price &&
        t('pages:book.details.display.price', {
          calculated: t('currency', {value: price.calculated}),
          base: t('currency', {value: price.base}),
          tax: price.tax && t('currency', {value: price.tax}),
          context: Boolean(price.tax) && 'detail',
        })
      }
      publishedAt={
        publishedAt &&
        t('pages:book.details.display.published_at', {
          date: new Date(publishedAt),
        })
      }
      i18n={{
        isbn: t('pages:book.details.title.isbn'),
        price: t('pages:book.details.title.price'),
        publishedAt: t('pages:book.details.title.published_at'),
      }}
    />
  );
};
