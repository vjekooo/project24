export const headers = () => {
  return {
    credentials: 'include' as RequestCredentials,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  }
}
