import React from 'react'
import renderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import NewWaypoint from './new-waypoint'

describe('NewWaypoint', () => {
  const notUsedPlace = {
    id: 1,
    name: 'Not used place',
    address: 'Not used address'
  }
  const usedPlace = { id: 2, name: 'Used place', address: 'Used address' }
  const game = {
    id: 1,
    name: 'Game 1',
    waypoints: [
      {
        id: 1,
        position: 0,
        place: usedPlace
      }
    ]
  }
  const places = [notUsedPlace, usedPlace]
  const onSubmit = () => {}

  it('renders a list of places which are not used as waypoints yet', () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <NewWaypoint game={game} places={places} onSubmit={onSubmit} />
        </BrowserRouter>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders empty div when game is not found', () => {
    const tree = renderer
      .create(
        <NewWaypoint game={undefined} places={places} onSubmit={onSubmit} />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
