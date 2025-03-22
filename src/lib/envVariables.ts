type EnvVariablesType = Pick<ImportMetaEnv, 'VITE_API_DOMAIN'>

const envVariables: EnvVariablesType = {
  VITE_API_DOMAIN: '${VITE_VERSION}',
}

export const getEnvVariables = (): {
  envVariables: EnvVariablesType
} => {
  return {
    envVariables: {
      VITE_API_DOMAIN: !envVariables.VITE_API_DOMAIN.includes('VITE_')
        ? envVariables.VITE_API_DOMAIN
        : import.meta.env.VITE_API_DOMAIN,
    },
  }
}
