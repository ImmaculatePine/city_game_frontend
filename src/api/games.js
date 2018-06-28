import http from './http'

export default {
  fetch: () => http.get('/api/games'),
  fetchOne: id => http.get(`/api/games/${id}`),
  update: (id, game) => http.patch(`/api/games/${id}`, { game })
}
