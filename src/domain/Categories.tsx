import { Show } from 'solid-js'

import { Content } from '~/layout/Content'
import { Stack } from '~/ui/Stack'
import { A } from '@solidjs/router'
import { Category } from '~/types'

interface Props {
  categories?: Category[]
}

export const Categories = (props: Props) => {
  if (!props.categories) {
    return null
  }

  return (
    <Content>
      <Stack size="xl">
        <h1>Categories</h1>
        <Show when={props.categories.length} fallback={''}>
          <div class="default-grid">
            {props.categories.map((category) => {
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
