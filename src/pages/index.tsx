import clsx from 'clsx';
import React, {useState} from 'react';

import {Bookshelf} from '~/components/index/bookshelf/Bookshelf';
import {NavBar} from '~/components/index/navbar/NavBar';
import {useBooksQuery} from '~/generated/graphql';

export interface Props {
  className?: string;
  userAgent?: string;
}

export const IndexPage: React.FC<Props> = ({className}) => {
  const {data, loading, error} = useBooksQuery();

  const [limited, setLimited] = useState(true);
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
      {!loading && (
        <Bookshelf
          className={clsx('mx-auto')}
          books={data.manyBooks}
          limited={limited}
          showDetails={showDetails}
        />
      )}
    </main>
  );
};

export default IndexPage;
