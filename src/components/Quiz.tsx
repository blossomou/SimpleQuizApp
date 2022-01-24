import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

import AppStyles from '../../AppStyles';
import { shuffle } from '../../utils/random';

// const dbURL = `"https://opentdb.com/api.php?amount=10&category=18&type=multiple&difficulty=${props.difficulty}"`;
interface QuestionProps {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const Quiz = (props: {
  difficulty: string;
  onQuizComplete: () => void;
  onFeedback: (isCorrect: boolean) => void;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);
  // const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [randAnswers, setRandAnswers] = useState<string[]>([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    getDataAsync();
  }, []);

  useEffect(() => {
    if (feedback != null) {
      setTimeout(() => {
        setFeedback(null);

        if (currentQuestionIndex + 1 == questions?.length) {
          props.onQuizComplete();
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

  const getDataAsync = async () => {
    try {
      const response = await fetch(
        // "https://opentdb.com/api.php?amount=5&category=18&type=multiple&difficulty=" +
        //   props.difficulty
        "https://opentdb.com/api.php?amount=5&category=18&type=multiple"
      );

      if (response.ok) {
        const data = await response.json();

        if (data.results.length > 0) {
          setQuestions(data.results);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clickAnswer = (selectedAnswer: string, correctAnswer: string) => {
    if (selectedAnswer === correctAnswer) {
      props.onFeedback(true);
      setFeedback("Correct");
    } else {
      props.onFeedback(false);
      setFeedback("Wrong");
    }
  };

  const createMarkup = (question: string, style: string) => {
    return {
      html: `<p style='${style}'>
     ${question}</p>
    `,
    };
  };

  return (
    <View>
      {questions != null ? (
        <View>
          <Text style={styles.textTitle}>
            <RenderHtml
              contentWidth={width}
              source={createMarkup(
                `${currentQuestionIndex + 1}. ${
                  questions[currentQuestionIndex].question
                }`,
                ""
              )}
            />
          </Text>

          {randAnswers.map((answer, index) => {
            return (
              <Pressable
                style={AppStyles.button}
                key={index}
                onPress={() => {
                  clickAnswer(
                    answer,
                    questions[currentQuestionIndex].correct_answer
                  );
                }}
              >
                <RenderHtml
                  contentWidth={width}
                  source={createMarkup(
                    answer,
                    "font-size: 16; font-weight: bold; color: white"
                  )}
                />
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
  },
  textTitle: {
    color: "black",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },

  feedback: {
    padding: 10,
    fontSize: 16,
    height: 40,
  },
});
