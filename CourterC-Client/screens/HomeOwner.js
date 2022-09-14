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
import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import OwnerCard from "../components/OwnerCard";
import axios from "axios";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

export default function HomeOwner({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [courts, setCourts] = useState({});
  const [categoryCourt, setCategoryCourt] = useState([]);

  const fecthCourts = async () => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token");
      let { data } = await axios.get(url + `/owner/courts`, {
        headers: { access_token },
      });
      console.log(data, "ini data");
      setCourts(data[0]);
      let { data: courtCategory } = await axios.get(url + `/owner/courtCategories`, {
        headers: { access_token },
      });
      setCategoryCourt(courtCategory.courtCategoryFiltered);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      fecthCourts();
    }, [])
  );
  return (
    <SafeAreaView style={styles.container}>
      {courts.id && categoryCourt.length !== 0 ? (
        <>
          <View style={tw`bg-blue-600 w-full h-16 rounded-b-3xl opacity-85 px-8 mb-5`}>
            <View style={tw`flex flex-row mt-4 justify-between`}>
              <View style={tw`flex flex-row`}>
                <Ionicons name="person" size={22} color="white" style={tw`mt-2 mr-1`} />
                <Text style={tw`text-white text-base font-bold mt-2`}>Hello, {courts.User.username}!</Text>
              </View>
            </View>
          </View>
          <ImageBackground
            style={{
              width: windowWidth * 0.9,
              height: 200,
            }}
            imageStyle={{ borderRadius: 30 }}
            source={{
              uri: "https://wallpaper.dog/large/974213.jpg",
            }}
          >
            <View style={tw`justify-center items-center py-15 mx-1`}>
              <Text style={tw`text-white font-bold text-3xl text-center`}>{courts.name}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("CreateCourtCategory", {
                    id: courts.id,
                  })
                }
                style={tw`bg-blue-600 rounded-xl px-2 py-1 shadow-lg mt-3`}
              >
                <Text style={tw`text-white font-bold text-2xl text-center`}>Add Court Categories</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Text style={tw`text-2xl font-bold m-2 text-orange-500 `}>All Courts</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
            {categoryCourt.length !== 0 && categoryCourt.map((el, idx) => <OwnerCard key={idx} el={el} />)}
          </ScrollView>
        </>
      ) : (
        <ActivityIndicator size="large" color="00ff00" />
      )}
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
