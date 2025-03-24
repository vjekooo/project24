import { MetaProvider, Title } from '@solidjs/meta'
import { Router } from '@solidjs/router'
import { FileRoutes } from '@solidjs/start/router'
import { Suspense } from 'solid-js'

import { Header } from '~/layout/Header'
import { Footer } from '~/layout/Footer'
import { AppContextProvider } from '~/context'
import './app.css'

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Local Link</Title>
          <AppContextProvider>
            <Header />
            <Suspense>{props.children}</Suspense>
            <Footer />
          </AppContextProvider>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
