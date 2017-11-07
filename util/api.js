// getDecks: return all of the decks along with their titles, questions, and answers.
// getDeck: take in a single id argument and return the deck associated with that id.
// saveDeckTitle: take in a single title argument and add it to the decks.
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title.

import {AsyncStorage} from 'react-native'

export const DECKS_STORAGE_KEY = 'flashcards:decks'

let initialData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'State can be mutated in Redux',
        answer: 'No...',
      },
      {
        question: 'Does React Native work with Android?',
        answer: 'Yes!',
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'Does const declare a block-scoped variable?',
        answer: 'Yes!',
      }
    ]
  }
}

export function getInitialData() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(initialData))
  return initialData
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => {
    return results === null ? getInitialData() : JSON.parse(results)
  })
}
