import {
  Text,
  Image,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function HomeOwner() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          width: windowWidth * 0.9,
          height: 200,
        }}
        imageStyle={{ borderRadius: 30 }}
        source={{ uri: "https://image.tmdb.org/t/p/original/nmGWzTLMXy9x7mKd8NKPLmHtWGa.jpg" }}
      >
        <View style={tw`justify-center items-center py-15 mx-1`}>
          <Text style={tw`text-white font-bold text-3xl text-center`}>HomeOwnerrrrrrrrrrrrr</Text>
          <TouchableOpacity style={tw`bg-blue-600 rounded-xl px-2 py-1 shadow-lg mt-3`}>
            <Text style={tw`text-white font-bold text-2xl text-center`}>Add CourtCategories</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={tw`text-2xl font-bold m-2`}>All Courts</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={{ width: windowWidth * 0.9 }} onPress={() => {}}>
          <View style={tw`p-2`}>
            <View style={tw`flex-row bg-white rounded-xl shadow-lg `}>
              <Image
                style={tw`w-50 h-40 rounded-xl mr-2`}
                source={{
                  uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
                }}
              />
              <View style={tw`flex-col mt-2 my-auto`}>
                <Text style={tw`text-lg font-bold`}>Category</Text>
                <Text style={tw`text-lg font-bold`}>Price</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: windowWidth * 0.9 }} onPress={() => {}}>
          <View style={tw`p-2`}>
            <View style={tw`flex-row bg-white rounded-xl shadow-lg `}>
              <Image
                style={tw`w-50 h-40 rounded-xl mr-2`}
                source={{
                  uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
                }}
              />
              <View style={tw`flex-col mt-2 my-auto`}>
                <Text style={tw`text-lg font-bold`}>Category</Text>
                <Text style={tw`text-lg font-bold`}>Price</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: windowWidth * 0.9 }} onPress={() => {}}>
          <View style={tw`p-2`}>
            <View style={tw`flex-row bg-white rounded-xl shadow-lg `}>
              <Image
                style={tw`w-50 h-40 rounded-xl mr-2`}
                source={{
                  uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
                }}
              />
              <View style={tw`flex-col mt-2 my-auto`}>
                <Text style={tw`text-lg font-bold`}>Category</Text>
                <Text style={tw`text-lg font-bold`}>Price</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});
