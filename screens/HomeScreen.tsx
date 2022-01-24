import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import AppStyles from '../AppStyles';
import Quiz from '../src/components/Quiz';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isShowQuiz, setIsShowQuiz] = useState(false);

  const [score, setScore] = useState(0);
  const [selectedValue, setSelectedValue] = useState("easy");

  const startQuiz = () => {
    setIsShowQuiz(true);
  };

  return (
    <View style={AppStyles.container}>
      {isShowQuiz ? (
        <View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                AppStyles.textTitle,
                { fontWeight: "bold" },
                { paddingLeft: 0 },
              ]}
            >
              Score:
            </Text>
            <Text style={[AppStyles.textTitle, { paddingLeft: 0 }]}>
              {score}
            </Text>
          </View>
          <Quiz
            difficulty={selectedValue}
            onFeedback={(isCorrect: boolean) => {
              if (isCorrect) {
                setScore(score + 10);
              }
            }}
            onQuizComplete={() => {
              setIsShowQuiz(false);
              setScore(0);
              navigation.navigate("Result", {
                score,
              });
            }}
          />
        </View>
      ) : (
        <View>
          <Pressable style={AppStyles.button} onPress={startQuiz}>
            <Text style={AppStyles.text}>Start Quiz</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
