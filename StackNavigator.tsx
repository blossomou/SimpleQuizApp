import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from './screens/HomeScreen';
import ScoreScreen from './screens/ScoreScreen';
import { RootStackParamList } from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Welcome" }}
        />
        <Stack.Screen
          name="Score"
          component={ScoreScreen}
          options={{ title: "Score" }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
