export const getApiDomain = () =>
  import.meta.env.DEV ? import.meta.env.VITE_API_DOMAIN : process.env.API_DOMAIN
