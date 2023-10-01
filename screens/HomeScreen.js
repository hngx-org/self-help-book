import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  useFonts,
  Sora_400Regular,
  Sora_700Bold,
  Sora_600SemiBold,
} from "@expo-google-fonts/sora";
import { globalStyles } from "../components/styles/globalStyles";

export default function HomeScreen({ navigation }) {
  // Load fonts to be used
  const [fontsLoaded, fontError] = useFonts({
    Sora_400Regular,
    Sora_600SemiBold,
    Sora_700Bold,
  });
  // Set loading state
  const [loading, setLoading] = useState(false);
  // Store the user input as prompt
  const [prompt, setPrompt] = useState(null);
  // API base URL
  const baseUrl = "https://spitfire-interractions.onrender.com/";

  // Send icon
  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";

  // Check if font has loaded or not
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const sendPrompt = async () => {
    console.log("sending...");
    setLoading(true);
    try {
      // Check if prompt is empty or not
      if (prompt) {
        // Send prompt request to the chatgpt API using the backend API
        const req = await fetch(`${baseUrl}/api/chat/completions`);
        const response = await req.json();

        // Create a response variable called selfHelp to hold both the question and the result
        // This will be sent to the result screen
        const selfHelp = {
          question: prompt,
          answer: response.message,
        };
        navigation.navigate("Results", { result: [selfHelp] });
        console.log("sent");
      } else {
        Alert.alert("Hello, how can we be of help")
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPrompt(null);
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.homeTextContainer}>
        <Text style={styles.homeText}>
          Share your thoughts, goals, or concerns, and let's start this journey
          together
        </Text>
      </View>
      <View style={globalStyles.inputContainer}>
        <View style={globalStyles.inputField}>
          <TextInput
            style={globalStyles.input}
            value={prompt}
            placeholder="How can we assist you today?"
            onChangeText={(text) => setPrompt(text)}
          />
          <TouchableWithoutFeedback
            onPress={sendPrompt}
            style={globalStyles.iconContainer}
          >
            { loading ? <ActivityIndicator size="small" color="#2F2D2C" /> : <Image source={{ uri: sendIcon }} style={globalStyles.icon} />}
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    rowGap: 50,
    justifyContent: "flex-end",
    paddingHorizontal: 30,
    // paddingBottom: 80,
  },
  homeTextContainer: {
    paddingHorizontal: 20,
  },
  homeText: {
    textAlign: "center",
    fontSize: 40,
    color: "#C67C4E",
    fontFamily: "Sora_600SemiBold",
  },
});
