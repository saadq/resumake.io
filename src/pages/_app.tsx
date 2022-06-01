import type { AppProps } from 'next/app'
import { GlobalStyle } from '../components/common/GlobalStyle'

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  )
}

export default App
