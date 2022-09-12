import { View, Text, StyleSheet, Image, TouchableOpacity , TouchableHighlight } from "react-native";
import tw from "twrnc";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function CourtCard({ navigation, el }) {
  return (
    <>
      <TouchableHighlight
      underlayColor="white"
      activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("DetailCourt", {
            courtId: el.id
          });
        }}
      >
        <View style={tw`p-3`}>
          <View style={tw`bg-white rounded-xl shadow-lg`}>
            <Image
              style={tw`w-full h-50 rounded-xl`}
              source={{
                uri: el.image,
              }}
            />
            <View style={tw`p-3`}>
              <Text style={tw`text-lg font-bold`}>{el.name}</Text>
              <Text style={tw`text-base`}>
                {el.address}
              </Text>
              <View style={tw`flex-row mt-2`}>
                <Text style={tw`text-sm rounded-lg bg-blue-200 mx-1 w-14 justify-center items-center text-center p-1`}>
                  <AntDesign name="star" size={14} color="orange" /> 4.6
                </Text>
                <Text style={tw`text-sm rounded-lg bg-blue-200 mx-1 w-20 justify-center items-center text-center p-1`}>
                  IDR {el.price.toLocaleString("id-ID")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}
