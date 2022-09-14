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
import tw from "twrnc";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import OrderCardOwner from "../components/OrderCardOwner";

const OrderListOwner = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const fetchOrders = async () => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token");
      let { data } = await axios.get(`${url}/owner/courts-orderLists`, {
        headers: {
          access_token,
        },
      });
      setOrders(data.ownerOrders);
      setSchedule(data.schedule);
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setOrders([]);
      fetchOrders();
    }, [])
  );

  return (
    <SafeAreaView>
      <View style={tw`flex justify-between w-full h-full content-center items-center`}>
        <View style={tw`bg-blue-600 w-full h-10 rounded-b-3xl opacity-85 px-8 flex flex-row justify-between`}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={tw`bg-white p-0.5 content-center m-auto rounded-lg`}
            >
              <AntDesign name="left" size={16} color="blue" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={tw`m-auto text-base text-white font-semibold`}>Orders</Text>
          </View>
          <View>
            <Text style={tw`m-auto text-base text-white font-semibold opacity-0`}>Orde</Text>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={tw`ml-2 mb-4 mr-2 p-0.5 w-5/6`}>
          {orders.length === 0 ? (
            <Text style={tw`text-center text-black font-bold text-base`}>No Order yet</Text>
          ) : (
            orders.map((el, idx) => <OrderCardOwner schedule={schedule} el={el} key={idx} />)
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default OrderListOwner;
