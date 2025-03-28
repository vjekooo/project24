import { useLocation, useNavigate } from '@solidjs/router'

import { $fetch } from '~/utils/fetch'
import { Content } from '~/layout/Content'

export default function ConfirmRegistration() {
  const location = useLocation()
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(location.search)
  const token = queryParams.get('token')

  const handleSubmit = () => {
    $fetch(`auth/confirm-registration?token=${token}`)
      .get()
      .then((data) => {
        navigate('/login')
      })
  }

  return (
    <Content>
      <h1>Confirmation</h1>
      <button class="btn-primary" onClick={() => handleSubmit()}>
        Confirm
      </button>
    </Content>
  )
}
