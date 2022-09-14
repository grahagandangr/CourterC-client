import { View, Text, StyleSheet, Image, TouchableOpacity, TouchableHighlight } from "react-native";
import tw from "twrnc";
import { AntDesign, Ionicons, EvilIcons } from "@expo/vector-icons";
import formatRupiah from "../helpers/formatRupiah";

export default function CourtCard({ navigation, el }) {
  return (
    <>
      <TouchableHighlight
        underlayColor="white"
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate("DetailCourt", {
            courtId: el.id,
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
              <Text style={tw`text-lg font-bold text-slate-800`}>{el.name}</Text>
              <Text style={tw`text-base text-slate-800`}>
                <EvilIcons name="location" size={20} color="#1e293b" />
                {el.address}
              </Text>
              <View style={tw`flex-row mt-2`}>
                <Text
                  style={tw`text-sm rounded-lg text-slate-800 bg-blue-200 mx-1 w-14 justify-center items-center text-center p-1`}
                >
                  <AntDesign name="star" size={14} color="orange" /> 4.6
                </Text>
                <Text
                  style={tw`text-sm rounded-lg text-slate-800 bg-blue-200 mx-1 w-25 justify-center items-center text-center p-1`}
                >
                  {formatRupiah(el.price)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </>
  );
}
