import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { getDataFromStorage } from '../utils/random';

const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [name, setName] = useState<string>("");
  const [displayError, setDisplayError] = useState<string | null>(null);
  const score = (route.params as { score: number }).score;

  const saveDate = async () => {
    if (name === "") {
      setDisplayError("Enter a name please");
      return;
    }

    let newScore = {
      name: name,
      score: score,
      createdDate: formatDate(new Date()),
    };

    try {
      const scores = await getDataFromStorage();
      // console.log(scores);

      scores.push(newScore);

      await AsyncStorage.setItem("Scores", JSON.stringify(scores));

      navigation.navigate("Score");
    } catch (e) {}
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDay()}/${date.getFullYear()}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Your Score: </Text>

      <Text style={styles.textTitle}>{score}</Text>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Please enter your name"
        value={name}
      />

      <Pressable style={styles.button} onPress={saveDate}>
        <Text style={styles.text}>Save</Text>
      </Pressable>

      {displayError != null ? (
        <Text style={styles.feedback}>{displayError}</Text>
      ) : null}
    </View>
  );
};

export default ResultScreen;

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

  feedback: {
    padding: 10,
    fontSize: 16,
    height: 20,
  },
});
