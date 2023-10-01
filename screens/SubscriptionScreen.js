import React, { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native";
import { View, SafeAreaView, Text } from "react-native";

const SubscriptionScreen = ({navigation}) =>{

    const [plan, setPlan] = useState(null)
    const handleContinue = () => {
        //signup functions 
        if(plan =='free'){
        navigation.navigate('Main')
        }
      }


    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{}}>
                <Text style={{ fontSize: 23, marginTop: 20, color:'#C67C4E', textAlign:'center'}}>Subscription</Text>
            </View>
            <View style={{padding: 10, flex: 1}}>
                <Text style={{marginTop: 20, fontSize: 23}}>Choose Plan</Text>
                <View style={{justifyContent:'space-between', flex: 1}}>
                    <View style={{flex: 1}}>
                    <Pressable onPress={()=> setPlan('free')} style={{shadowColor: 'black',
                                        shadowOffset: {
                                        width: 0,
                                        height: 2,
                                        },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 3,
                                        elevation: 5,
                                        marginTop: 20}}>
                        <View style={{backgroundColor:'#C67C4E', width:'96%', marginLeft:'2%',  paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, borderTopRightRadius: 5, borderTopLeftRadius: 5}}>
                            <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={{color:'white', fontSize: 25, fontWeight: 600, marginBottom: 15}}>Free plan</Text>
                            {plan == 'free'? <Image style={{backgroundColor:'white', width: 20, height: 20, borderRadius: 50}} source={{uri: "https://img.icons8.com/ios/50/checked--v1.png"}} /> : <Text></Text>}
                            
                            </View>
                            <Text style={{color:'white', fontSize: 15}}>Unlock a world of possibilities with our exclusive FREE TRIAL</Text>
                        </View>
                        <View style={{backgroundColor:'white', width:'96%', marginLeft:'2%', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                            <Text style={{padding: 20, color: '#C67C4E'}}>3 Free Trials Left</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> setPlan('paid')} style={{shadowColor: 'black',
                                        shadowOffset: {
                                        width: 0,
                                        height: 2,
                                        },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 3,
                                        elevation: 5,
                                        marginTop: 20}}>
                        <View style={{backgroundColor:'#C67C4E', width:'96%', marginLeft:'2%',  paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40, borderTopRightRadius: 5, borderTopLeftRadius: 5}}>
                            <View style={{justifyContent:'space-between', flexDirection:'row'}}>
                            <Text style={{color:'white', fontSize: 25, fontWeight: 600, marginBottom: 15}}>Premium plan</Text>
                            {plan == 'paid'? <Image style={{backgroundColor:'white', width: 20, height: 20, borderRadius: 50}} source={{uri: "https://img.icons8.com/ios/50/checked--v1.png"}} /> : <Text></Text>}
                            
                            </View>
                            <Text style={{color:'white', fontSize: 15}}>Experience premium features with no commitment</Text>
                        </View>
                        <View style={{backgroundColor:'white', width:'96%', marginLeft:'2%', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                            <Text style={{padding: 20, color: '#C67C4E'}}>$5/Month</Text>
                        </View>
                    </Pressable>
                    </View>
                    {plan == null ?
                    <View style={{
                        width: "100%",
                        height: 62,
                        borderRadius: 16,
                        backgroundColor: "#E3BDA7",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 30
                      }} >
                    <Text style={styles.buttonText}>Continue</Text>
                  </View>
                  : 
                    <TouchableOpacity style={styles.button} onPress={handleContinue} >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>}
                </View>
            
            </View>
        </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    button: {
        width: "100%",
        height: 62,
        borderRadius: 16,
        backgroundColor: "#C67C4E",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
      },
      buttonText: {
        fontSize: 16,
        fontFamily: 'Sora_400Regular',
        fontWeight: '600',
        color: '#fff'
      }
})

export default SubscriptionScreen