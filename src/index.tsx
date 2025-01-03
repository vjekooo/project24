import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import { ErrorBoundary, JSX, createContext } from 'solid-js'

import './index.css'
import { HomePage } from './pages/HomePage'
import { Account } from './pages/account/Account'
import { Store } from './pages/Store'
import { User } from './types'
import { ConfirmRegistration } from './pages/ConfirmRegistration'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { UserStore } from './pages/account/UserStore'
import { Product } from './pages/Product'

interface State {
  user: User
  token: string
}

interface ContextState {
  state: { user: User; token: string }
  setState: (state: State) => void
}

export const AppContext = createContext<ContextState>()

interface Props {
  children?: JSX.Element
}

const App = (props: Props) => {
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
        <Header />
        {props.children}
        <Footer />
      </div>
    </AppContext.Provider>
  )
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={HomePage} />
      <Route path="/account" component={Account} />
      <Route path="/account/store/:id" component={UserStore} />
      <Route path="/store/:id" component={Store} />
      <Route path="/product/:id" component={Product} />
      <Route path="/confirm-registration" component={ConfirmRegistration} />
    </Router>
  ),
  document.getElementById('root')
)
