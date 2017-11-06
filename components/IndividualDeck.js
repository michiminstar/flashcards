import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements'

class IndividualDeck extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title
    }
  }

  render() {
    const { navigation } = this.props
    const { title } = navigation.state.params
    const questions = this.props.decks[title] && this.props.decks[title].questions

    return (
      <View style={styles.container} >
        <View style={styles.deckInfo}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckSubtitle}>{questions.length} cards</Text>
        </View>

        <Button
          title='Add Card' style={{marginBottom: 10}}
          backgroundColor='#006DFD'
          onPress={() => {
            navigation.navigate('NewQuestion', { title, questions })
          }}
        />
        <Button
          title='Start Quiz'
          backgroundColor='transparent'
          buttonStyle={styles.borderButton}
          color='#006DFD'
          onPress={() => {
            navigation.navigate('Quiz', { title, questions })
          }}
        />
      </View>
    )
  }

}

function mapStateToProps(state) {
  return {
    decks: state
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  deckInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  deckTitle: {
    marginTop: 48,
    fontSize: 30,
    marginBottom: 5,
  },
  deckSubtitle: {
    fontSize: 16,
  },
  borderButton: {
    borderWidth: 1,
    borderColor: '#006DFD',
  }
})

export default connect(mapStateToProps)(IndividualDeck)
