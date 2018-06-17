import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class PlacesList extends Component {
  static propTypes = {
    places: PropTypes.arrayOf(PropTypes.object).isRequired,
    deletePlace: PropTypes.func.isRequired
  }

  render() {
    const { places, deletePlace } = this.props
    return (
      <section className="section">
        <nav className="level">
          <div className="level-left">
            <div className="level-item">
              <Link to="places/new" className="button is-primary">
                Add new
              </Link>
            </div>
          </div>
        </nav>

        <table className="table">
          <tbody>
            {places.map(place => (
              <tr key={place.id}>
                <td>{place.name}</td>
                <td>{place.address}</td>
                <td>
                  <button
                    className="button is-danger is-outlined"
                    onClick={() => deletePlace(place.id)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-times" />
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    )
  }
}
