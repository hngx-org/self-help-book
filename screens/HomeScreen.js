import React from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useFonts, Sora_400Regular, Sora_700Bold, Sora_600SemiBold } from "@expo-google-fonts/sora";
import { globalStyles } from "../components/styles/globalStyles";


export default function HomeScreen({ navigation }) {
  const [fontsLoaded, fontError] = useFonts({ Sora_400Regular, Sora_600SemiBold, Sora_700Bold });
  
  if (!fontsLoaded && !fontError) {
    console.log("Not loaded");
    return null;
  }

  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";
  const sendPrompt = async () => {
    console.log("sending...");
    navigation.navigate("Results");
    console.log("sent");
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
            placeholder="How can we assist you today?"
          />
          <TouchableWithoutFeedback
            onPress={sendPrompt}
            style={globalStyles.iconContainer}
          >
            <Image source={{ uri: sendIcon }} style={globalStyles.icon} />
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
    fontFamily: 'Sora_600SemiBold',
  },
});
