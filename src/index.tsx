import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import { createContext } from 'solid-js'

import './index.css'
import { Home } from './pages/Home'
import { Account } from './pages/Account'
import { Store } from './pages/Store'
import { User } from './types'
import { ConfirmRegistration } from './pages/ConfirmRegistration'
import { Navbar } from './layout/Navbar'
import { Footer } from './layout/Footer'
import { Hero } from './layout/Hero'

interface ContextState {
  state: { user: User; token: string }
  setState: (state) => void
}

export const AppContext = createContext<ContextState>()

const App = (props) => {
  const [state, setState] = createStore({
    user: {
      firstName: '',
      lastName: '',
      email: '',
    },
    token: localStorage.getItem('token'),
  })

  return (
    <AppContext.Provider value={{ state, setState }}>
      <div class="laptop:container laptop:m-auto">
        <Navbar />
        <Hero />
        {props.children}
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/account" component={Account} />
      <Route path="/store" component={Store} />
      <Route path="/confirm-registration" component={ConfirmRegistration} />
    </Router>
  ),
  document.getElementById('root')
)
