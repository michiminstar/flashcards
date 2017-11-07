import React, { Component } from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native'
import { connect } from 'react-redux'
import { loadDecks } from '../actions'
import { getDecks } from '../util/api'

import { List, Divider } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'

function SingleDeck({ title, questions }) {
  return (
    <View style={styles.deck}>
      <Text style={styles.deckTitle}>{title}</Text>
      <Text style={styles.deckSubtitle}>
          {questions && questions.length} cards
      </Text>
    </View>
  )
}

class DeckList extends Component {
  componentDidMount() {
    const {dispatch} = this.props

    getDecks().then(decks => {
      dispatch(loadDecks(decks))
    })

  }

  renderItem = ({item}) => (
    <View>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate('IndividualDeck', item)}>
        <SingleDeck title={item.title} questions={item.questions} />
        <Divider />
      </TouchableOpacity>
    </View>
  )

  render() {
    const { decks } = this.props

    return (
      <View>
        <List>
          <FlatList
            data={Object.values(decks)}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
          />
        </List>
      </View>
    )
  }

}

const mapStateToProps = decks => ({ decks })

const styles = StyleSheet.create({
  deck: {
    marginLeft: 20,
    minHeight: 100,
    justifyContent: 'center',
  },
  deckTitle: {
    fontSize: 20,
    color: '#006DFD',
    marginBottom: 5,
  },
  deckSubtitle: {
    fontSize: 16,
  }
})

export default connect(mapStateToProps)(DeckList)
