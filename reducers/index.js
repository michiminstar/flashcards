import {
  LOAD_DECKS,
  ADD_DECK,
  ADD_QUESTION,
} from '../actions'

function decks(state = {}, action) {
  const { decks } = action

  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        ...decks
      }
    default:
      return state
  }
}

export default decks
