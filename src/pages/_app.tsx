import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from '../components/core/GlobalStyle'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Resumake</title>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
