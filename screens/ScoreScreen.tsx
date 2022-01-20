import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

const ScoreScreen = () => {
  const route = useRoute();
  const [text, setText] = useState<string>("");
  const score = (route.params as { score: number }).score;
  // console.log("score: ", score);

  const saveDate = async () => {
    let newScore = {
      name: text,
      score: score,
      createdDate: new Date(),
    };

    try {
      const scores = await getData();
      console.log(scores);

      scores.push(newScore);

      await AsyncStorage.setItem("Scores", JSON.stringify(scores));
    } catch (e) {}
  };

  const getData = async () => {
    try {
      const result = await AsyncStorage.getItem("Scores");

      return result ? JSON.parse(result) : [];
    } catch (e) {}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Your Score: </Text>

      <Text style={styles.textTitle}>{score}</Text>

      <TextInput
        style={styles.input}
        onChangeText={setText}
        placeholder="Please enter your name"
        value={text}
      />

      <Pressable style={styles.button} onPress={saveDate}>
        <Text style={styles.text}>Save</Text>
      </Pressable>
    </View>
  );
};

export default ScoreScreen;

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
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
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
