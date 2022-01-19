import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Questions from './components/Questions';
import QUESTIONDATA from './data.json';

const dbURL = "https://opentdb.com/api.php?amount=10&category=18&type=multiple";

interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export default function App() {
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const getData = () => {
    const data: QuestionProps[] = QUESTIONDATA.results;
    if (data.length > 0) {
      data.map((question) => {
        question.incorrect_answers.push(question.correct_answer);
      });

      setQuestions(data);
    }
  };

  return (
    <View>
      <Pressable style={styles.button} onPress={getData}>
        <Text style={styles.text}>Click Me</Text>
      </Pressable>

      {questions?.map((question, index) => {
        return <Questions data={question} key={index} />;
      })}

      <StatusBar style="auto" />
    </View>
  );
}

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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

// const onPressHandler = () => {
//   fetch(dbURL)
//     .then((response) => {
//       if (response.ok) {
//         response.json().then((data) => {
//           if (data.results.length > 0) {
//             console.log(data.results);
//           }
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// };

// const onPressHandlerAsync = async () => {
//   try {
//     const response = await fetch(dbURL);

//     if (response.ok) {
//       const data = await response.json();

//       if (data.results.length > 0) {
//         console.log(data.results);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
