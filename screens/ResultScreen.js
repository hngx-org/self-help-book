import React, { useEffect, useState } from "react";
import {
  View,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import { FlatList } from "react-native";
import ResultCard from "../components/SelfHelpResultCard";
import { globalStyles } from "../components/styles/globalStyles";
import { supabase } from "../utils/supabase";
import { SafeAreaView } from "react-native";

import selfHelpKeywords from "../utils/selfhelpkeywords";

const ResultScreen = ({ route }) => {
  const chatId = route.params.chatId;
  const [user, setUser] = useState(null);
  const [data, setData] = useState(route.params.result);
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";
  const baseUrl = "https://spitfire-interractions.onrender.com/";

  const addNewChat = async (newChat) => {
    const { data: chats } = await supabase
      .from("chats")
      .select("chat")
      .eq("id", chatId);
    const { error } = await supabase
      .from("chats")
      .update({ chat: [...chats[0].chat, newChat] })
      .eq("id", chatId);
  };

  // Function to get details of sign in user
  const getSignedInUser = async () => {
    const req = await fetch(`${baseUrl}/api/auth/@me`);
    const user = await req.json();
    setUser({ ...user.data });
  };

  const sendPrompt = async () => {
    console.log("sending...");
    setLoading(true);
    try {
      // Check if prompt is empty or not
      if (prompt) {
        // Check if the prompt contains keywords related to self-help
        const containsSelfHelpKeywords = selfHelpKeywords.some((keyword) =>
          prompt.toLowerCase().includes(keyword.toLowerCase())
        );
        // Check if the user has any credits left
        if (user.credits <= 0) {
          Alert.alert(
            "Sorry",
            "You have no credits left, please buy more credits to continue using the app"
          );
          return;
        }

        if (containsSelfHelpKeywords) {
          // Send prompt request to the chatgpt API using the backend API
          const req = await fetch(`${baseUrl}/api/chat/completions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              history: data,
              user_input: prompt,
            }),
          });
          console.log(req);
          const response = await req.json();
          
          if(response.content && response.content == "The server is experiencing a high volume of requests. Please try again later."){
            Alert.alert("Sorry", "The server is experiencing a high volume of requests. Please try again later.");
            return;
          }
          if(response.message && response.message.includes("Invalid request")){
            Alert.alert("Sorry, invalid request");
            return;
          }

          console.log(response);
          // Create a response variable called selfHelp to hold both the question and the result
          const selfHelp = {
            question: prompt,
            answer: response.message,
          };
          // Create a new chat and save to supabase;
          await addNewChat(selfHelp);
          setData([...data, selfHelp]);
          console.log("sent");
        } else {
          // Display a response for non-self-help questions
          const nonSelfHelpResponse =
            "We can only provide answer to self help related questions.";

          Alert.alert("Sorry", nonSelfHelpResponse);
        }
      } else {
        Alert.alert("Hello, the prompt is empty. How can we be of help?");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setPrompt(null);
      setLoading(false);
    }
  };

  useEffect(() => {
    getSignedInUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <CustomHeader title="Result" showIcon={false} />

      <View style={styles.resultContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => data.indexOf(item).toString()}
            renderItem={({ item }) => <ResultCard result={item} />}
          />
        ) : (
          <Text>No results found</Text>
        )}
      </View>

      <View style={[globalStyles.inputContainer, styles.inputContainer]}>
        <View style={globalStyles.inputField}>
          <TextInput
            style={globalStyles.input}
            placeholder="How can we assist you today?"
            value={prompt}
            onChangeText={(text) => setPrompt(text)}
          />
          <TouchableOpacity
            onPress={sendPrompt}
            style={globalStyles.iconContainer}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#2F2D2C" />
            ) : (
              <Image source={{ uri: sendIcon }} style={globalStyles.icon} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  resultContainer: {
    paddingTop: 5,
    flex: 1,
    backgroundColor: "#F5F5F5",
    marginBottom: 80,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingHorizontal: 30,
  },
});

export default ResultScreen;
