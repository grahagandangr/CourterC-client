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
  TouchableHighlight,
  ImageBackground,
  Dimensions,
  StyleSheet,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import OwnerCard from "../components/OwnerCard";

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
        source={{
          uri: "https://image.tmdb.org/t/p/original/nmGWzTLMXy9x7mKd8NKPLmHtWGa.jpg",
        }}
      >
        <View style={tw`justify-center items-center py-15 mx-1`}>
          <Text style={tw`text-white font-bold text-3xl text-center`}>
            HomeOwnerrrrrrrrrrrrr
          </Text>
          <TouchableOpacity
            style={tw`bg-blue-600 rounded-xl px-2 py-1 shadow-lg mt-3`}
          >
            <Text style={tw`text-white font-bold text-2xl text-center`}>
              Add CourtCategories
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Text style={tw`text-2xl font-bold m-2`}>All Courts</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OwnerCard/>
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
