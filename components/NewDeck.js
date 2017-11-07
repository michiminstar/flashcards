import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, Alert, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../util/api'
import { Button } from 'react-native-elements'

class NewDeck extends Component {

  static navigationOptions = { title: 'Add Deck' }

  state: {
    title: ''
  }

  onSubmit = () => {
    const { title } = this.state
    const { decks } = this.props
    const newDeck = {[title]: { title, questions: [] }}

    this.props.dispatch(addDeck(newDeck))

    saveDeckTitle(newDeck)

    Alert.alert(
      'Successful', 'Your deck has been saved',
      [
        {
          text: 'OK',
          onPress: () => this.props.navigation.navigate(
            'IndividualDeck',{
              title,
              questions: []
            }
          )
        }
      ]
    )
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>What is the title of your new deck?</Text>

          <TextInput
            onChangeText={(title) => this.setState({ title })}
            placeholder="Enter Your Deck Name"
            style={styles.input}
          />
        </View>

        <Button
          title='Create Deck'
          style={styles.buttonSpacing}
          backgroundColor='#006DFD'
          onPress={this.onSubmit}
        />
      </KeyboardAvoidingView>
    )
  }

}

const mapStateToProps = decks => ({ decks })


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    marginTop: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    alignSelf: 'stretch',
    paddingLeft: 40,
    paddingRight: 40,
  },
  buttonSpacing: {
    marginTop: 10,
    padding: 20,
  },
})

export default connect(mapStateToProps)(NewDeck)
