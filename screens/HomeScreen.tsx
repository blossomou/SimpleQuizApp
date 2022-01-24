import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import AppStyles from '../AppStyles';
import Quiz from '../src/components/Quiz';
import { QuestionProps } from '../src/models/QuestionProps';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState<QuestionProps[] | null>(null);
  const [score, setScore] = useState(0);

  const getDataAsync = async () => {
    try {
      const response = await fetch(
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

  return (
    <View style={AppStyles.container}>
      {questions ? (
        <View>
          <Text style={[AppStyles.textTitle, { paddingLeft: 0 }]}>
            Score: {score}
          </Text>

          <Quiz
            questions={questions}
            onFeedback={(isCorrect: boolean) => {
              if (isCorrect) {
                setScore(score + 10);
              }
            }}
            onQuizComplete={() => {
              setQuestions(null);
              setScore(0);
              navigation.navigate("Result", {
                score,
              });
            }}
          />
        </View>
      ) : (
        <View>
          <Pressable style={AppStyles.button} onPress={getDataAsync}>
            <Text style={AppStyles.text}>Start Quiz</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
