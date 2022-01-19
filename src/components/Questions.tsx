import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { shuffle } from '../../utils/random';

interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
const Questions = (props: { data: QuestionProps }) => {
  let randAnswers = shuffle(props.data.incorrect_answers);

  const clickAnswer = (selectedAnswer: string, correctAnswer: string) => {
    window.alert(selectedAnswer === correctAnswer ? "correct" : "wrong");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{props.data.question}</Text>
      <View>
        {randAnswers.map((answer, index) => {
          return (
            <Pressable
              style={styles.button}
              key={index}
              onPress={() => {
                clickAnswer(answer, props.data.correct_answer);
              }}
            >
              <Text style={styles.text}> {answer}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    // height: "50%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderBottomColor: "black",
    borderBottomWidth: 1,
  },
  textTitle: {
    color: "black",
    fontSize: 16,
  },

  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 10,
  },
});
