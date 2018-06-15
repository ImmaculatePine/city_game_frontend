import React from 'react'
import renderer from 'react-test-renderer'
import NewWaypoint from './new-waypoint'

describe('NewWaypoint', () => {
  it('renders a list of places which are not used as waypoints yet', () => {
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
    const createWaypoint = () => {}

    const tree = renderer
      .create(
        <NewWaypoint
          game={game}
          places={places}
          createWaypoint={createWaypoint}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
