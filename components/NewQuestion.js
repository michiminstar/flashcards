import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput, Alert } from 'react-native'
import { connect } from 'react-redux'
import { addQuestion } from '../actions'
import { addCardToDeck } from '../util/api'
import { Button } from 'react-native-elements'

class NewQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Add Card'
    }
  }

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
      <View>
        <Text>Question</Text>
        <TextInput
          onChangeText={(question) => this.setState({ question })}
          placeholder="Enter Your Question"
        />

        <Text>Answer</Text>
        <TextInput
          onChangeText={(answer) => this.setState({ answer })}
          placeholder="Enter the Answer"
        />

        <Button
          title='Save' style={{marginTop: 10, padding: 20}}
          backgroundColor='#006DFD'
          onPress={this.onSubmit}
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

export default connect(mapStateToProps)(NewQuestion)
