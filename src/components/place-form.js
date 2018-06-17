import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default class PlaceForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      name: '',
      address: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange({ target: { name, value } }) {
    this.setState({
      [name]: value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const { onSubmit, onSuccess } = this.props
    const { name, address } = this.state
    onSubmit({ name, address }, onSuccess)
  }

  render() {
    return (
      <div className="modal is-active">
        <div className="modal-background" />
        {this._renderForm()}
        <Link
          to="/places"
          className="modal-close is-large"
          aria-label="close"
        />
      </div>
    )
  }

  _renderForm() {
    return (
      <div className="modal-card">
        <form onSubmit={this.handleSubmit}>
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
          </header>

          <section className="modal-card-body">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  className="input"
                  type="text"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Address</label>
              <div className="control">
                <textarea
                  name="address"
                  value={this.state.address}
                  onChange={this.handleInputChange}
                  className="textarea"
                />
              </div>
            </div>
          </section>

          <footer className="modal-card-foot">
            <button className="button is-success" onClick={this.handleSubmit}>
              Save
            </button>
            <Link to="/places" className="button">
              Cancel
            </Link>
          </footer>
        </form>
      </div>
    )
  }
}
