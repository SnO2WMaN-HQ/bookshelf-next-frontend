import {faInfoCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React, {useState} from 'react';

export interface ContainerProps {
  className?: string;
  showDetails: boolean;
  toggleShowTitle();
}
export type Props = ContainerProps & {};

export const Component: React.FC<Props> = ({
  className,
  showDetails,
  toggleShowTitle,
}) => (
  <div className={clsx(className, 'flex', 'space-x-2')}>
    <div
      className={clsx('cursor-pointer')}
      onClick={toggleShowTitle}
      aria-hidden="true"
    >
      <FontAwesomeIcon
        className={clsx('text-xl', {
          'text-blue-500': showDetails,
          'text-gray-300': !showDetails,
          'hover:text-gray-400': !showDetails,
        })}
        icon={faInfoCircle}
      />
    </div>
  </div>
);

export const ToggleMenu: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
