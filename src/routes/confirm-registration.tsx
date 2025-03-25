import { clientOnly } from '@solidjs/start'

const ConfirmRegistrationClient = clientOnly(
  () => import('../domain/ConfirmRegistration')
)

export default function ConfirmRegistration() {
  return (
    <main>
      <ConfirmRegistration />
    </main>
  )
}
