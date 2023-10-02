import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView, View } from "react-native";
import { Text } from "react-native";
import { supabase } from "../utils/supabase";
import { ActivityIndicator } from "react-native";

const HistoryScreen = () =>{

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getUser = async() =>{
            setLoading(true)
          try {
            const res = await fetch('https://spitfire-interractions.onrender.com/api/auth/@me');
            const response = await res.json()
        
            // Add this line to inspect the response
            // console.log('Response:', response);
            if(response){
            let {data} = await supabase.from('chats')
            .select('*')
            .eq('user_id', response?.data?.id)
            // console.log(data?.length)
            setData(data)
            }
        
            // setLoading(false);
          } catch (error) {
            console.error('Error logging out', error);
          }
          setLoading(false)
        }
        getUser()
      },[])
    return(
        <SafeAreaView style={{flex: 1}}>
            <View style={{position:'absolute', padding: 20,left: 150}}>
                <Text style={{ fontSize: 23, marginTop: 20, color:'#C67C4E'}}>History</Text>
            </View>
            <View style={{marginTop: 50, flex: 1}}>
            {loading? 
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <ActivityIndicator size='large' color='black' />
            </View>
            :
            <FlatList
            style={{paddingHorizontal: 20, flex: 1}}
                    data={data}
                    renderItem={({ item }) => (                        
            <Text style={{borderWidth: 2, borderColor:'black', textAlign:'center', padding: 10, marginTop: 10}}>{item?.chat[0]?.question}</Text>
                      )}
                    keyExtractor={(item, index) => index.toString()} // Use index as key
      // Other props like numColumns, horizontal, etc. can be added here
                    />}
            </View>
        </SafeAreaView>
    )
}

export default HistoryScreen;