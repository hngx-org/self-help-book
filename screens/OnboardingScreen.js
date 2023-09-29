import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigation } from '../navigation/TabNavigation';

const OnboardingScreen = ({navigation}) => {
  console.log("Working");
  return (
    <View style={styles.container}>
      <Text>OnboardingScreen is not showing</Text>
      <Text onPress={() => navigation.navigate('Main')}>OnboardingScreen is not showing</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default OnboardingScreen;