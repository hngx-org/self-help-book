import React from "react";
import { View, SafeAreaView, Text } from "react-native";

const SubscriptionScreen = () =>{
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{}}>
                <Text style={{ fontSize: 23, marginTop: 20, color:'#C67C4E', textAlign:'center'}}>Subscription</Text>
            </View>
            <View style={{padding: 10, flex: 1}}>
                <Text style={{marginTop: 20, fontSize: 23}}>Choose Plan</Text>
            
            </View>
        </SafeAreaView>
    )
}

export default SubscriptionScreen