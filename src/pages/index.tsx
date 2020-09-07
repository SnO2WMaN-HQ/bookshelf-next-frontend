import clsx from 'clsx';
import React, {useState} from 'react';

import {Bookshelf} from '~/components/index/bookshelf/Bookshelf';
import {NavBar} from '~/components/index/navbar/NavBar';

export interface Props {
  className?: string;
  userAgent?: string;
}

export const IndexPage: React.FC<Props> = ({className}) => {
  const [limited, setLimited] = useState(false);
  const [showDetails, setShowDetails] = useState(true);

  return (
    <main className={clsx(className)}>
      <NavBar
        className={clsx('mb-4', 'w-full')}
        limited={limited}
        showDetails={showDetails}
        limitOn={() => setLimited(true)}
        limitOff={() => setLimited(false)}
        toggleShowTitle={() => setShowDetails(!showDetails)}
      />
      <Bookshelf
        className={clsx('mx-auto')}
        limited={limited}
        showDetails={showDetails}
      />
    </main>
  );
};

export default IndexPage;
