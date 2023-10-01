import React, { useState } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text } from "react-native";

const HistoryScreen = () =>{

    const [data, setData] = useState(['My name', 'Tunde'])
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{position:'absolute', padding: 20,left: 150}}>
                <Text style={{ fontSize: 23, marginTop: 20, color:'#C67C4E'}}>History</Text>
            </View>
            <View style={{marginTop: 50, flex: 1}}>
            <FlatList
            style={{paddingHorizontal: 20, flex: 1}}
                    data={data}
                    renderItem={({ item }) => (                        
            <Text style={{borderWidth: 2, borderColor:'black', textAlign:'center', padding: 10, marginTop: 10}}>History Screen</Text>
                      )}
                    keyExtractor={(item, index) => index.toString()} // Use index as key
      // Other props like numColumns, horizontal, etc. can be added here
                    />
            </View>
        </SafeAreaView>
    )
}

export default HistoryScreen;