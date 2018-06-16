import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class PlacesList extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  render() {
    const { places } = this.props
    return (
      <section className="section">
        <table className="table">
          <tbody>
            {places.map(place => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}
