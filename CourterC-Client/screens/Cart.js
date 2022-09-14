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
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import url from "../constant/url";
import formatRupiah from "../helpers/formatRupiah";

const Cart = ({ navigation }) => {
  const [myCart, setMyCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = async () => {
    try {
      // await AsyncStorage.removeItem("@cart")
      let data = await AsyncStorage.getItem("@cart");
      data = JSON.parse(data);
      setMyCart(data);
      let temp = 0;
      data.forEach((el) => {
        temp += el.price;
      });
      setTotalPrice(temp);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const deleteCart = async (id) => {
    try {
      let allCarts = await AsyncStorage.getItem("@cart");
      allCarts = JSON.parse(allCarts);
      let filtered = allCarts.filter((el) => el.id !== id);
      await AsyncStorage.setItem("@cart", JSON.stringify(filtered));
    } catch (error) {
      console.log(error);
    }
  };

  const orderHandler = async () => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token");
      let allCart = await AsyncStorage.getItem("@cart");
      allCart = JSON.parse(allCart);
      await axios.post(
        url + "/customer/pay-orders",
        {
          cart: allCart,
          totalPrice,
          status: "Reserved",
        },
        {
          headers: {
            access_token,
          },
        }
      );
      await AsyncStorage.removeItem("@cart");
      ToastAndroid.show("Order sucess", ToastAndroid.LONG, ToastAndroid.BOTTOM);
      navigation.navigate("OrderListPage");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView>
      <View style={tw`flex justify-between w-full h-full content-center items-center`}>
        <View style={tw`bg-blue-600 w-full h-10 rounded-b-3xl opacity-85 px-8 flex flex-row justify-between`}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
              style={tw`bg-white p-0.5 content-center m-auto rounded-lg`}
            >
              <AntDesign name="left" size={16} color="blue" />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={tw`m-auto text-base text-white font-semibold`}>Cart</Text>
          </View>
          <View>
            <Text style={tw`m-auto text-base text-white font-semibold opacity-0`}>Orde</Text>
          </View>
        </View>
        <ScrollView style={tw`ml-2 mb-4 mr-2 p-0.5 w-5/6`}>
          {!myCart || myCart.length === 0 ? (
            <Text style={tw`text-center font-bold text-base`}>Your cart is empty</Text>
          ) : (
            myCart.map((el, idx) => {
              return (
                <View key={idx} style={tw`bg-white h-16 w-full mt-1 rounded-xl shadow-md mt-2 mb-1 p-1`}>
                  <View style={tw`flex flex-row justify-between`}>
                    <Text style={tw`text-sm font-bold text-orange-500 ml-1`}>{el.name}</Text>
                    <TouchableOpacity
                      onPress={() => deleteCart(el.id)}
                      style={tw`text-sm font-bold text-gray-500 mr-1 mt-1`}
                    >
                      <Feather name="trash-2" size={18} color="black" />
                    </TouchableOpacity>
                  </View>
                  <Text style={tw`text-xs font-semibold text-gray-500 ml-1`}>
                    {el.date.toString().slice(0, 10)} = {el.interval}
                  </Text>
                  <Text style={tw`text-xs font-semibold text-gray-500 ml-1`}>
                    <Text style={tw`mt-1`}>{formatRupiah(el.price)}</Text>
                  </Text>
                </View>
              );
            })
          )}
        </ScrollView>
        <View style={tw`bg-white shadow-2xl justify-between w-full h-10 absolute bottom-0 flex flex-row`}>
          <Text style={tw`m-2 ml-4 font-bold`}>
            <Text style={tw`mt-2 text-blue-500 font-semibold`}>{formatRupiah(totalPrice)}</Text>
          </Text>
          <TouchableOpacity
            onPress={orderHandler}
            style={tw`bg-blue-600 h-full content-center px-1 justify-center items-center`}
          >
            <Text style={tw`text-xs text-white`}>Checkout Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Cart;
