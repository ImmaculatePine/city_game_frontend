import http from './http'

export default {
  fetch: () => http.get('/api/places'),
  create: place => http.post('/api/places', { place })
}
