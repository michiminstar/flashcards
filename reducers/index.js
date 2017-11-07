import {
  LOAD_DECKS,
  ADD_DECK,
  ADD_QUESTION,
} from '../actions'

function decks(state = {}, action) {
  const { decks, deck } = action

  switch (action.type) {
    case LOAD_DECKS:
      return {
        ...state,
        ...decks
      }
    case ADD_QUESTION:
      const { title, questions, question, answer } = action.params
      const newQuestions = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ])

      return {
        ...state,
        [title]: { ...state[title], questions: newQuestions },
      }
    case ADD_DECK:
      return {
        ...state,
        ...deck
      }
    default:
      return state
  }
}

export default decks
