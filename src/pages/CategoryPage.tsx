import { createResource } from 'solid-js'
import { Content } from '../layout/Content'
import { $fetch } from '../utils/fetch'
import { Category } from '../types'
import { Stack } from '../ui/Stack'

const fetchData = async () => {
  return await $fetch<{}, Category[]>('category').get()
}

export const CategoryPage = () => {
  const [categories] = createResource(fetchData)

  return (
    <Content>
      <h1>Category</h1>
      <Stack gap={6}>
        {categories()?.data.map((category) => {
          return (
            <Stack>
              <h3>{category.name}</h3>
            </Stack>
          )
        })}
      </Stack>
    </Content>
  )
}
