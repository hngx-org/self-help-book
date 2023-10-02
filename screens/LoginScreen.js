import { useFonts, Sora_400Regular } from '@expo-google-fonts/sora';
import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SignupScreen({navigation}) {
  let [fontsLoaded, fontError] = useFonts({Sora_400Regular})
  const handleSignUp = () => {
    //signup functions 
    navigation.navigate('Subscription')
  }

  if (!fontsLoaded && !fontError) {
    // console.log("Not loaded")
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      <Text style={styles.mainText}>Login</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholderTextColor={'#bababa'} placeholder={'Email'} />
          <TextInput style={styles.input} placeholderTextColor={'#bababa'} placeholder={'Password'} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text1}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: '90%',
  },
  mainText: {
    color: "#C67C4E",
    fontFamily: 'Sora_400Regular',
    fontSize: 34,
    fontWeight: '600'
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },
  input: {
    fontFamily: 'Sora_400Regular',
    color: "#2F2D2C",
    width: "100%",
    height: 56,
    borderWidth: 2,
    borderColor: "#EAEAEA",
    borderRadius: 14,
    paddingHorizontal: 20,
    fontWeight: "600",
    marginTop: 30,
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: "row"
  },
  text1: {
    fontSize: 13,
    color: '#9B9B9B',
    fontFamily: 'Sora_400Regular',
  },
  text2: {
    fontFamily: 'Sora_400Regular',
    fontSize: 13,
    color: "#C67C4E",
    fontWeight: '700'
  },
  button: {
    width: "100%",
    height: 62,
    borderRadius: 16,
    backgroundColor: "#C67C4E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  buttonText: {
    fontSize: 16,
    fontFamily: 'Sora_400Regular',
    fontWeight: '600',
    color: '#fff'
  }
})