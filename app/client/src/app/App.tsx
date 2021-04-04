import { BrowserRouter, Route } from 'react-router-dom'
import { GlobalStyle } from './GlobalStyle'
import { Home } from '../home/Home'
import { About } from '../about/About'
import { Generator } from '../generator/Generator'

export function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route path="/generator" component={Generator} />
      </BrowserRouter>
    </>
  )
}
