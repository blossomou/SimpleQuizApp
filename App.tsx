import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import StackNavigator from './StackNavigator';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "50%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "dotted",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

// const onPressHandler = () => {
//   fetch(dbURL)
//     .then((response) => {
//       if (response.ok) {
//         response.json().then((data) => {
//           if (data.results.length > 0) {
//             console.log(data.results);
//           }
//         });
//       }
//     })
//     .catch((err) => console.log(err));
// };

// const onPressHandlerAsync = async () => {
//   try {
//     const response = await fetch(dbURL);

//     if (response.ok) {
//       const data = await response.json();

//       if (data.results.length > 0) {
//         console.log(data.results);
//       }
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };
