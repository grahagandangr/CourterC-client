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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CourtCard from "../components/CourtCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import * as Location from "expo-location";
import axios from "axios";
import url from "../constant/url";



const Home = ({navigation}) => {
  const [token, setToken] = useState("")
  const [username, setUsername] = useState("")
  const [categories, setCategories] = useState([])
  const [courts, setCourts] = useState([])
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Highest,
    maximumAge: 10000,
    timeout: 5000,
  })
    .then(({ coords }) =>{
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    }
    )
    .catch((e) => console.log(e));

  const renderItem = ({ item }) => {
    return <CourtCard navigation={navigation} el={item} key={item.id} />;
  };

  const getData = async () => {
    try {
      const access_token = await AsyncStorage.getItem("@access_token")
      const username = await AsyncStorage.getItem("@username")
      setUsername(username);
      setToken(access_token)
    } catch (error) {
      console.log(error);
    }
  }

  const getCourts = async () => {
    try {
      const access_token = await AsyncStorage.getItem("@access_token")
      const {data} = await axios.get(url + `/customer/courts-radius?lat=${location.latitude}&lon=${location.longitude}`,{
        headers: {
          access_token: access_token
        }
      }
      )
      setCourts(data.courtCategoryFiltered)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [token])

  useEffect(() => {
    getCourts()
  }, [location.latitude, location.longitude])

  return (
    <SafeAreaView>
      {/* Header */}
      <View style={tw`bg-blue-600 w-full h-36 rounded-b-3xl opacity-85 px-8`}>
        <View style={tw`flex flex-row mt-4 justify-between`}>
          <View style={tw`flex flex-row`}>
            <Ionicons
              name="person"
              size={22}
              color="white"
              style={tw`mt-2 mr-1`}
            />
            <Text style={tw`text-white text-base font-bold mt-2`}>Welcome Back {username}</Text>
          </View>
          <View
            style={tw`mt-1 bg-blue-400 h-8 w-8 content-center items-center rounded-xl justify-center`}
          >
            <TouchableOpacity onPress={() => {navigation.navigate("Cart")}} className="bg-blue-400 h-10 w-10 mt-4 content-center items-center rounded-xl">
              <FontAwesome name="shopping-basket" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`content-center m-auto w-3/4 flex-row`}>
          <TextInput
            style={tw`rounded-xl px-4 py-2 focus:outline-none w-full bg-transparent bg-gray-200`}
            placeholder="Search..."
          ></TextInput>
          <TouchableOpacity
            style={tw`text-sm bg-blue-400 py-1.5 px-2 absolute right-1.5 bottom-2 rounded-full text-white focus:ring-4`}
          >
            <Text style={tw`text-white font-semibold text-xs`}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Catgories */}
      <View>
        <View
          style={tw`flex flex-row items-center content-center justify-center p-1`}
        >
          <ScrollView horizontal style={tw`ml-2 mb-4 mr-2 p-0.5`}>
            <View
              style={tw`flex-col items-center mr-2 bg-gray-200 py-3 px-1.5 rounded-full`}
            >
              <TouchableOpacity
                style={tw`bg-white h-8 w-8 content-center justify-center items-center rounded-full`}
              >
                <MaterialCommunityIcons
                  name="basketball"
                  size={20}
                  color="#fb923c"
                />
              </TouchableOpacity>
              <Text style={tw`text-xs mb-1 mt-1 text-black`}>Basket</Text>
            </View>
            <View
              style={tw`flex-col items-center mr-2 bg-gray-200 py-3 px-1.5 rounded-full`}
            >
              <TouchableOpacity
                style={tw`bg-white h-8 w-8 content-center justify-center items-center rounded-full`}
              >
                <MaterialCommunityIcons
                  name="basketball"
                  size={20}
                  color="#fb923c"
                />
              </TouchableOpacity>
              <Text style={tw`text-xs mb-1 mt-1 text-black`}>Basket</Text>
            </View>
            <View
              style={tw`flex-col items-center mr-2 bg-gray-200 py-3 px-1.5 rounded-full`}
            >
              <TouchableOpacity
                style={tw`bg-white h-8 w-8 content-center justify-center items-center rounded-full`}
              >
                <MaterialCommunityIcons
                  name="basketball"
                  size={20}
                  color="#fb923c"
                />
              </TouchableOpacity>
              <Text style={tw`text-xs mb-1 mt-1 text-black`}>Basket</Text>
            </View>
            <View
              style={tw`flex-col items-center mr-2 bg-gray-200 py-3 px-1.5 rounded-full`}
            >
              <TouchableOpacity
                style={tw`bg-white h-8 w-8 content-center justify-center items-center rounded-full`}
              >
                <MaterialCommunityIcons
                  name="basketball"
                  size={20}
                  color="#fb923c"
                />
              </TouchableOpacity>
              <Text style={tw`text-xs mb-1 mt-1 text-black`}>Basket</Text>
            </View>
          </ScrollView>
        </View>
      </View>
      {
        courts.length === 0 ?
        <Text style={tw`text-base font-bold text-center`}>There is no court in your area</Text>
        :
        <FlatList
          data={courts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={tw`mb-80`}/>}
        />
      }
    </SafeAreaView>
  );
};
export default Home
