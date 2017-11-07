import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
import { addCardToDeck } from '../util/api'
import { Button } from 'react-native-elements'

class NewQuestion extends Component {

  static navigationOptions = { title: 'Add Card' }

  state = {
    question: '',
    answer: ''
  }

  onSubmit = () =>{
    const { question, answer } = this.state
    const {title, questions} = this.props.navigation.state.params
    const params = {title, questions, question, answer}

    this.props.dispatch(addQuestion(params))

    addCardToDeck({
      card: { question, answer },
      title
    })

    Alert.alert(
      'Successful', 'Your question has been saved',
      [
        {
          text: 'OK',
          onPress: () => this.props.navigation.goBack()
        }
      ]
    )
  }

  render() {
    const { question, anwer } = this.state

    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>Question</Text>
          <TextInput
            onChangeText={(question) => this.setState({ question })}
            placeholder="Enter Your Question"
          />

          <Text style={styles.label}>Answer</Text>
          <TextInput
            onChangeText={(answer) => this.setState({ answer })}
            placeholder="Enter the Answer"
          />
        </View>


        <Button
          title='Save' style={{marginTop: 10, padding: 20}}
          backgroundColor='#006DFD'
          onPress={this.onSubmit}
        />
      </View>
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
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10,
  }
})

export default connect(mapStateToProps)(NewQuestion)
