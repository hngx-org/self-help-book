import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ImageBackground } from "react-native";
import { useFonts, Sora_400Regular } from "@expo-google-fonts/sora";

const OnboardingScreen = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({ Sora_400Regular });
  if (!fontsLoaded && !fontError) {
    return null;
  } else {
    console.log("Fonts loaded");
    // console.log(Sora_400Regular)
  }
  // console.log("Working");
  return (
    <ImageBackground
      source={require("../assets/Onboarding.png")}
      style={styles.container}
    >
      <View style={{ flex: 1, justifyContent: "flex-end", width: '100%', rowGap: 50, }}>
        <Text
          style={{
            color: "white",
            fontSize: 50,
            textAlign: "center",
            marginBottom: 20,
            fontFamily: 'Sora_400Regular',
          }}
        >
          Guiding You Through Life's Challenges: Find Motivation and Thrive
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={{
            marginBottom: 10,
            backgroundColor: "#C67C4E",
            justifyContent: "center",
            alignItems: "center",
            height: 62,
            borderRadius: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontFamily: 'Sora_400Regular', }}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});

export default OnboardingScreen;
