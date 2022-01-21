import AsyncStorage from '@react-native-async-storage/async-storage';

export const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

export const getDataFromStorage = async () => {
  try {
    const result = await AsyncStorage.getItem("Scores");

    return result ? JSON.parse(result) : [];
  } catch (e) {}
};

export const removeData = async () => {
  await AsyncStorage.removeItem("Scores");
};
