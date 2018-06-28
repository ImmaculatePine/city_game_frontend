export default {
  route: ({ origin, destination, waypoints, google }) =>
    new Promise((resolve, reject) => {
      const DirectionsService = new google.maps.DirectionsService()

      DirectionsService.route(
        {
          origin,
          destination,
          waypoints: waypoints.map(location => ({ location })),
          optimizeWaypoints: true,
          travelMode: google.maps.TravelMode.WALKING
        },
        (data, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            resolve(data)
          } else {
            reject(data)
          }
        }
      )
    })
}
