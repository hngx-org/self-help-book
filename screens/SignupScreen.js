import React from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function SignupScreen({navigation}) {

  const handleSignUp = () => {
    //signup functions 
    navigation.navigate('Subscription')
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      <Text style={styles.mainText}>Sign Up</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder={'Email'} />
          <TextInput style={styles.input} placeholder={'Email'} />
          <TextInput style={styles.input} placeholder={'Email'} />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text1}>already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text2}>login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp} >
          <Text style={styles.buttonText}>Sign Up</Text>
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
    fontSize: 34,
    fontWeight: '600'
  },
  inputContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15
  },
  input: {
    width: "100%",
    height: 56,
    borderWidth: 2,
    borderColor: "#EAEAEA",
    borderRadius: 14,
    padding: 10,
    fontWeight: "600",
    marginTop: 30
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: "row"
  },
  text1: {
    fontSize: 12,
    color: '#9B9B9B'
  },
  text2: {
    fontSize: 12,
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
    fontWeight: '600',
    color: '#fff'
  }
})