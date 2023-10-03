import React, {useState} from "react";
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
} from "react-native";
import CustomHeader from "../components/CustomHeader";
import { FlatList } from "react-native";
import ResultCard from "../components/SelfHelpResultCard";
import { globalStyles } from "../components/styles/globalStyles";
import { supabase } from "../utils/supabase";

const ResultScreen = ({ route }) => {
  // get the new chat id from the route params
  const chatId = route.params.chatId;
  const [data, setData] = useState(route.params.result);
  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";
  const baseUrl = 'https://spitfire-interractions.onrender.com/';

  // Function to create a new chat
  const addNewChat = async (newChat) => {
    const { data:chats } = await supabase
      .from('chats')
      .select('chat')
      .eq('id', chatId);
    console.log(chats)
    const { error } = await supabase
      .from("chats")
      .update({ chat: [...chats[0].chat, newChat] })
      .eq("id", chatId);
  };

  const sendPrompt = async () => {
    console.log("sending...");
    setLoading(true);
    try {
      // Check if prompt is empty or not
      if (prompt) {
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
        const response = await req.json();
        // Create a response variable called selfHelp to hold both the question and the result
        // This will be sent to the result screen
        const selfHelp = {
          question: prompt,
          answer: response.message,
        };
        // Create a new chat and save to supabase;
        await addNewChat(selfHelp);
        setData([...data, selfHelp]);
        console.log("sent");
      } else {
        Alert.alert("Hello, the prompt is empty how can we be of help");
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
      <StatusBar style="auto" />
      <CustomHeader title="Result" showIcon={false} />

      <View style={styles.resultContainer}>
        {data.length > 0 ? (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => data.indexOf(item)}
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
            {loading ? <ActivityIndicator size="small" color="#2F2D2C" /> : <Image source={{ uri: sendIcon }} style={globalStyles.icon} />}
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
