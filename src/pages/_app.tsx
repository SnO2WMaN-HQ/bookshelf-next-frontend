import {AppProps} from 'next/app';
import React from 'react';
import '~/i18n';
import '~/styles/tailwind.css';

export type Props = AppProps;
export const App: React.FC<Props> = ({Component, pageProps}) => {
  return <Component {...pageProps} />;
};

export default App;
