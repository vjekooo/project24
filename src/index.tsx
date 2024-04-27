import './index.css'
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import Header from './layout/header/Header'
import { Register } from './pages/Register'
import { Home } from './pages/Home'

const App = (props) => (
  <>
    <Header />
    {props.children}
  </>
)

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
    </Router>
  ),
  document.getElementById('root')
)
