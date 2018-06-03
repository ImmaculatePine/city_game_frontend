import http from './http'

export default {
  fetch: () => http.get('/api/games')
}
