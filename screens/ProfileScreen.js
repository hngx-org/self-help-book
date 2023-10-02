import React, { useState } from "react";
import { ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native";
import { Text, View } from "react-native";

const ProfileScreen = ({navigation}) =>{
    const [loading, setLoading] = useState(false)

    const handleLogout = async () =>{
        setLoading(true)
        try {
            const res = await fetch('https://spitfire-interractions.onrender.com/api/auth/logout');
            const response = await res.json()
            if(response.message == 'success'){
                navigation.navigate('Login')
            }
        
            // Add this line to inspect the response
            console.log('Response:', response);
        
            setLoading(false);
          } catch (error) {
            console.log('Error logging out', error);
          }
        setLoading(false)
    }
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
                {loading? 
                <TouchableOpacity style={{flexDirection:'row', backgroundColor:'white', padding: 15, borderRadius: 5, marginVertical: 20, alignItems:'center'}}>
                <ActivityIndicator size='small' color='black' />
            </TouchableOpacity>
            :
                <TouchableOpacity onPress={handleLogout} style={{flexDirection:'row', backgroundColor:'white', padding: 15, borderRadius: 5, marginVertical: 20, alignItems:'center'}}>
                    <Text style={{color:'#C67C4E', marginRight: 10}}>Log Out</Text>
                    <Image style={{width: 22, height: 22}} source={require('../assets/exit.png')} />
                </TouchableOpacity>}
            </View>
            {/* <Text>profile</Text> */}
        </SafeAreaView>
    )
}

export default ProfileScreen