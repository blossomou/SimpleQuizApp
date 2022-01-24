import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import AppStyles from '../AppStyles';
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

      navigation.navigate("Scoreboard");
    } catch (e) {}
  };

  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  return (
    <View style={AppStyles.container}>
      <Text style={AppStyles.textTitle}>Your Score: {score}</Text>

      <TextInput
        style={styles.input}
        onChangeText={setName}
        placeholder="Please enter your name"
        value={name}
      />

      <Pressable style={AppStyles.button} onPress={saveDate}>
        <Text style={AppStyles.text}>Save</Text>
      </Pressable>

      {displayError != null ? (
        <Text style={styles.feedback}>{displayError}</Text>
      ) : null}
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  feedback: {
    padding: 10,
    fontSize: 16,
    height: 40,
  },
});
