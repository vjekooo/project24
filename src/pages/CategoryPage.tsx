import { createResource } from 'solid-js'
import { Content } from '../layout/Content'
import { $fetch, FetchData } from '../utils/fetch'
import { Category } from '../types'
import { Stack } from '../ui/Stack'

const fetchData = async () => {
  return await $fetch<{}, Category[]>('category').get()
}

export const CategoryPage = () => {
  const [categories] = createResource<FetchData<Category[]>>(fetchData)

  const data = (
    <Stack gap={6}>
      {categories()?.data.map((category) => (
        <Stack>
          <h3>{category.name}</h3>
        </Stack>
      ))}
    </Stack>
  )

  return (
    <Content>
      <h1>Categories</h1>
      {categories()?.data && data}
    </Content>
  )
}
