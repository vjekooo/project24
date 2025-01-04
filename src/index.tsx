import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import { createStore } from 'solid-js/store'
import { ErrorBoundary, JSX, createContext } from 'solid-js'

import './index.css'
import { HomePage } from './pages/HomePage'
import { AccountPage } from './pages/account/AccountPage'
import { StorePage } from './pages/StorePage'
import { User } from './types'
import { ConfirmRegistration } from './pages/ConfirmRegistration'
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { UserStorePage } from './pages/account/UserStorePage'
import { ProductPage } from './pages/ProductPage'
import { SearchPage } from './pages/SearchPage'

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

  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

  const script = document.createElement('script')
  script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&v=weekly`
  script.async = true
  document.body.appendChild(script)

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
      <Route path="/account" component={AccountPage} />
      <Route path="/account/store/:id" component={UserStorePage} />
      <Route path="/store/:id" component={StorePage} />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/confirm-registration" component={ConfirmRegistration} />
      <Route path="/search" component={SearchPage} />
    </Router>
  ),
  document.getElementById('root')
)
