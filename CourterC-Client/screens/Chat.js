import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, StyleSheet } from "react-native";
import * as TalkRn from "@talkjs/expo";
import { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatCard from "../components/ChatCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRoute } from "@react-navigation/native";

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@${key}`);

    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export default function Chat() {
  const [sender, setSender] = useState({});
  const [receiver, setReceiver] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const owner = await getData("owner");
          const customer = await getData("customer");
          console.log(owner);

          const role = await AsyncStorage.getItem("@role");

          if (role === "customer") {
            setSender(customer);
            setReceiver(owner);
          } else if (role === "owner") {
            setSender(owner);
            setReceiver(customer);
          }
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      })();
    }, [])
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="00ff00" />
      </SafeAreaView>
    );
  }

  const me = {
    id: sender.talkId.TalkJSID,
    name: sender.talkId.name,
    email: "alice@example.com",
    photoUrl: "https://talkjs.com/images/avatar-1.jpg",
    welcomeMessage: "Hey there! How are you? :-)",
    role: "default",
  };

  const other = {
    id: receiver.talkId.TalkJSID,
    name: receiver.talkId.name,
    email: "Sebastian@example.com",
    photoUrl: "https://talkjs.com/images/avatar-5.jpg",
    welcomeMessage: "Hey, Ada yang bisa saya bantu?",
    role: "default",
  };

  const conversationBuilder = TalkRn.getConversationBuilder(TalkRn.oneOnOneId(me, other));

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  return (
    // <View>
    <TalkRn.Session appId="t5IUgmQn" me={me}>
      <TalkRn.Chatbox conversationBuilder={conversationBuilder} />
    </TalkRn.Session>
    //  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
