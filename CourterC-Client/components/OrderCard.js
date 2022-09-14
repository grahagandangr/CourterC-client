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
import formatRupiah from "../helpers/formatRupiah";
import { Fontisto } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const OrderCard = ({ el, schedule }) => {
  const navigation = useNavigation();
  const yesterday = new Date(el.OrderDetails[0].date);
  yesterday.setDate(yesterday.getDate() - 2);

  const findInterval = (scheduleid) => {
    let scheduleFind = schedule.find((el) => el.id === scheduleid);
    if (scheduleFind) {
      return scheduleFind.interval;
    }
  };

  const cancelHandler = async (id) => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token");
      await axios.patch(
        `${url}/customer/courts/cancelOrder/${id}`,
        {},
        {
          headers: {
            access_token,
          },
        }
      );
      ToastAndroid.show("Order cancelled, please wait...", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={tw`bg-white w-full my-1 rounded-xl shadow-md mx-auto text-center justify-center`}>
      <View style={tw` flex flex-row flex-wrap justify-center`}>
        {el.OrderDetails.map((orderDetail) => (
          <View key={orderDetail.id} style={tw`my-2 w-[47%] bg-white rounded-md shadow-md mx-1 py-2`}>
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

            <Text style={tw`ml-1 text-sm text-orange-500 font-bold text-center`}>{el.CourtCategory.Court.name}</Text>
            <Text style={tw`ml-1 text-xs text-orange-500 text-center`}>
              <Fontisto name="date" size={11} color="#f97316" /> {orderDetail.date}
            </Text>
            <Text style={tw`ml-1 text-xs text-gray-500 text-center`}>
              <FontAwesome5 name="clock" size={11} color="black" /> {findInterval(orderDetail.ScheduleId)}
            </Text>
            <Text style={tw`ml-1 text-xs text-gray-500 text-center`}>{el.CourtCategory.Category.name}</Text>
            <Text style={tw`ml-1 text-xs text-gray-500 text-center`}>{formatRupiah(orderDetail.price)}</Text>
            {new Date() <= yesterday && orderDetail.status == "Reserved" && (
              <TouchableOpacity
                onPress={() => cancelHandler(orderDetail.id)}
                style={tw`bg-red-500 mt-2 mx-auto font-bold rounded-full text-center text-xs text-lime-500 px-2 py-1`}
              >
                <Text style={tw`text-white font-bold text-xs items-center justify-center content-center mx-auto`}>
                  Cancel Order
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
export default OrderCard;
