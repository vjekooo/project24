import './index.css'
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import Header from './layout/header/Header'
import { Register } from './pages/Register'
import { Home } from './pages/Home'
import { createContext } from 'solid-js'
import { Account } from './pages/Account'
import { Store } from './pages/Store'
import Login from './layout/header/Login'

export interface User {
  firstName: string
  lastName: string
  email: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

interface ContextState {
  state: { user: Account; token: string }
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
        <Header />
        {props.children}
      </div>
    </AppContext.Provider>
  )
}

render(
  () => (
    <Router root={App}>
      <Route path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/user" component={Account} />
      <Route path="/store" component={Store} />
    </Router>
  ),
  document.getElementById('root')
)
