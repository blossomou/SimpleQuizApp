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
  let [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);

  useEffect(() => {
    console.log("currentQuestionIndex change");
    return () => {
      console.log("return currentQuestionIndex change");
    };
  }, [currentQuestionIndex]);

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
    window.alert(selectedAnswer === correctAnswer ? "correct" : "wrong");
    setCurrentQuestionIndex(currentQuestionIndex++);
    // console.log("currentindex", currentQuestionIndex);
  };

  return (
    <View style={styles.container}>
      {questions != null ? (
        <View>
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
