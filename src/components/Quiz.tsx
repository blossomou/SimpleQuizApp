import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import QUESTIONDATA from '../../data.json';
import { shuffle } from '../../utils/random';

interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

let randAnswers: string[] = [];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log("currentQuestionIndex", currentQuestionIndex);
  //   return () => {
  //     console.log("cleanup");
  //   };
  // }, [currentQuestionIndex]);

  useEffect(() => {
    if (feedback != null) {
      setTimeout(() => {
        setFeedback(null);
        setCurrentQuestionIndex((index) => index + 1);
      }, 3000);
    }
  }, [feedback]);

  const getData = () => {
    const data: QuestionProps[] = QUESTIONDATA.results;

    if (data.length > 0) {
      setQuestions(data);
    }
  };

  if (questions != null) {
    let answers = questions[currentQuestionIndex].incorrect_answers;
    answers.push(questions[currentQuestionIndex].correct_answer);
    randAnswers = shuffle(answers);
  }

  const clickAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setScore((score) => score + 10);

      setFeedback("Correct");
    } else {
      setFeedback("Wrong");
    }
  };

  // const feedbackResult = (result: string) => {
  //   window.setInterval(() => {
  //     setFeedback(result);
  //   }, 30);
  // };

  return (
    <View style={styles.container}>
      {questions != null ? (
        <View>
          <Text></Text>
          <Text style={styles.textTitle}>Score: {score}</Text>
          <Text style={styles.textTitle}>
            {questions[currentQuestionIndex].question}
          </Text>

          {randAnswers.map((answer, index) => {
            return (
              <Pressable
                style={styles.button}
                key={index}
                onPress={() => {
                  clickAnswer(
                    answer,
                    questions[currentQuestionIndex].correct_answer
                  );
                }}
              >
                <Text style={styles.text}> {answer}</Text>
              </Pressable>
            );
          })}

          <Text style={styles.textTitle}>{feedback}</Text>
        </View>
      ) : (
        <Pressable style={styles.button} onPress={getData}>
          <Text style={styles.text}>Click Me</Text>
        </Pressable>
      )}
    </View>
  );
};

export default Quiz;

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
