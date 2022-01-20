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

const Quiz = (props: { onQuizComplete: (score: number) => void }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [randAnswers, setRandAnswers] = useState<string[]>([]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (feedback != null) {
      setTimeout(() => {
        setFeedback(null);

        if (currentQuestionIndex + 1 == questions?.length) {
          props.onQuizComplete(score);
        } else {
          setCurrentQuestionIndex((index) => index + 1);
        }
      }, 1000);
    }
  }, [feedback]);

  useEffect(() => {
    if (questions != null) {
      let answers = [
        ...questions[currentQuestionIndex].incorrect_answers,
        questions[currentQuestionIndex].correct_answer,
      ];
      setRandAnswers(shuffle(answers));
    }
  }, [currentQuestionIndex, questions]);

  const getData = () => {
    const data: QuestionProps[] = QUESTIONDATA.results;

    if (data.length > 0) {
      setQuestions(data);
    }
  };

  const clickAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      setScore((score) => score + 10);

      setFeedback("Correct");
    } else {
      setFeedback("Wrong");
    }
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
      ) : null}
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
