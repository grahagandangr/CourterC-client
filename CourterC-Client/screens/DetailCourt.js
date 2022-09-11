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
import { useState, useEffect } from "react";
import tw from "twrnc";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import pointMarker from "../assets/pointM.png";
import MapViewDirections from "react-native-maps-directions";
import personPoint from "../assets/personPoint.png";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ScheduleCard from "../components/ScheduleCard";

export default function DetailCourt() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState(new Date());

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
    .then(({ coords }) =>
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      })
    )
    .catch((e) => console.log(e));

  const schedule = [
    {
      id: 1,
      time: "07:00 - 08:00",
    },
    {
      id: 2,
      time: "08:00 - 09:00",
    },
    {
      id: 3,
      time: "09:00 - 10:00",
    },
    {
      id: 4,
      time: "09:00 - 10:00",
    },
    {
      id: 5,
      time: "09:00 - 10:00",
    },
    {
      id: 6,
      time: "09:00 - 10:00",
    },
  ];

  const renderItem = ({ item }) => {
    return <ScheduleCard />;
  };

  const body = () => {
    return (
      <View>
        <View style={tw`flex flex-row mt-4 mb-2 ml-3`}>
          <EvilIcons name="location" size={20} color="#f97316" style={tw``} />
          <Text style={tw`text-xs text-orange-500 font-semibold`}>Location</Text>
        </View>
        <Text style={tw`ml-4 font-semibold text-xl mb-1`}>Nama Lapangan</Text>
        <Text style={tw`ml-4 mr-4 text-xs text-gray-500 mb-1 font-semibold`}>09:00 - 20:00</Text>
        <Text style={tw`ml-4 mr-4 text-xs text-gray-500 font-semibold`}>
          Description lapangan dadadawdwadawdawdawdawdawdawdawdawdawdawdawdadwadwadawdaw
        </Text>
        <View style={tw`flex-row mt-2 ml-4`}>
          <Text style={tw`text-xs rounded-lg bg-orange-300 mx-1  justify-center items-center text-center py-1 px-1.5`}>
            <AntDesign name="star" size={12} color="#ea580c" /> 4.6
          </Text>
          <Text style={tw`text-xs rounded-lg bg-orange-300 mx-1 justify-center items-center text-center p-1`}>
            <Ionicons name="location-outline" size={12} color="black" /> 1/2 km
          </Text>
        </View>
        <Text style={tw`text-center font-bold text-base mt-1`}>Order Schedule</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenDate(true);
          }}
          style={tw`justify-center content-center flex flex-row m-auto items-center mt-4 bg-orange-500 opacity-85 shadow-xl w-5/6 h-10 rounded-lg`}
        >
          <MaterialCommunityIcons name="calendar-blank-outline" size={20} color="black" />
          <Text style={tw`font-bold text-black ml-1`}>Pick Date</Text>
        </TouchableOpacity>
        <DateTimePickerModal
          value={date}
          minimumDate={new Date()}
          locale="id-ID"
          isVisible={openDate}
          onConfirm={(date) => {
            () => {
              console.log(date);
              setOpenDate(false);
            };
          }}
          onCancel={() => {
            () => {
              setOpenDate(false);
              console.log("halo");
            };
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView nestedScrollEnabled={true}>
      <View style={tw`w-full h-full content-center items-center`}>
        {location.latitude === 0 ? (
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
                latitude: -7.29317371502,
                longitude: 112.76252713,
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
                latitude: -7.29317371502,
                longitude: 112.76252713,
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
          <FlatList
            data={schedule}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={body}
            numColumns={3}
            ListFooterComponent={<View style={tw`mb-10`} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
