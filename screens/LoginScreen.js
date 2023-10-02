import { useFonts, Sora_400Regular } from '@expo-google-fonts/sora';
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, Dimensions } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {
  const { height } = Dimensions.get('window');
  let [fontsLoaded, fontError] = useFonts({ Sora_400Regular });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://spitfire-interractions.onrender.com/api/auth/login',
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        // Login successful
        console.log('Login successful', response.data);
        navigation.navigate('Subscription');
      } else {
        console.error('Login failed');
        Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error during login', error);
      if (error.response && error.response.data && error.response.data.message) {
        Alert.alert('Login Failed', error.response.data.message);
      } else {
        Alert.alert('Login Error', 'An error occurred during login.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar />
      <Text style={[styles.mainText, isLoading && styles.fadeContainer]}>Login</Text>
      <View style={[styles.container, isLoading && styles.fadeContainer]}>
        <View style={styles.inputContainer}>
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
        </View>
        <View style={styles.loginContainer}>
          <Text style={styles.text1}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.text2}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
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