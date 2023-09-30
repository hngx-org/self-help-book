import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const sendIcon = 'https://img.icons8.com/ios-glyphs/BABABA/30/sent.png';
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <StatusBar />
        <View style={styles.homeTextContainer}>
          <Text style={styles.homeText}>
            Share your thoughts, goals, or concerns, and let's start this
            journey together
          </Text>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.inputField}>
              <TextInput style={styles.input} placeholder="How can we assist you today?" />
              <TouchableWithoutFeedback onPress={() => alert('Pressed')} style={styles.iconContainer}>
                <Image source={{uri: sendIcon}} style={styles.icon} />
              </TouchableWithoutFeedback>
            </View>
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
    // paddingBottom: 80,
  },
  homeTextContainer: {
    paddingHorizontal: 20,
  },
  homeText: {
    textAlign: 'center',
    fontSize: 40,
    color: '#C67C4E',
    fontWeight: '700',
  },
  inputContainer: {
    marginTop: '30%',
    width: '100%',
  },
  inputField: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: '#BABABA',
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    color: '#BABABA',
  },
  iconContainer: {
    width: 24,
    height: 24,
  },
  icon: {
    width: 24,
    height: 24,
    borderWidth: 1,
  },
});
