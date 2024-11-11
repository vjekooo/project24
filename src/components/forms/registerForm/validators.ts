export const eMailValidator = (value: string) => {
  if (!value) return 'Email is required'
  if (!value.includes('@')) return 'Email is invalid'
  return ''
}

export const passwordValidator = (value: string) => {
  if (!value) return 'Password is required'
  if (value.length < 3) return 'Password must be at least 8 characters'
  return ''
}
