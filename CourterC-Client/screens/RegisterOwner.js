import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import url from "../constant/url";
import axios from "axios";
import { useState } from "react";

export default function Register({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    address: "",
    password: "",
  });

  const changeUserInfo = (name, value) => {
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const registerHandler = async () => {
    if (!userInfo.username || !userInfo.email || !userInfo.password || !userInfo.phoneNumber || !userInfo.address) {
      return ToastAndroid.show("Field cannot be empty", ToastAndroid.SHORT, ToastAndroid.TOP);
    }
    try {
      console.log(url+ '/owner/register');
      await axios.post(url + `/owner/register`, {
        ...userInfo,
        role: "owner",
      });
      navigation.navigate("CreateCourt");
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG, ToastAndroid.TOP);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ScrollView style={{ width: windowWidth, height: windowHeight }}>
        <View style={tw`my-auto mx-auto justify-center items-center mt-10`}>
          <Image
            style={{ width: windowWidth * 0.48, height: windowHeight * 0.185 }}
            source={require("../assets/CourterC_Transparent.png")}
          />
          <Text style={tw`text-3xl font-bold my-5 text-slate-800`}>Hello, Welcome!</Text>
          <View style={tw`w-80 rounded-3xl mx-auto`}>
            <TextInput
              style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
              onChangeText={(value) => {
                changeUserInfo("username", value);
              }}
              value={userInfo.username}
              placeholder="Username"
            />
            <TextInput
              style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
              onChangeText={(value) => {
                changeUserInfo("email", value);
              }}
              value={userInfo.email}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
              onChangeText={(value) => {
                changeUserInfo("phoneNumber", value);
              }}
              value={userInfo.phoneNumber}
              placeholder="Phone Number"
              keyboardType="number-pad"
            />
            <TextInput
              style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
              onChangeText={(value) => {
                changeUserInfo("address", value);
              }}
              value={userInfo.address}
              placeholder="Address"
            />
            <TextInput
              style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white border-black text-xl shadow-lg`}
              onChangeText={(value) => {
                changeUserInfo("password", value);
              }}
              value={userInfo.password}
              placeholder="Password"
              secureTextEntry={true}
              textContentType="password"
            />
          </View>
          <TouchableOpacity style={tw`bg-blue-600 h-10 mx-auto my-4 rounded-xl`} onPress={registerHandler}>
            <Text style={tw`text-xl text-slate-300 w-80 text-center my-auto font-bold`}>Register</Text>
          </TouchableOpacity>
          <Text style={tw`text-base text-slate-800 w-80 text-center font-bold mb-10`}>
            Already have an account?{" "}
            <Text
              onPress={() => {
                navigation.navigate("LoginOwner");
              }}
              style={tw`text-blue-600 underline`}
            >
              Login Here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
