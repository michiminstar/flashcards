import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'

class Quiz extends Component {
  state = {
    questionIndex: 0,
    correctAnswers: 0,
    showAnswer: false,
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Quiz'
    }
  }

  showAnswer = () => {
    this.setState({showAnswer: !this.state.showAnswer})
  }

  render() {
    const { questionIndex, correctAnswers, showAnswer } = this.state
    const { questions } = this.props.navigation.state.params
    const hasQuestions = questionIndex < questions.length
    const questionLeft = questions.length - questionIndex

    return (
      <View style={styles.container}>
        {hasQuestions ? (
          <View>
            <View>
              <View style={{ margin: 40 }}>
                <Text style={styles.questionIndex}>{questionLeft} / {questions.length}</Text>

                <View>
                  {showAnswer ? (
                    <View>
                      <Text style={ styles.questionTitle }>{questions[questionIndex].answer}</Text>

                      <TouchableOpacity onPress={this.showAnswer}>
                        <Text style={styles.link}>Back to Question</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <Text style={ styles.questionTitle }>{questions[questionIndex].question}</Text>

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
              />
              <Button
                title='Incorrect'
                backgroundColor='#FB3A58'
              />
            </View>
          </View>
        ) : (
          <View><Text>Hello</Text></View>
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
  }
})

export default Quiz
