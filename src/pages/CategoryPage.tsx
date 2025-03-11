import { Show, createResource } from 'solid-js'
import { Content } from '../layout/Content'
import { $fetch } from '../utils/fetch'
import { Category } from '../types'
import { Stack } from '../ui/Stack'
import { A } from '@solidjs/router'

const fetchData = async () => {
  return await $fetch<{}, Category[]>('category').get()
}

export const CategoryPage = () => {
  const [categories] = createResource(fetchData)

  return (
    <Content>
      <Stack size="xl">
        <h1>Categories</h1>
        <Show when={categories()?.data} fallback={<div>Loading...</div>}>
          <div class="default-grid">
            {categories()?.data.map((category) => {
              const encodedCategory = encodeURIComponent(category.name)
              return (
                <Stack>
                  <A
                    href={`/search?category=${encodedCategory}`}
                    class="text-lg font-semibold"
                  >
                    {category.name}
                  </A>
                  {category.subCategories?.map((subCategory) => {
                    const encodedSubCategory = encodeURIComponent(
                      subCategory.name
                    )
                    return (
                      <A
                        href={`/search?subCategory=${encodedSubCategory}`}
                        class=""
                      >
                        {subCategory.name}
                      </A>
                    )
                  })}
                </Stack>
              )
            })}
          </div>
        </Show>
      </Stack>
    </Content>
  )
}
