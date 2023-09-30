import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Sora_600SemiBold } from "@expo-google-fonts/sora";

const CustomHeader = ({title}) => {
  const [fontsLoaded, fontError] = useFonts({ Sora_600SemiBold });
  const navigation = useNavigation();
  const arrowIcon = "https://img.icons8.com/ios-filled/50/back.png";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.goBack()}
      >
        <Image source={{uri: arrowIcon}} style={styles.icon} />
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F5F5F5",
  },
  iconContainer: {
    width: 20,
    height: 20,
  },
  icon: {
    width: '100%',
    height: '100%',
    objectFit: "contain",
  },
  title: {
    textAlign: "center",
    paddingRight: 54,
    width: "100%",
    fontSize: 18,
    fontWeight: "600",
    color: '#C67C4E',
    fontFamily: 'Sora_600SemiBold',
  }
});

export default CustomHeader;