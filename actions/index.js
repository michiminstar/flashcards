export const LOAD_DECKS = 'LOAD_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_QUESTION = 'ADD_QUESTION'

export const loadDecks = decks => ({
  type: LOAD_DECKS,
  decks
})

export const addDeck = deck => ({
  type: ADD_DECK,
  deck
})

export const addQuestion = params => ({
  type: ADD_QUESTION,
  params,
})
