import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import ChatCard from "../components/ChatCard";

export default function Chat() {
  return (
    <SafeAreaView>
      <View
        style={tw`bg-blue-600 w-full h-10 rounded-b-3xl opacity-85 px-8 flex flex-row`}
      >
        <Text style={tw`m-auto text-base text-white font-semibold`}>Chat</Text>
      </View>
      <ScrollView>
        <ChatCard />
      </ScrollView>
    </SafeAreaView>
  );
}
