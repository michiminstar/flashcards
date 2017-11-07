import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

class Quiz extends Component {
  state = {
    questionIndex: 1,
    correctAnswers: 0,
    showAnswer: false,
  }

  static navigationOptions = { title: 'Quiz' }

  showAnswer = () => {
    this.setState({showAnswer: !this.state.showAnswer})
  }

  onCorrect = () => {
    this.setState(state => ({
      questionIndex: state.questionIndex + 1,
      correctAnswers: state.correctAnswers + 1,
      showAnswer: false
    }))
  }

  onIncorrect = () => {
    this.setState(state => ({
      questionIndex: state.questionIndex + 1
    }))
  }

  resetQuiz = () => {
    this.setState({
      questionIndex: 1,
      correctAnswers: 0,
      showAnswer: false
    })
  }

  backToDeck = () => {
    this.props.navigation.goBack()
  }

  render() {
    const { questionIndex, correctAnswers, showAnswer } = this.state
    const { questions } = this.props.navigation.state.params
    const hasQuestions = questionIndex <= questions.length

    return (
      <View style={styles.container}>
        {hasQuestions ? (
          <View>
            <View>
              <View style={{ margin: 40 }}>
                <Text style={styles.questionIndex}>{questionIndex} / {questions.length}</Text>

                <View>
                  {showAnswer ? (
                    <View>
                      <Text style={ styles.questionTitle }>{questions[questionIndex-1].answer}</Text>

                      <TouchableOpacity onPress={this.showAnswer}>
                        <Text style={styles.link}>Back to Question</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Text style={ styles.questionTitle }>{questions[questionIndex-1].question}</Text>

                      <TouchableOpacity onPress={this.showAnswer}>
                        <Text style={styles.link}>See Answer</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
                </View>
              </View>
            </View>

            <View style={{ marginLeft: 25, marginRight: 25 }}>
              <Button
                title='Correct' style={{ marginBottom: 10 }}
                backgroundColor='#70DD2F'
                onPress={this.onCorrect}
              />
              <Button
                title='Incorrect'
                backgroundColor='#FB3A58'
                onPress={this.onIncorrect}
              />
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.resultContainer}>
              <Text style={styles.body}>You got {correctAnswers} out of {questions.length}</Text>
            </View>

            <Button
              title='Retake Quiz'
              style={ styles.buttonSpacing }
              backgroundColor='#006DFD'
              onPress={this.resetQuiz}
            />

            <Button
              title='Back to Deck'
              style={ styles.buttonSpacing }
              backgroundColor='transparent'
              buttonStyle={styles.borderButton}
              color='#006DFD'
              onPress={this.backToDeck}
            />
          </View>
        )}
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  questionIndex: {
    marginTop: 30,
  },
  questionTitle: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 26,
  },
  link: {
    fontSize: 16,
    color: '#006DFD',
  },
  resultContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  body: {
    marginTop: 48,
    fontSize: 30,
    marginBottom: 5,
    justifyContent: 'center',
  },
  buttonSpacing: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  borderButton: {
    borderWidth: 1,
    borderColor: '#006DFD',
  },
})

export default Quiz
