import { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, ScrollView,  Button, ToastAndroid, } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import axios from "axios";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";


export default function CreateCourt({ navigation }) {
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

  const [formData , setFormData] = useState({
    name: '',
    description: '',
    openHour: '',
    closeHour: '',
    address: '',
    
  })
  const handleModal = () => {
    console.log('test');
  }
 
  const changeInputValue = (slot , value) => {
    setFormData({
      ...formData,
      [slot]:value

    })
  }
  const addCourt = async() => {
    if (!formData.name || !formData.description || !formData.openHour ||!formData.closeHour || !formData.address ) {
      return ToastAndroid.show("Field cannot be empty", ToastAndroid.LONG, ToastAndroid.TOP);
    }
    try {
      const access_token = await AsyncStorage.getItem("@access_token")
      let { data } = await axios.post(url + `/owner/courts`, {
        ...formData,
        location: [location.latitude , location.longitude]
      },{ headers: {
        access_token: access_token
      }})
      ToastAndroid.show(`${data.message}`, ToastAndroid.LONG, ToastAndroid.TOP);
      navigation.navigate("CreateCourtCategory" , {id: data.id});
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG, ToastAndroid.TOP);
      
    }

    
  
  };
  return (
    <SafeAreaView style={styles.container}>

     

      <ScrollView >
        <Text style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>Add Your Court</Text>
      <View style={tw` mx-auto justify-center `}>

        <View style={tw`w-80 rounded-3xl mx-auto`}>
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("name", value)
            }}
            value={formData.name}
            // value={}
            placeholder="Name"
            keyboardType="default"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("description", value)
            }}
            value={formData.description}
            placeholder="Description"
            keyboardType="default"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("openHour", value)
            }}
            value={formData.openHour}
            placeholder="Open Hour"
            keyboardType="numeric"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("closeHour", value)
            }}
            value={formData.closeHour}
            placeholder="Close Hour"
            keyboardType="numeric"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("address", value)
            }}
            value={formData.address}
            placeholder="Address"
            keyboardType="default"
          />
        </View>
       
        <TouchableOpacity
          onPress={addCourt}
          style={tw`bg-blue-600 h-11 mx-auto mt-10 rounded-xl`}
        >
          <Text style={tw`text-xl text-white w-80 text-center my-auto font-bold`}>Add your Court</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
     </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: "center",
  },
});
