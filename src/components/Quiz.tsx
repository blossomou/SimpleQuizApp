import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [allowRandom, setAllowRandom] = useState(true);

  useEffect(() => {
    if (feedback != null) {
      setTimeout(() => {
        setFeedback(null);
        if (currentQuestionIndex + 1 == questions?.length) {
          console.log("done");
          navigation.navigate("Score", {
            score,
          });
        } else {
          setCurrentQuestionIndex((index) => index + 1);

          setAllowRandom(true);

          console.log(currentQuestionIndex);
        }
      }, 1000);
    }
  }, [feedback]);

  const getData = () => {
    const data: QuestionProps[] = QUESTIONDATA.results;

    if (data.length > 0) {
      setQuestions(data);
    }
  };

  if (questions != null && allowRandom) {
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
    setAllowRandom(false);
  };

  return (
    <View style={styles.container}>
      {questions != null ? (
        <View>
          <Text style={styles.textTitle}>Score: {score}</Text>
          <Text style={styles.textTitle}>
            {currentQuestionIndex + 1}.{" "}
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

          <Text style={styles.feedback}>{feedback}</Text>
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
    paddingTop: 10,
    paddingBottom: 10,
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
  feedback: {
    padding: 10,
    fontSize: 16,
    height: 20,
  },
});
