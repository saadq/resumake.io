import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from './home/Home'
import { About } from './about/About'
import { Generator } from './generator/Generator'
import { GlobalStyle } from './common/GlobalStyle'
import { useDevtools } from '../hooks/useDevtools'

export function App() {
  useDevtools()

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/generator/*" element={<Generator />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
