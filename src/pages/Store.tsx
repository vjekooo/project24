import { createResource } from 'solid-js'
import { $fetch } from '../utils/fetch'

const url = 'http://0.0.0.0:8080/api/store'

const getStore = async () => {
  return $fetch(url).get()
}

export const Store = () => {
  const [data] = createResource(url, getStore)

  return <div>Store</div>
}
