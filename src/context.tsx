import { createContext, JSX, useContext } from 'solid-js'
import { createStore } from 'solid-js/store'
import { User } from '~/types'

interface State {
  user?: User
  isAuthenticated: boolean
}

type AppContextType = [
  State,
  {
    updateUser(user: User): void
    updateIsAuthenticated(isAuthenticated: boolean): void
  },
]

const AppContext = createContext<AppContextType>({} as AppContextType)

interface Props {
  children: JSX.Element
}

export function AppContextProvider(props: Props) {
  const [state, setState] = createStore<State>({
    isAuthenticated: false,
  })
  const contextState: AppContextType = [
    state,
    {
      updateUser(user: User) {
        setState((prev) => {
          return { ...prev, user }
        })
      },
      updateIsAuthenticated(isAuthenticated: boolean) {
        setState((prev) => {
          return { ...prev, isAuthenticated }
        })
      },
    },
  ]

  return (
    <AppContext.Provider value={contextState}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppState() {
  return useContext(AppContext)
}
