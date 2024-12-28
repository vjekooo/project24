export const eMailValidator = (value: string) => {
  if (!value) return 'Email is required'
  if (!value.includes('@')) return 'Email is invalid'
  return ''
}

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export const passwordValidator = (value: string) => {
  if (!value) return 'Password is required'
  if (value.length < 8) return 'Password must be at least 8 characters'
  if (!passwordRegex.test(value))
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
  return ''
}

export const confirmPasswordValidator = (
  password: string,
  compare?: string
) => {
  if (!compare) return 'Confirm Password is required'
  if (password !== compare) return 'Passwords do not match'
  return ''
}
