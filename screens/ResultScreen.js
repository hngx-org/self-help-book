import React from "react";
import { View, StatusBar, TextInput, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import CustomHeader from "../components/CustomHeader";
import { FlatList } from "react-native";
import ResultCard from "../components/SelfHelpResultCard";
import { globalStyles } from "../components/styles/globalStyles";

const ResultScreen = ({result}) => {
  const sendIcon = "https://img.icons8.com/ios-glyphs/2F2D2C/30/sent.png";
  const data = [
    {
      id: 1,
      question: "How do I improve my mental health?",
      answer: `You can improve your mental health by doing the following:
      - Eat healthy
      - Exercise regularly
      - Get enough sleep
      - Practice gratitude
      - Practice mindfulness
      - Practice meditation
      - Practice yoga
      - Practice self-care`,

    },
    {
      id: 2,
      question: "How do I improve my mental health?",
      answer: `You can improve your mental health by doing the following:
      - Eat healthy
      - Exercise regularly
      - Get enough sleep
      - Practice gratitude
      - Practice mindfulness
      - Practice meditation
      - Practice yoga
      - Practice self-care`,

    },
    {
      id: 3,
      question: "How do I improve my mental health?",
      answer: `You can improve your mental health by doing the following:
      - Eat healthy
      - Exercise regularly
      - Get enough sleep
      - Practice gratitude
      - Practice mindfulness
      - Practice meditation
      - Practice yoga
      - Practice self-care`,

    },
    {
      id: 4,
      question: "How do I improve my mental health?",
      answer: `You can improve your mental health by doing the following:
      - Eat healthy
      - Exercise regularly
      - Get enough sleep
      - Practice gratitude
      - Practice mindfulness
      - Practice meditation
      - Practice yoga
      - Practice self-care`,

    },
  ]

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CustomHeader title="Result" />

      <View style={styles.resultContainer}>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <ResultCard result={item} />
          )}
        />
      </View>

      <View style={[globalStyles.inputContainer, styles.inputContainer]}>
        <View style={globalStyles.inputField}>
          <TextInput
            style={globalStyles.input}
            placeholder="How can we assist you today?"
          />
          <TouchableOpacity
            // onPress={sendPrompt}
            style={globalStyles.iconContainer}
          >
            <Image source={{ uri: sendIcon }} style={globalStyles.icon} />
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
