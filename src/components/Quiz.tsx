import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

import AppStyles from '../../AppStyles';
import { shuffle } from '../../utils/random';
import { QuestionProps } from '../models/QuestionProps';

const Quiz = (props: {
  questions: QuestionProps[];
  onQuizComplete: () => void;
  onFeedback: (isCorrect: boolean) => void;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [randAnswers, setRandAnswers] = useState<string[]>([]);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (feedback != null) {
      setTimeout(() => {
        setFeedback(null);

        if (currentQuestionIndex + 1 == props.questions?.length) {
          props.onQuizComplete();
        } else {
          setCurrentQuestionIndex((index) => index + 1);
        }
      }, 1000);
    }
  }, [feedback]);

  useEffect(() => {
    if (props.questions != null) {
      let answers = [
        ...props.questions[currentQuestionIndex].incorrect_answers,
        props.questions[currentQuestionIndex].correct_answer,
      ];
      setRandAnswers(shuffle(answers));
    }
  }, [currentQuestionIndex, props.questions]);

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
      html: `<span style='${style}'>
     ${question}</span>
    `,
    };
  };

  return (
    <View style={{ width: width - 20 }}>
      {props.questions != null ? (
        <View>
          <RenderHtml
            contentWidth={width}
            source={createMarkup(
              `${currentQuestionIndex + 1}. ${
                props.questions[currentQuestionIndex].question
              }`,
              "font-size: 16px; font-weight: bold; color: black"
            )}
          />

          {randAnswers.map((answer, index) => {
            return (
              <Pressable
                style={AppStyles.button}
                key={index}
                onPress={() => {
                  clickAnswer(
                    answer,
                    props.questions[currentQuestionIndex].correct_answer
                  );
                }}
              >
                <RenderHtml
                  contentWidth={width}
                  source={createMarkup(
                    answer,
                    "font-size: 16px; font-weight: bold; color: white"
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
  feedback: {
    padding: 10,
    fontSize: 16,
    height: 40,
  },
});
