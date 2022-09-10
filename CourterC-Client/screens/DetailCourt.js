import * as React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";
import tw from "twrnc";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import pointMarker from "../assets/pointM.png";
import MapViewDirections from "react-native-maps-directions";

export default function DetailCourt() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

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
      console.log(location);
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

  return (
    <View style={tw`w-full h-full content-center items-center`}>
      {location.latitude === 0 ? (
        <View
          style={{ width: windowWidth, height: windowHeight * 0.3, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="00ff00" />
        </View>
      ) : (
        <MapView
          // style={tw`w-full h-full content-center items-center justify-center`}
          style={{ width: windowWidth, height: windowHeight * 0.3, justifyContent: "center", alignItems: "center" }}
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
            image={pointMarker}
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
          {/* <MapViewDirections
            origin={{ latitude: -7.28023, longitude: 112.758865 }}
            destination={{ latitude: -7.29317371502, longitude: 112.76252713 }}
            apikey="AIzaSyD50iiB72cNDREeGDWGWg-X7h_qJGgJXrg"
            strokeWidth={2}
            strokeColor="black"
          /> */}
        </MapView>
      )}
      <View style={{ width: windowWidth, height: windowHeight * 0.7, backgroundColor: "white" }}>
        <ScrollView>
          <View style={tw`flex flex-row mt-4 ml-3`}>
            <EvilIcons name="location" size={20} color="#f97316" style={tw``} />
            <Text style={tw`text-xs text-orange-500 font-semibold`}>Location</Text>
          </View>
          <Text style={tw`ml-4 font-semibold text-xl mb-1`}>Nama Lapangan</Text>
          <Text style={tw`ml-4 mr-4 text-xs text-gray-500 mb-1 font-semibold`}>09:00 - 20:00</Text>
          <Text style={tw`ml-4 mr-4 text-xs text-gray-500 font-semibold`}>
            Description lapangan dadadawdwadawdawdawdawdawdawdawdawdawdawdawdadwadwadawdaw
          </Text>
          <View style={tw`flex-row mt-2 ml-4`}>
            <Text
              style={tw`text-xs rounded-lg bg-orange-300 mx-1  justify-center items-center text-center py-1 px-1.5`}
            >
              <AntDesign name="star" size={12} color="#ea580c" /> 4.6
            </Text>
            <Text style={tw`text-xs rounded-lg bg-orange-300 mx-1 justify-center items-center text-center p-1`}>
              <Ionicons name="location-outline" size={12} color="black" /> 1/2 km
            </Text>
          </View>
          <TouchableOpacity
            style={tw`justify-center content-center flex flex-row m-auto items-center mt-4 bg-orange-500 opacity-85 shadow-xl w-5/6 h-10 rounded-lg`}
          >
            <Fontisto name="shopping-basket-add" size={22} color="black" />
            <Text style={tw`font-bold text-black ml-1`}>Add to Chart</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
