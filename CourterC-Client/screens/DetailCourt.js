import * as React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  FlatList,
  SectionList,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect, useCallback } from "react";
import tw from "twrnc";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import pointMarker from "../assets/pointM.png";
import MapViewDirections from "react-native-maps-directions";
import personPoint from "../assets/personPoint.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ScheduleCard from "../components/ScheduleCard";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { useFocusEffect, useRoute } from "@react-navigation/native";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import formatRupiah from "../helpers/formatRupiah";

export default function DetailCourt({ navigation }) {
  const route = useRoute();
  var today = new Date();
  today.setDate(today.getDate() + 2);
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(today);
  const [chooseDate, setChooseDate] = useState(today);
  const [detail, setDetail] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [orders, setOrders] = useState([]);

  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [locationCourt, setLocationCourt] = useState({
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

  useEffect(() => {
    Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
      timeout: 5000,
    })
      .then(({ coords }) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      })
      .catch((e) => console.log(e));
  }, [])

  const getDetail = async () => {
    try {
      const access_token = await AsyncStorage.getItem("@access_token");
      const formatdate = chooseDate.toISOString().slice(0, 10);
      const { data } = await axios.get(
        url + `/customer/courts/${+route.params.courtId}?date=${formatdate}`,
        {
          headers: {
            access_token,
          },
        }
      );
      setLocationCourt({
        longitude: data.courtDetail.Court.location.coordinates[0],
        latitude: data.courtDetail.Court.location.coordinates[1],
      });
      setDetail(data.courtDetail);
      setSchedule(data.filteredSchedules);
      setOrders(data.bookedSchedule);
    } catch (error) {
      console.log(error);
    }
  };
  useFocusEffect(
    useCallback(() => {
      setDetail({});
      getDetail();
      console.log("UseEffect detail");
    }, [chooseDate])
  );


  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);

      await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToChat = async () => {
    try {
      const talkId = {
        id: detail.Court.User.id,
        name: detail.Court.User.username,
        email: detail.Court.User.email,
        role: detail.Court.User.role,
        TalkJSID: `C-${detail.Court.User.id}`,
      };

      await storeData("owner", {talkId});
      navigation.navigate("Chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView nestedScrollEnabled={true}>
      <View style={tw`w-full h-full content-center items-center`}>
        <View style={tw`bg-blue-600 w-full h-10 rounded-b-3xl opacity-85 px-8 flex flex-row justify-between`}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={tw`bg-white p-0.5 content-center m-auto rounded-lg`}
            >
              <AntDesign name="left" size={16} color="blue" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={tw`m-auto text-base text-white font-semibold`}>Detail Court</Text>
          </View>
          <View style={tw`mt-1 h-8 w-8 content-center items-center rounded-xl justify-center`}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Cart");
              }}
            >
              <FontAwesome name="shopping-basket" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        {location.latitude === 0 || locationCourt.latitude === 0 ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="00ff00" />
          </View>
        ) : (
          <MapView
            // style={tw`w-full h-full content-center items-center justify-center`}
            style={{
              width: windowWidth,
              height: windowHeight * 0.4,
              justifyContent: "center",
              alignItems: "center",
            }}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              image={personPoint}
              anchor={{ x: 0.5, y: 0.5 }}
            />
            <Marker
              coordinate={{
                latitude: locationCourt.longitude,
                longitude: locationCourt.latitude,
              }}
              image={pointMarker}
              anchor={{ x: 0.5, y: 0.5 }}
            />
            <MapViewDirections
              origin={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              destination={{
                latitude: locationCourt.longitude,
                longitude: locationCourt.latitude,
              }}
              apikey="AIzaSyCC8DuJiwmnfvfXzx4H9f_Rqt9WxP7s3iE"
              strokeWidth={5}
              strokeColor="#0284c7"
            />
          </MapView>
        )}
        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.6,
            backgroundColor: "white",
            borderRadius: 30,
          }}
        >
          {!detail.id ? (
            <ActivityIndicator size="large" color="00ff00" />
          ) : (
            <ScrollView>
              <View style={tw`flex flex-row mt-4 mb-2 ml-3`}>
                <EvilIcons
                  name="location"
                  size={20}
                  color="#f97316"
                  style={tw``}
                />
                <Text style={tw`text-xs text-orange-500 font-semibold`}>
                  {detail.Court.address}
                </Text>
              </View>
              <View style={tw`flex flex-row justify-between`}>
                <Text style={tw`ml-4 font-semibold text-xl mb-1`}>
                  {detail.Court.name}
                </Text>
                <TouchableOpacity
                  style={tw`flex flex-row mr-2.5 bg-blue-600 justify-center items-center content-center rounded-lg px-1.5`}
                >
                  <MaterialIcons name="chat" size={16} color="white" />
                  <Text
                    style={tw`text-white text-xs ml-1`}
                    onPress={navigateToChat}
                  >
                    Message
                  </Text>
                </TouchableOpacity>
              </View>
              <Text
                style={tw`ml-4 mr-4 text-xs text-gray-500 mb-1 font-semibold`}
              >
                0{detail.Court.openHour}:00 - {detail.Court.closeHour}:00
              </Text>
              <Text style={tw`ml-4 mr-4 text-xs text-gray-500 font-semibold`}>
                {detail.Court.description}
              </Text>
              <View style={tw`flex-row mt-2 ml-4`}>
                <Text
                  style={tw`text-xs rounded-lg bg-orange-300 mx-1  justify-center items-center text-center py-1 px-1.5`}
                >
                  <AntDesign name="star" size={12} color="#ea580c" /> 4.6
                </Text>
                <Text style={tw`text-xs rounded-lg bg-orange-300 mx-1 justify-center items-center text-center p-1`}>
                  {formatRupiah(detail.price)}
                </Text>
              </View>
              <Text style={tw`text-center font-bold text-base mt-1`}>
                Order Schedule
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setOpenDate(true);
                }}
                style={tw`justify-center content-center flex flex-row m-auto items-center mt-4 bg-orange-500 opacity-85 shadow-xl w-5/6 h-10 rounded-lg`}
              >
                <MaterialCommunityIcons
                  name="calendar-blank-outline"
                  size={20}
                  color="black"
                />
                <Text style={tw`font-bold text-black ml-1`}>Pick Date</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                value={date}
                minimumDate={today}
                locale="id-ID"
                isVisible={openDate}
                onConfirm={(date) => {
                  setChooseDate(date);
                  setOpenDate(false);
                }}
                onCancel={() => {
                  setOpenDate(false);
                  // console.log("halo");
                }}
              />
              {schedule === {} ? (
                <Text>Pick Date First</Text>
              ) : (
                <View style={tw`flex flex-row flex-wrap`}>
                  {schedule.map((el) => {
                    return (
                      <ScheduleCard
                        el={el}
                        key={el.id}
                        orders={orders}
                        date={chooseDate}
                        CourtCategoryId={+route.params.courtId}
                        name={detail.Court.name}
                        price={detail.price}
                      />
                    );
                  })}
                </View>
              )}
              <View style={tw`pb-15`}>
              
              </View>
            </ScrollView>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
