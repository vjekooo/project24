import {
  Category,
  Option,
  Product,
  ProductRequest,
  Store,
} from '../../../types'
import { productConfig as config } from './config'
import { Stack } from '../../../ui/Stack'
import { Accessor, For, createEffect, createSignal } from 'solid-js'
import { ErrorMessage } from '../../../ui/ErrorMessage'
import { Toast } from '../../../lib/Toast'
import { RequestMethod, useMultipart } from '../../../hooks/useMultipart'
import MultiSelect from '../storeForm/MultiSelect'

const url = 'product'

interface Props {
  store: Store
  product?: Accessor<Product>
  categories: Category[]
  onClose: (message: string) => void
}

const createSubCategories = (categories: Category[]): Option[] => {
  if (!categories) return []
  const subCategories: Category[] = []
  categories.map((category) => {
    if (category?.subCategories) {
      subCategories.push(...category.subCategories)
    }
  })
  return subCategories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
}

export const ProductForm = (props: Props) => {
  const store = props.store
  const product = props.product
  const onClose = props.onClose

  const [formState, setFormState] = createSignal<ProductRequest>({
    name: '',
    description: '',
    price: 0,
    existingImages: [],
    category: [],
  })

  createEffect(() => {
    if (product()) {
      setFormState({
        name: product()?.name || '',
        description: product()?.description || '',
        price: product()?.price || 0,
        existingImages: product()?.media.map((media) => media.imageUrl) || [],
        category: product()?.categories
          ? [...product()?.categories.map((category) => category.id)]
          : [],
      })
    }
  }, [product()?.id])

  const [newImages, setNewImages] = createSignal<File[]>([])

  const [previewUrl, setPreviewUrl] = createSignal<string | null>(null)

  const handleFileChange = (event: Event) => {
    const target = event.currentTarget as HTMLInputElement
    const file = target.files?.[0]
    if (file) {
      setNewImages([...newImages(), file])
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const removeExistingImage = (image: string) => {
    setFormState({
      ...formState(),
      existingImages: formState().existingImages.filter((existingImage) => {
        return existingImage !== image
      }),
    })
  }

  const { ToastComponent, showToast } = Toast()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newProduct = {
      ...formState(),
      storeId: store.id,
    }

    const formData = new FormData()

    for (const key in newImages()) {
      if (newImages()[key]) {
        formData.append('newImages', newImages()[key])
      }
    }

    for (const key in newProduct) {
      formData.append(key, newProduct[key])
    }

    if (product && product()?.id) {
      formData.append('id', product()?.id)

      const { data, error } = await useMultipart(
        url,
        formData,
        RequestMethod.PUT
      )

      if (data) {
        onClose(data.message)
      }
      if (error) {
        showToast(error.message)
      }
    } else {
      const { data, error } = await useMultipart(url, formData)
      if (data) {
        onClose(data.message)
      }
      if (error) {
        showToast(error.message)
      }
    }
  }

  return (
    <div class="flex flex-col gap-2">
      <ToastComponent />
      <form onSubmit={(e) => handleSubmit(e)}>
        <Stack size="md">
          <Stack size="md">
            <For each={config}>
              {(item) => {
                if (item.type === 'text') {
                  return (
                    <Stack size="sm">
                      <p>{item.label}</p>
                      <input
                        class="input"
                        name={item.name}
                        type={item.type}
                        placeholder={item.label}
                        onChange={(event) =>
                          setFormState({
                            ...formState(),
                            [item.name]: event.target.value,
                          })
                        }
                        value={formState()?.[item.name] || ''}
                      />
                    </Stack>
                  )
                }
                return (
                  <Stack size="sm">
                    <p>{item.label}</p>
                    <textarea
                      class="text-area"
                      name={item.name}
                      placeholder={item.label}
                      onChange={(event) =>
                        setFormState({
                          ...formState(),
                          [item.name]: event.target.value,
                        })
                      }
                      value={formState()?.[item.name] || ''}
                    />
                  </Stack>
                )
              }}
            </For>
          </Stack>
          <Stack size="sm">
            <p>Categories</p>
            <MultiSelect
              options={createSubCategories(props.categories)}
              value={formState().category}
              onChange={(value) => {
                setFormState({
                  ...formState(),
                  category: value,
                })
              }}
            />
          </Stack>
          {formState()?.existingImages?.map((image) => (
            <div class="w-[120px] relative">
              <div
                class="absolute top-[-5px] right-[-5px] bg-gray-50 rounded-full w-[25px] h-[25px] flex justify-center items-center cursor-pointer"
                onClick={() => removeExistingImage(image)}
              >
                X
              </div>
              <img
                class="w-full aspect-square object-cover hover:grow hover:shadow-lg"
                src={image}
                alt="product image"
              />
            </div>
          ))}
          {previewUrl() && (
            <div class="mt-4">
              <p>Preview:</p>
              <img
                src={previewUrl()}
                alt="Uploaded Preview"
                class="w-[100px]"
              />
            </div>
          )}
          <Stack size="sm">
            <p>Select images</p>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
          </Stack>
          <button class="btn-primary" type="submit">
            Submit
          </button>
        </Stack>
      </form>
    </div>
  )
}
