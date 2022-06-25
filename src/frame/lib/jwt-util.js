export function jwtDecode (token) {
  const result = {}
  if (typeof (token) === 'undefined') {
    return false
  }
  result.raw = token
  result.header = JSON.parse(window.atob(token.split('.')[0]))
  result.payload = JSON.parse(window.atob(token.split('.')[1]))
  return (result)
}
