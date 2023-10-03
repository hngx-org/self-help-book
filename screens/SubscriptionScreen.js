import React, { useState, useEffect } from "react";
import { Image, Pressable, StyleSheet, TouchableOpacity, View, SafeAreaView, Text } from "react-native";
import CustomHeader from "../components/CustomHeader";
import {useFonts, Sora_400Regular, Sora_600SemiBold} from '@expo-google-fonts/sora'
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionScreen = ({ navigation }) => {
  const [fontsLoaded, fontError] = useFonts({Sora_400Regular, Sora_600SemiBold});
  const [user, setUser] = useState(null);
  const checkIcon = "https://img.icons8.com/ios-filled/ffffff/50/ok--v1.png";
  const [plan, setPlan] = useState(null);

  const handleContinue = () => {
    //signup functions
    if (plan == "free") {
      navigation.navigate("Main");
    }
  };

  
  useEffect(() => {
    const getUser = async() => {
      const user = await AsyncStorage.getItem('user');
      setUser(JSON.parse(user));
      console.log(JSON.parse(user));

      if (!fontsLoaded && !fontError) {
        return null;
      }
    }
    getUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CustomHeader title="Subscription" showIcon={false} />
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <Text style={{ marginTop: 20, fontSize: 23 }}>Choose Plan</Text>
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View style={{ flex: 1, alignItems: 'center',}}>
            <Pressable
              onPress={() => setPlan("free")}
              style={{
                shadowColor: "#2F2D2C",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 5,
                marginTop: 20,
                width: '100%',
              }}
            >
              <View
                style={{
                  backgroundColor: "#C67C4E",
                  width: "100%",
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  paddingBottom: 40,
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 25,
                      fontWeight: 600,
                      marginBottom: 15,
                      fontFamily: 'Sora_600SemiBold',
                    }}
                  >
                    Free plan
                  </Text>
                  {plan == "free" ? (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={{
                        uri: checkIcon,
                      }}
                    />
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <Text style={{ color: "white", fontSize: 15, fontFamily: 'Sora_400Regular', }}>
                  Unlock a world of possibilities with our exclusive FREE TRIAL
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <Text style={{ padding: 20, color: "#C67C4E", fontFamily: 'Sora_400Regular' }}>
                  {user ? user.credits : 3} Free Trials Left
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setPlan("paid")}
              style={{
                shadowColor: "#2F2D2C",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 5,
                marginTop: 20,
                width: '100%',
              }}
            >
              <View
                style={{
                  backgroundColor: "#C67C4E",
                  width: "100%",
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  paddingBottom: 40,
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                }}
              >
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 25,
                      fontWeight: 600,
                      marginBottom: 15,
                      fontFamily: 'Sora_600SemiBold',
                    }}
                  >
                    Premium plan
                  </Text>
                  {plan == "paid" ? (
                    <Image
                      style={{
                        width: 24,
                        height: 24,
                      }}
                      source={{
                        uri: checkIcon,
                      }}
                    />
                  ) : (
                    <Text></Text>
                  )}
                </View>
                <Text style={{ color: "white", fontSize: 15, fontFamily: 'Sora_400Regular' }}>
                  Experience premium features with no commitment
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                }}
              >
                <Text style={{ padding: 20, color: "#C67C4E", fontFamily: 'Sora_400Regular' }}>$5/Month</Text>
              </View>
            </Pressable>
          </View>
          
          {/* Subsscription button */}
            {/* {plan ? (
              <TouchableOpacity onPress={handleContinue} >
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            ) : (
              <View style={[styles.button, {backgroundColor: `${plan ? '#C67C4E':'#E2BDA6'}`, justifyContent:'center', alignItems:'center'}]}>
              <Text style={styles.buttonText}>Continue</Text>
              </View>
            )} */}
            {plan?
            <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={[styles.buttonText, {fontFamily: 'Sora_400Regular'}]}>Continue</Text>
        </TouchableOpacity>
        :
        <View style={{backgroundColor: '#E2BDA6', 
        justifyContent:'center', 
        alignItems:'center', 
        width: "100%",
        height: 62,
        borderRadius: 16,        
        marginTop: 30,
        marginBottom: 20,}}>
              <Text style={[styles.buttonText, {fontFamily: 'Sora_400Regular'}]}>Continue</Text>
              </View>
        }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 62,
    borderRadius: 16,
    backgroundColor: "#C67C4E",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
  }
});

export default SubscriptionScreen;
