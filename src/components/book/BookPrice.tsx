import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, {useState} from 'react';
import {Merge} from 'type-fest';
import {useTranslation} from 'react-i18next';

export interface ContainerProps {
  className?: string;

  base: {value: number; currency: string};
  tax?: {value: number; currency: string};
  calculated: {value: number; currency: string};
}
export type Props = Merge<
  ContainerProps,
  {
    calculated: string;
    detail?: string;
  }
>;

export const Component: React.FC<Props> = ({className, calculated, detail}) => (
  <p className={clsx(className)}>
    <span>{calculated}</span>
    {detail && <span>{detail}</span>}
  </p>
);

export const BookPrice: React.FC<ContainerProps> = (props) => {
  const {t, i18n} = useTranslation();

  const {calculated, base, tax} = props;

  const localizedCalculated = currencyFormatter(
    i18n.language,
    calculated.currency,
  ).format(calculated.value);
  const localizedBase = currencyFormatter(i18n.language, base.currency).format(
    base.value,
  );
  const localizedTax =
    tax &&
    tax.value !== 0 &&
    currencyFormatter(i18n.language, tax.currency).format(tax.value);

  const detail = localizedTax
    ? `(本体価格${localizedBase} + 税${localizedTax})`
    : `(本体価格${localizedBase})`;

  return (
    <Component {...props} calculated={localizedCalculated} detail={detail} />
  );
};

export function currencyFormatter(locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: currency === 'JPY' ? 'name' : 'narrowSymbol',
  });
}
