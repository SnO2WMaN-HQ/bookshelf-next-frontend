import clsx from 'clsx';
import React from 'react';

import {ToggleMenu} from '~/components/index/navbar/ToggleMenu';
import {SizeMenu} from '~/components/index/navbar/SizeMenu';

export interface ContainerProps {
  className?: string;

  showDetails: boolean;
  limited: boolean;

  toggleShowTitle();
  limitOn();
  limitOff();
}
export type Props = ContainerProps & {};

export const Component: React.FC<Props> = ({
  className,
  showDetails,
  toggleShowTitle,

  limited,
  limitOn,
  limitOff,
}) => (
  <nav className={clsx(className, 'bg-gray-100', 'py-4')}>
    <div
      className={clsx(
        'space-x-4',
        'flex',
        'items-center',
        'mx-auto',
        'sm:max-w-screen-sm',
        'md:max-w-screen-md',
        'lg:max-w-screen-lg',
        'xl:max-w-screen-xl',
      )}
    >
      <SizeMenu limited={limited} limitOn={limitOn} limitOff={limitOff} />
      <ToggleMenu showDetails={showDetails} toggleShowTitle={toggleShowTitle} />
    </div>
  </nav>
);

export const NavBar: React.FC<ContainerProps> = (props) => {
  return <Component {...props} />;
};
