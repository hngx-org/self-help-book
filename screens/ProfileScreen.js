import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";

const ProfileScreen = () =>{
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{backgroundColor:'#C67C4E', padding: 40, justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:23, marginBottom: 60 }}>Profile</Text>
                <Image style={{marginBottom: 20}} source={require('../assets/profile.png')} />
                <View style={{flexDirection:'row', marginBottom: 10}}>
                    <Text style={{fontSize: 27, color:'white'}}>Hello, </Text>
                    <Text style={{fontSize: 27, color:'white', fontWeight: 600}}>Doe</Text>
                </View>
                <Text style={{color:'white'}}>johndoe@gmail.com</Text>
                <View style={{flexDirection:'row', backgroundColor:'white', padding: 15, borderRadius: 5, marginVertical: 20, alignItems:'center'}}>
                    <Text style={{color:'#C67C4E', marginRight: 10}}>Log Out</Text>
                    <Image style={{width: 22, height: 22}} source={require('../assets/exit.png')} />
                </View>
            </View>
            <Text>profile</Text>
        </SafeAreaView>
    )
}

export default ProfileScreen