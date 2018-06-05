import http from './http'

export default {
  fetch: () => http.get('/api/games'),
  fetchOne: id => http.get(`/api/games/${id}`)
}
