import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import * as TalkRn from "@talkjs/expo";
import { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatCard from "../components/ChatCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const newData = async (key) => {

  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`)

    return jsonValue != null ? JSON.parse(jsonValue) : null
    
  } catch (error) {

    console.log(error)
    
  }
}

export default function Chat() {
  //
  const [customerID, setCustomerID] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [username, setUsername] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [sender, setSender] = useState({})
  const [reciver, setReciver] = useState({})

  const getData = async () => {
    try {
      const customer = await AsyncStorage.getItem("@talkID");
      const owner = await AsyncStorage.getItem("@talkIdO")
      const username = await AsyncStorage.getItem("@username");
      const ownerName = await AsyncStorage.getItem("@name")
      setOwnerName(ownerName)
      setCustomerID(customer);
      setUsername(username);
      setOwnerID(owner)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
    (async () => {

      try {

        const data = await newData('customer')

        if(!data){

          const owner = await newData('owner')

          setSender(owner.talkId)

        }else {
          setSender(data.talkId)
        }
        
      } catch (error) {
        console.log(error)
      }
    })
  }, []);

  // console.log(getData, "<=====", customerID, ownerID);
  console.log(sender,'<SENDer')
  const me = {
    id: customerID,
    name: username,
    email: "alice@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: ownerID,
    name: 'owner',
    email: "Sebastian@example.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, Ada yang bisa saya bantu?",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other)
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);


  return (
    <TalkRn.Session appId="t5IUgmQn" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
    // <TalkRn.Session appId="t5IUgmQn" me={me}>
    //   <TalkRn.ConversationList onSelectConversation={navigateToChat} />
    // </TalkRn.Session>
  );
}
