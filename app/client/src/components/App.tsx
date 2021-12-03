import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClientProvider } from 'react-query'
import { Home } from './home/Home'
import { About } from './about/About'
import { Generator } from './generator/Generator'
import { GlobalStyle } from './common/GlobalStyle'
import { useDevtools } from '../hooks/useDevtools'
import { queryClient } from '../api/client'

export function App() {
  useDevtools()

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/*" element={<About />} />
          <Route path="/generator/*" element={<Generator />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
