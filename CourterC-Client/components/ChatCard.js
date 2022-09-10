import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
const ChatCard = () => {
    return (
        <TouchableOpacity>
        <View style={tw`flex items-center content-center items-center justify-center m-auto bg-white mt-2 p-2 w-5/6 rounded-xl`}>
          <View style={tw`flex ml-2 flex-row w-full`}>
            <Image
              source={{uri:"https://i.imgur.com/aq39RMA.jpg"}}
              style={tw`rounded-full h-10 w-10 content-center justify-center`}
            />
            <View style={tw`flex flex-col ml-2`}>

              <Text style={tw`font-medium text-sm text-black`}>Jessica Koel</Text>
              <Text style={tw`text-xs text-gray-400 w-32`}>
                Hey, Joel, I here to help you out please tell me
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
}
export default ChatCard