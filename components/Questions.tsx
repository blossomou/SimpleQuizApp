import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
const Questions = (props: { data: QuestionProps }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.data.question}</Text>
    </View>
  );
};

export default Questions;

const styles = StyleSheet.create({
  container: {
    height: "50%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dotted",
  },
  text: {
    color: "black",
    fontSize: 16,
  },
});
