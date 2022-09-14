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
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import url from "../constant/url";
import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import formatRupiah from "../helpers/formatRupiah";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState({});

  const findUser = async () => {
    try {
      const access_token = await AsyncStorage.getItem("@access_token");
      const { data } = await axios.get(url + `/customer/profile`, {
        headers: {
          access_token,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    try {
      await AsyncStorage.clear();
      let role = user.role;

  
      navigation.replace("Landing");
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      findUser();
      console.log("useEffect profile");
    }, [])
  );

  return (
    <SafeAreaView style={tw`items-center justify-center`}>
      {!user.id ? (
        <ActivityIndicator size="large" color="00ff00" />
      ) : (
        <>
          <View style={tw`justify-center content-center items-center mt-4 flex flex-row`}>
            <Ionicons name="md-person-circle-outline" size={40} color="#0284c7" />
            <Text style={tw`ml-1 font-semibold text-blue-500`}>{user.username}</Text>
          </View>
          <View
            style={tw`justify-center content-center m-auto items-center mt-4 bg-blue-600 opacity-85 shadow-xl w-5/6 h-36 rounded-lg`}
          >
            <FontAwesome5 name="money-check" size={18} color="#d1d5db" />
            <Text style={tw`font-bold text-slate-200 text-sm mb-1 mt-1`}>Balance</Text>
            <Text style={tw`font-bold text-slate-200 text-2xl mb-1`}>{formatRupiah(user.balance)}</Text>
            <Text style={tw`font-bold text-slate-200 text-sm mb-1`}>CPay</Text>
          </View>
          {user.role === "customer" && (
            <TouchableOpacity
              onPress={() => navigation.navigate("TopUpBalance")}
              style={tw`justify-center content-center flex flex-row m-auto items-center mt-4 bg-orange-500 opacity-85 shadow-xl w-5/6 h-10 rounded-lg`}
            >
              <MaterialCommunityIcons name="credit-card-plus-outline" size={22} color="#e2e8f0" />
              <Text style={tw`font-bold text-slate-200 ml-1`}>Top Up Balance</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={logoutHandler}
            style={tw`justify-center content-center flex flex-row m-auto items-center mt-4 bg-red-600 opacity-85 shadow-xl w-5/6 h-10 rounded-lg`}
          >
            <MaterialCommunityIcons name="logout" size={22} color="#e2e8f0" />
            <Text style={tw`font-bold text-slate-200 ml-1`}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default Profile;
