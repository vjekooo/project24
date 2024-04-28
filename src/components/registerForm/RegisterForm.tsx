import { createResource, createSignal } from 'solid-js'

const url = 'http://0.0.0.0:8080/api/auth/register'

const fetchUser = async (formData) => {
  console.log(formData)
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(formData),
  })
  return response.json()
}

export const RegisterForm = () => {
  const [formData, setFormData] = createSignal({})
  const [fetchData, setFetchData] = createSignal(false)

  const [data] = createResource(fetchData, () => fetchUser(formData()))

  return (
    <div class="flex justify-center">
      <div class="flex flex-col gap-2">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setFetchData(!fetchData())
          }}
        >
          <input
            class="input"
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData(), email: e.target.value })
            }
          />
          <input
            class="input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData(), password: e.target.value })
            }
          />
          <button class="btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
