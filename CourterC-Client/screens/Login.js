import { useState } from "react";
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import axios from "axios";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({navigation}) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const changeUserInfo = (name, value) => {
    setUserInfo({
      ...userInfo,
      [name] : value
    })
  }

  const storeData = async (key, value) => {

    try {

      const jsonValue = JSON.stringify(value)

      await AsyncStorage.setItem(`@${key}`, jsonValue)
      
    } catch (error) {
      console.log(error)
    }
  }

  const LoginHandler = async () => {
    if(!userInfo.password || !userInfo.email){
      return ToastAndroid.show("Field cannot be empty", ToastAndroid.LONG, ToastAndroid.TOP)
    }
    try {
      let {data} = await axios.post(url + `/customer/login`, {
        ...userInfo
      })
      await storeData('customer', data)
      await AsyncStorage.setItem("@access_token", data.access_token)
      await AsyncStorage.setItem("@username", data.username)
      await AsyncStorage.setItem("@id", String(data.id))
      await AsyncStorage.setItem("@role", data.role)
      navigation.navigate("TabCustomer")
    } catch (error) {
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG, ToastAndroid.TOP)
    }
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`my-auto mx-auto justify-center items-center`}>
        <Image
          style={{ width: windowWidth * 0.48, height: windowHeight * 0.185 }}
          source={require("../assets/CourterC_Transparent.png")}
        />
        <Text style={tw`text-3xl font-bold my-5 text-slate-800`}>Hello, Welcome Back!</Text>
        <View style={tw`w-80 rounded-3xl mx-auto`}>
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) => {
              changeUserInfo("email", value)
            }}
            value={userInfo.email}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white border-black text-xl shadow-lg`}
            onChangeText={(value) => {
              changeUserInfo("password", value)
            }}
            value={userInfo.password}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <TouchableOpacity
          onPress={LoginHandler}
          style={tw`bg-blue-600 h-10 mx-auto my-4 rounded-xl`}
          // onPress={}
        >
          <Text style={tw`text-xl text-slate-300 w-80 text-center my-auto font-bold`}>Login</Text>
        </TouchableOpacity>

        <Text style={tw`text-base text-slate-800 w-80 text-center font-bold`}>
          Don`t have an account? <Text onPress={() => {
            navigation.navigate("Register")
          }} style={tw`text-blue-600 underline`}>Register Here</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
