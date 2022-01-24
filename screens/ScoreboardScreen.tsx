import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import AppStyles from '../AppStyles';
import { getDataFromStorage, removeData } from '../utils/random';

type ScoreProps = {
  name: string;
  score: number;
  createdDate: Date;
};
const ScoreboardScreen = () => {
  const { height, width } = useWindowDimensions();

  const navigation = useNavigation();
  const [scores, setScores] = useState<ScoreProps[] | null>(null);

  useEffect(() => {
    getData();
  }, [scores]);

  const getData = async () => {
    const highscores = await getDataFromStorage();

    if (highscores.length > 0) {
      highscores.sort((a: { score: number }, b: { score: number }) => {
        return b.score - a.score;
      });

      setScores(highscores);
    }
  };

  const restart = () => {
    navigation.navigate("Home");
  };

  const clearData = async () => {
    await removeData();
    setScores(null);
  };

  return (
    <View style={AppStyles.container}>
      <Text style={[styles.textTitle, { fontWeight: "800", fontSize: 25 }]}>
        List of Scores
      </Text>
      <View
        style={{
          height: height / 2,
          width: width / 2,
          borderColor: "pink",
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderStyle: "solid",
          alignItems: "center",
        }}
      >
        <ScrollView>
          {scores?.map((s, index) => {
            return (
              <View style={{ flexDirection: "row" }} key={index}>
                <Text style={styles.textTitle}>{s.name}</Text>
                <Text style={[styles.textTitle, { fontWeight: "bold" }]}>
                  {s.score}
                </Text>
                <Text style={styles.textTitle}>{s.createdDate}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ flexDirection: "row" }}>
        <Pressable
          style={[AppStyles.button, { marginRight: 10, marginTop: 10 }]}
          onPress={restart}
        >
          <Text style={AppStyles.text}>Retry</Text>
        </Pressable>
        <Pressable style={AppStyles.button} onPress={clearData}>
          <Text style={AppStyles.text}>Clear</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ScoreboardScreen;

const styles = StyleSheet.create({
  textTitle: {
    color: "black",
    fontSize: 16,
    padding: 10,
    flexDirection: "row",
  },
});
