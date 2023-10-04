import { useFonts, Sora_400Regular } from '@expo-google-fonts/sora';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { supabase } from '../utils/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen({ navigation }) {
  let [fontsLoaded, fontError] = useFonts({ Sora_400Regular });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add isLoading state

  const handleSignUp = async () => {
    setIsLoading(true); // Set isLoading to true when signup starts
    try {
      // const response = await axios.post(
      //   'https://spitfire-interractions.onrender.com/api/auth/register',
      //   {
      //     name,
      //     email,
      //     password,
      //     confirm_password: confirmPassword,
      //   }
      // );
      const req = await fetch('https://spitfire-interractions.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, confirm_password: confirmPassword })
      });
      const response = await req.json();
      console.log(response)

      if (response.message == 'User Created Succesfully') {
        // Registration successful
        console.log('Registration successful', response.data);
        // Save user to local storage
        AsyncStorage.setItem('user', JSON.stringify(response.data));
        // Save user to Supabase
        const { data, error } = await supabase
          .from("users")
          .insert([{ id: response.data.id, name, email, password }])
          .select();
        navigation.navigate('Subscription');
      } else {
        console.error('Registration failed');
        Alert.alert('Registration Failed', 'Please check your input and try again.');
      }
    } catch (error) {
      console.error('Error during registration', error);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Registration Failed', error.response.data.message);
      } else {
        Alert.alert('Registration Error', 'An error occurred during registration.');
      }
    } finally {
      setIsLoading(false);
      setName(null);
      setEmail(null);
      setPassword(null);
    }
  };
  if (!fontsLoaded && !fontError) {
    // console.log("Not loaded")
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      <Text style={[styles.mainText, isLoading && styles.fadeContainer]}>Sign Up</Text>
      <View style={[styles.container, isLoading && styles.fadeContainer]}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholderTextColor={'#bababa'}
            placeholder={'Name (A single name)'}
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#bababa'}
            placeholder={'Email'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#bababa'}
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'#bababa'}
            placeholder={'Confirm password'}
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          />
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text1}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.text2}>Login</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Sign Up</Text>
          )}
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
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
  fadeContainer: {
    opacity: 0.6,
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