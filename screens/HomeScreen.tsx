import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Quiz from '../src/components/Quiz';

const HomeScreen = () => {
  const navigation = useNavigation();

  const [isShowQuiz, setIsShowQuiz] = useState(false);

  const startQuiz = () => {
    setIsShowQuiz(true);
  };

  return (
    <View style={styles.container}>
      {isShowQuiz ? (
        <Quiz
          onQuizComplete={(score) => {
            setIsShowQuiz(false);
            navigation.navigate("Result", {
              score,
            });
          }}
        />
      ) : (
        <Pressable style={styles.button} onPress={startQuiz}>
          <Text style={styles.text}>Click Me</Text>
        </Pressable>
      )}
    </View>
  );
};

export default HomeScreen;

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
