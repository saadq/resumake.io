import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from '../components/core/GlobalStyle'
import { Provider } from 'react-redux'
import { store } from '../store/store'

import 'bootstrap/dist/css/bootstrap.min.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>Resumake</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}

export default App
