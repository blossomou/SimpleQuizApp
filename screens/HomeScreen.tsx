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
    <View style={styles.container}>
      {isShowQuiz ? (
        <View>
          <Text style={styles.textTitle}>Score: {score}</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  // text: {
  //   fontSize: 16,
  //   lineHeight: 21,
  //   fontWeight: "bold",
  //   letterSpacing: 0.25,
  //   color: "white",
  // },
  // button: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 4,
  //   elevation: 3,
  //   backgroundColor: "black",
  //   marginTop: 10,
  // },
  textTitle: {
    color: "black",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
