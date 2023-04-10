import type { AppProps } from 'next/app'
import Head from 'next/head'
import { GlobalStyle } from '../components/common/GlobalStyle'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Resumake</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,100,0,0"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
