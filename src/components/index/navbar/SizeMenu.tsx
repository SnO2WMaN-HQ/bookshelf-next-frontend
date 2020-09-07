import clsx from 'clsx';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTh, faThLarge} from '@fortawesome/free-solid-svg-icons';

import {useBooksQuery} from '~~/generated/graphql';

export interface ContainerProps {
  className?: string;

  limited: boolean;
  limitOn();
  limitOff();
}
export type Props = ContainerProps & {};

export const Component: React.FC<Props> = ({
  className,
  limited,
  limitOn,
  limitOff,
}) => (
  <div className={clsx(className, 'flex', 'space-x-2')}>
    <div
      className={clsx('cursor-pointer')}
      onClick={limitOn}
      aria-hidden="true"
    >
      <FontAwesomeIcon
        className={clsx('text-xl', {
          'text-blue-500': limited,
          'text-gray-300': !limited,
          'hover:text-gray-400': !limited,
        })}
        icon={faThLarge}
      />
    </div>
    <div
      className={clsx('cursor-pointer')}
      onClick={limitOff}
      aria-hidden="true"
    >
      <FontAwesomeIcon
        className={clsx('text-xl', {
          'text-blue-500': !limited,
          'text-gray-300': limited,
          'hover:text-gray-400': limited,
        })}
        icon={faTh}
      />
    </div>
  </div>
);

export const SizeMenu: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
