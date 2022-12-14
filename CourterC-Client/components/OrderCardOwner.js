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
  ToastAndroid,
} from "react-native";
import tw from "twrnc";
import axios from "axios";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import formatRupiah from "../helpers/formatRupiah";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderCardOwner = ({ el, schedule }) => {
  const navigation = useNavigation();

  const findInterval = (scheduleid) => {
    let scheduleFind = schedule.find((el) => el.id === scheduleid);
    if (scheduleFind) {
      return scheduleFind.interval;
    }
  };

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
        id: el.customer.id,
        name: el.customer.username,
        email: el.customer.email,
        role: el.customer.role,
        TalkJSID: `C-${el.customer.id}`,
      };

      await storeData("customer", { talkId });
      navigation.navigate("Chat");
    } catch (error) {
      console.log(error);
    }
  };

  const claimHandler = async (id) => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token");
      await axios.patch(
        `${url}/owner/claimPayment/${id}`,
        {},
        {
          headers: {
            access_token,
          },
        }
      );
      ToastAndroid.show("Order completed, success claim money", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      navigation.navigate("HomeOwner");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={tw`bg-white w-full my-1 rounded-xl shadow-md mx-auto text-center justify-center`}>
      <TouchableOpacity
        style={tw`flex flex-row mr-1 bg-blue-600 justify-center items-center content-center rounded-lg px-2.5 mx-auto mt-2`}
      >
        <MaterialIcons name="chat" size={16} color="white" />
        <Text style={tw`text-white text-xs ml-1 py-0.5 `} onPress={navigateToChat}>
          Message
        </Text>
      </TouchableOpacity>
      <View style={tw`flex flex-row flex-wrap justify-center`}>
        {el.orderDetails.map((orderDetail, idx) => (
          <View key={idx} style={tw`my-2 w-[47%] bg-white rounded-md shadow-md mx-1 py-2`}>
            {orderDetail.status === "Finished" && (
              <Text
                style={tw`bg-lime-100 mt-1 ml-1 border border-lime-500 font-bold rounded-full text-center text-xs text-lime-500 px-1`}
              >
                {orderDetail.status}
              </Text>
            )}
            {orderDetail.status === "Reserved" && (
              <Text
                style={tw`bg-yellow-100 mt-1 ml-1 border border-yellow-500 font-bold rounded-full text-center text-xs text-yellow-500 px-1`}
              >
                {orderDetail.status}
              </Text>
            )}
            {orderDetail.status === "Canceled" && (
              <Text
                style={tw`bg-red-100 mt-1 ml-1 border border-red-500 font-bold rounded-full text-center text-xs text-red-500 px-1`}
              >
                {orderDetail.status}
              </Text>
            )}

            <Text style={tw`ml-1 text-sm text-orange-500 font-bold text-center py-2`}>{el.name}</Text>
            <Text style={tw`ml-1 text-xs text-orange-500 text-center py-0.5`}>
              <Fontisto name="date" size={11} color="#f97316" /> {orderDetail.date}
            </Text>
            <Text style={tw`ml-1 text-xs text-gray-500 text-center py-0.5`}>
              <FontAwesome5 name="clock" size={11} color="black" /> {findInterval(orderDetail.ScheduleId)}
            </Text>
            <Text style={tw`ml-1 text-xs text-gray-500 text-center py-0.5 `}>{formatRupiah(orderDetail.price)}</Text>

            {new Date().toISOString().slice(0, 10) >= orderDetail.date && orderDetail.status == "Reserved" && (
              <TouchableOpacity
                onPress={() => claimHandler(orderDetail.id)}
                style={tw`bg-green-500 mt-2 ml-1 font-bold rounded-full text-center text-xs text-green-500 px-1 py-1.5`}
              >
                <Text style={tw`text-white font-bold text-xs items-center justify-center content-center mx-auto`}>
                  Claim Money
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      
      <Text style={tw`text-center font-bold text-orange-500 text-base mb-2`}>Total: {formatRupiah(el.totalPrice)}</Text>
    </View>
  );
};

export default OrderCardOwner;
