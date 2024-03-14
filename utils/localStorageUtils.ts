// Remove access token and refresh token from localstorage
export const removeTokens = () => {
  localStorage.removeItem('access-token')
  localStorage.removeItem('refresh-token')
}
