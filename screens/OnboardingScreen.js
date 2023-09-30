import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigation } from '../navigation/TabNavigation';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const OnboardingScreen = ({navigation}) => {
  // console.log("Working");
  return (
    <ImageBackground 
    source={require('../assets/Onboarding.png')}
    style={styles.container}>
      <View style={{flex: 1, justifyContent:'flex-end', padding: 30}}>
      <Text style={{color: 'white', fontSize: 40, textAlign:'center', marginBottom: 20}}>Guiding You Through Life's Challenges: Find Motivation and Thrive</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={{marginBottom: 10, backgroundColor:'#C67C4E', justifyContent:'center', alignItems:'center', padding: 13, borderRadius: 10}}>
      <Text style={{color:'white', fontSize: 22}} >Get Started</Text>
      </TouchableOpacity>
      </View>
    </ImageBackground>
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