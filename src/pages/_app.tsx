import {AppProps} from 'next/app';
import React from 'react';
import '~/i18n';
import '~/styles/index.css';
import '~/styles/tailwind.css';
import {ApolloProvider} from '@apollo/react-hooks';

import {createApolloClient} from '~/apollo/client';

export type Props = AppProps;
export const App: React.FC<Props> = ({Component, pageProps}) => {
  return (
    <ApolloProvider client={createApolloClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
