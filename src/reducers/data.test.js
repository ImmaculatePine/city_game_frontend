import reducer from './data'
import { CREATE_WAYPOINT_SUCCESS } from '../constants/waypoints'

describe('CREATE_WAYPOINT_SUCCESS', () => {
  const action = {
    type: CREATE_WAYPOINT_SUCCESS,
    payload: {
      gameId: 1,
      data: {
        entities: {
          waypoints: {
            100: { id: 100, position: 1 }
          }
        },
        result: 100
      }
    }
  }

  test('saves new waypoint and adds it to existing game without waypoints', () => {
    const prevState = {
      entities: {
        games: {
          1: { name: 'Game 1' }
        },
        waypoints: {}
      },
      gameIds: [1]
    }

    const nextState = reducer(prevState, action)

    expect(nextState).toEqual({
      entities: {
        games: {
          1: { name: 'Game 1', waypoints: [100] }
        },
        waypoints: {
          100: { id: 100, position: 1 }
        }
      },
      gameIds: [1]
    })
  })

  test('saves new waypoint and adds it to existing game with enpoints', () => {
    const prevState = {
      entities: {
        games: {
          1: { name: 'Game 1', waypoints: [99] }
        },
        waypoints: {}
      },
      gameIds: [1]
    }

    const nextState = reducer(prevState, action)

    expect(nextState).toEqual({
      entities: {
        games: {
          1: { name: 'Game 1', waypoints: [99, 100] }
        },
        waypoints: {
          100: { id: 100, position: 1 }
        }
      },
      gameIds: [1]
    })
  })
})
