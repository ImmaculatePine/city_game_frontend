import http from './http'

export default {
  create: (gameId, waypoint) =>
    http.post(`/api/games/${gameId}/waypoints`, { waypoint })
}
