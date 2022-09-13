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

const OrderCardOwner = ({el, schedule}) => {
    const navigation = useNavigation()
  
    const findInterval = (scheduleid) => {
      let scheduleFind = schedule.find((el) => el.id === scheduleid);
      if (scheduleFind) {
        return scheduleFind.interval;
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
        <View style={tw`bg-white w-full my-1 border rounded-xl border-slate-800 mx-auto text-center  justify-center`}>
        <View style={tw` flex flex-row`}>
          {el.orderDetails.map((orderDetail, idx) => (
            <View key={idx} style={tw`my-2 px-1`}>
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
  
              <Text style={tw`ml-1 text-sm text-orange-500 font-bold text-center`}>{el.name}</Text>
              <Text style={tw`ml-1 text-xs text-gray-500 text-center`}>
                {orderDetail.date} = {findInterval(orderDetail.ScheduleId)}
              </Text>
              <Text style={tw`ml-1 text-xs text-gray-500 text-center`}>{el.name}</Text>
              <Text style={tw`ml-1 text-xs text-gray-500 text-center`}>{orderDetail.price}</Text>
              {new Date().toISOString().slice(0,10) >= orderDetail.date && orderDetail.status == "Reserved" && (
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
        <Text style={tw`text-center font-bold text-orange-500 text-base mb-2`}>IDR {el.totalPrice}</Text>
      </View>
    )
}
export default OrderCardOwner