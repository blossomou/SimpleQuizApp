import { useRoute } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

const ScoreScreen = () => {
  const route = useRoute();

  const score = (route.params as { score: number }).score;
  console.log("score: ", score);
  return <Text style={styles.textTitle}>{score}</Text>;
};

export default ScoreScreen;

const styles = StyleSheet.create({
  textTitle: {
    color: "black",
    fontSize: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
});
