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
  Dimensions,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import {
  useFonts,
  Sora_400Regular,
  Sora_700Bold,
  Sora_600SemiBold,
} from "@expo-google-fonts/sora";
import { globalStyles } from "../components/styles/globalStyles";
import { supabase } from "../utils/supabase";
import compromise from 'compromise'
import uuid from "react-native-uuid";
import selfHelpKeywords from "../utils/selfhelpkeywords";
import { useEffect } from "react";

export default function HomeScreen({ navigation }) {
  // Get the height and width of the mobile device
  const { height, width } = Dimensions.get("window");
  // Variable to hold signed in user
  const [user, setUser] = useState(null);
  // Set loading state
  const [loading, setLoading] = useState(false);
  // Store the user input as prompt
  const [prompt, setPrompt] = useState(null);
  // API base URL
  const baseUrl = "https://spitfire-interractions.onrender.com/";

  // Send icon
  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";

  // Check if font has loaded or not
  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  // Function to create a new chat
  const createNewChat = async (id, newChat) => {
    const { data, error } = await supabase
      .from("chats")
      .insert([{ id: id, chat: [newChat], user_id: user.id }])
      .select();
    console.log(data);
  };

  // Function to get details of sign in user
  const getSignedInUser = async () => {
    const req = await fetch(`${baseUrl}/api/auth/@me`);
    const user = await req.json();
    setUser({ name: user.data.name, id: user.data.id, email: user.data.email });
  };

  const sendPrompt = async () => {
    console.log("sending...");
    setLoading(true);
    const chatId = uuid.v4();
    try {
      // Check if prompt is empty or not
      if (prompt) {
        // Check if the prompt contains keywords related to self-help
        const containsSelfHelpKeywords = selfHelpKeywords.some(keyword =>
          prompt.toLowerCase().includes(keyword.toLowerCase())
        );

        if (containsSelfHelpKeywords) {
          // Send prompt request to the chatgpt API using the backend API
          const req = await fetch(`${baseUrl}/api/chat/completions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              history: [],
              user_input: prompt
            })
          });
          const response = await req.json();
          console.log(response);
          // Create a response variable called selfHelp to hold both the question and the result
          // This will be sent to the result screen
          const selfHelp = {
            question: prompt,
            answer: response.message,
          };
          // Create a new chat and save to supabase;
          await createNewChat(chatId, selfHelp);
          // Navigate to the result screen and send the selfHelp variable
          navigation.navigate("Results", { result: [selfHelp], chatId });
          console.log("sent");
        } else {
          // Display a response for non-self-help questions
          const nonSelfHelpResponse = "I can't provide answers to questions that are not related to self-help.";
          // Create a response variable called nonSelfHelp to hold the response
          const nonSelfHelp = {
            question: prompt,
            answer: nonSelfHelpResponse,
          };
          // Create a new chat and save to supabase;
          await createNewChat(chatId, nonSelfHelp);
          // Navigate to the result screen and send the nonSelfHelp variable
          navigation.navigate("Results", { result: [nonSelfHelp], chatId });
          console.log("sent");
        }
      } else {
        Alert.alert("Hello, the prompt is empty how can we be of help");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log(user);
      setPrompt(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSignedInUser();
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.homeTextContainer}>
        <Text style={[styles.homeText, { fontSize: height * 0.05 }]}>
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
            {loading ? (
              <ActivityIndicator size="small" color="#2F2D2C" />
            ) : (
              <Image source={{ uri: sendIcon }} style={globalStyles.icon} />
            )}
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
    color: "#C67C4E",
    fontFamily: "Sora_600SemiBold",
  },
});
