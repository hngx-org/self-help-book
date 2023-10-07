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
  Keyboard,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { globalStyles } from "../components/styles/globalStyles";
import { supabase } from "../utils/supabase";
import uuid from "react-native-uuid";
import selfHelpKeywords from "../utils/selfhelpkeywords";
import { SafeAreaView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen({ navigation }) {
  // Get the height and width of the mobile device
  const { height } = Dimensions.get("window");
  // Variable to hold signed in user
  const [user, setUser] = useState(null);
  // Set loading state
  const [loading, setLoading] = useState(false);
  // Store the user input as prompt
  const [prompt, setPrompt] = useState(null);
  // API base URL
  const baseUrl = "https://spitfire-interractions.onrender.com/";

  // Bypassed AI Url to use for demo
  const apiKey = "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";
  const apiUrl = `https://api.openai.com/v1/engines/text-davinci-002/completions`;

  // Send icon
  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";

  // Function to create a new chat
  const createNewChat = async (id, newChat) => {
    const { data, error } = await supabase
      .from("chats")
      .insert([{ id: id, chat: [newChat], user_id: user.id }])
      .select();
    console.log(data);
  };

  const customAi = async () => {
    const request = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt: prompt,
        max_tokens: 1024,
        temperature: 0.9,
      }),
    });

    const response = await request.json();

    const selfHelp = {
      question: prompt,
      answer: response.choices[0].text,
    };

    return selfHelp;
  };

  // Function to get details of sign in user
  const getSignedInUser = async () => {
    const asyncUser = await AsyncStorage.getItem("user");
    const subscribed = JSON.parse(asyncUser).subscribed;
    console.log(subscribed);
    const req = await fetch(`${baseUrl}/api/auth/@me`);
    const user = await req.json();
    setUser({ ...user.data, subscribed });
    console.log(user.data);
    console.log("Focused");
  };

  const sendPrompt = async () => {
    console.log("sending...");
    setLoading(true);
    const chatId = uuid.v4();
    try {
      // Check if prompt is empty or not
      if (prompt) {
        // Check if the prompt contains keywords related to self-help
        const containsSelfHelpKeywords = selfHelpKeywords.some((keyword) =>
          prompt.toLowerCase().includes(keyword.toLowerCase())
        );

        // Check if the user has any credits left
        if (user.credits <= 0 && user.subscribed === false) {
          Alert.alert(
            "Sorry",
            "You have no credits left, please buy more credits to continue using the app",
            [
              {
                text: "Buy Credits",
                onPress: () => navigation.navigate("Subscription"),
              },
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
            ]
          );
          return;
        }

        if (containsSelfHelpKeywords) {
          // Define self help variable
          let selfHelp;
          // Check if the user is subscribed or not
          if (user.subscribed === false) {
            // Send prompt request to the chatgpt API using the backend API
            const req = await fetch(`${baseUrl}/api/chat/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                user_input: prompt,
              }),
            });
            const response = await req.json();
            console.log(response);

            if (
              response.content &&
              response.content ==
                "The server is experiencing a high volume of requests. Please try again later."
            ) {
              setLoading(true);
              Alert.alert(
                "Sorry",
                "The server is experiencing a high volume of requests. Please try again later.",
                [
                  {
                    text: "Contiue with alternative",
                    onPress: async () => {
                      selfHelp = await customAi();
                      console.log(selfHelp);
                      // Create a new chat and save to supabase;
                      await createNewChat(chatId, selfHelp);
                      // Navigate to the result screen and send the selfHelp variable
                      navigation.navigate("Results", {
                        result: [selfHelp],
                        chatId,
                      });
                      console.log("sent");
                    },
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ]
              );
              setLoading(false);
              return;
            } else if (
              response.message &&
              response.message.includes("Invalid request")
            ) {
              Alert.alert("Sorry, invalid request");
              return;
            } else {
              console.log(response.content);
              // Create a response variable called selfHelp to hold both the question and the result
              // This will be sent to the result screen
              selfHelp = {
                question: prompt,
                answer: response.message && response.message,
              };
              // Create a new chat and save to supabase;
              await createNewChat(chatId, selfHelp);
              // Navigate to the result screen and send the selfHelp variable
              navigation.navigate("Results", { result: [selfHelp], chatId });
              console.log("sent");
            }
          } // If the user is subscribed, send prompt request to the OpenAI API
          else if (user.subscribed === true) {
            const request = await fetch(apiUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
              },
              body: JSON.stringify({
                prompt: prompt,
                max_tokens: 1024,
                temperature: 0.9,
              }),
            });

            const response = await request.json();

            selfHelp = {
              question: prompt,
              answer: response.choices[0].text,
            };
          }

          // Create a new chat and save to supabase;
          // await createNewChat(chatId, selfHelp);
          // // Navigate to the result screen and send the selfHelp variable
          // navigation.navigate("Results", { result: [selfHelp], chatId });
          // console.log("sent");
        } else {
          // Display a response for non-self-help questions
          const nonSelfHelpResponse =
            "We can only provide answer to self help related questions.";

          Alert.alert("Sorry", nonSelfHelpResponse);
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

  useFocusEffect(
    React.useCallback(() => {
      getSignedInUser();
    }, []) // Empty dependency array to ensure it runs only on screen focus
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.homeTextContainer}>
          <Text style={[styles.homeText, { fontSize: height * 0.05 }]}>
            Share your thoughts, goals, or concerns, and let's start this
            journey together
          </Text>
        </View>
      </TouchableWithoutFeedback>

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
    </SafeAreaView>
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
  },
  homeText: {
    textAlign: "center",
    color: "#C67C4E",
    fontFamily: "Sora_600SemiBold",
  },
});
