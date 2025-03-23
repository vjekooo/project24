import { Title } from '@solidjs/meta'
import { HttpStatusCode } from '@solidjs/start'
import { Content } from '~/layout/Content'

export default function NotFound() {
  return (
    <main>
      <Title>Not Found</Title>
      <HttpStatusCode code={404} />
      <Content>
        <h1>Page Not Found</h1>
      </Content>
    </main>
  )
}
