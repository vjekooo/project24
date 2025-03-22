import { getEnvVariables } from './envVariables'

const { envVariables } = getEnvVariables()

console.log(envVariables.VITE_API_DOMAIN)

export const getApiDomain = () => envVariables.VITE_API_DOMAIN
