import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function CourtCard({ navigation }) {
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("DetailCourt");
        }}
      >
        <View style={tw`p-3`}>
          <View style={tw`bg-white rounded-xl shadow-lg`}>
            <Image
              style={tw`w-full h-50 rounded-xl`}
              source={{
                uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
              }}
            />
            <View style={tw`p-3`}>
              <Text style={tw`text-lg font-bold`}>Court 1</Text>
              <Text style={tw`text-sm`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis accumsan eros, quis rhoncus nulla
                ultricies vitae. Mauris interdum, est sit amet fringilla vulputate, urna.
              </Text>
              <View style={tw`flex-row mt-2`}>
                <Text style={tw`text-sm rounded-lg bg-blue-200 mx-1 w-14 justify-center items-center text-center p-1`}>
                  <AntDesign name="star" size={14} color="orange" /> 4.6
                </Text>
                <Text style={tw`text-sm rounded-lg bg-blue-200 mx-1 w-20 justify-center items-center text-center p-1`}>
                  <Ionicons name="location-outline" size={14} color="black" /> 1/2 km
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
}
