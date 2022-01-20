import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { getDataFromStorage } from '../utils/random';

type ScoreProps = {
  name: string;
  score: number;
  createdDate: Date;
};
const ScoreScreen = () => {
  const navigation = useNavigation();
  const [scores, setScores] = useState<ScoreProps[] | null>(null);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [scores]);

  const getData = async () => {
    const highscores = await getDataFromStorage();

    if (highscores.length > 0) {
      highscores.sort(function (a: { score: number }, b: { score: number }) {
        b.score - a.score;
      });

      setScores(highscores);
    }
  };

  const restart = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>List of Scores</Text>
      {scores?.map((s, index) => {
        return (
          <View style={{ flexDirection: "row" }} key={index}>
            <Text style={styles.textTitle}>{s.name}</Text>
            <Text style={styles.textTitle}>{s.score}</Text>
            <Text style={styles.textTitle}>{s.createdDate}</Text>
          </View>
        );
      })}
      <Pressable style={styles.button} onPress={restart}>
        <Text style={styles.text}>Retry</Text>
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
  textTitle: {
    color: "black",
    fontSize: 16,
    padding: 10,
    flexDirection: "row",
    // marginRight: 10,
    // borderRightColor: "black",
    // borderRightWidth: 1,
  },
});
