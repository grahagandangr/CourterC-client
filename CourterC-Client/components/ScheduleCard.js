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
  TouchableHighlight,
  ToastAndroid,
} from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ScheduleCard = ({ el, orders, date, CourtCategoryId, name, price }) => {
  console.log(orders);
  const addToCart = async () => {
    try {
      let cart = await AsyncStorage.getItem("@cart");
      if (!cart) {
        const cart = JSON.stringify([
          {
            id: 1,
            price,
            interval: el.interval,
            ScheduleId: el.id,
            date: date,
            CourtCategoryId,
            name,
          },
        ]);
        await AsyncStorage.setItem(`@cart`, cart);
        ToastAndroid.show("Cart added, Go check your cart", ToastAndroid.LONG, ToastAndroid.TOP);
      } else {
        cart = JSON.parse(cart);
        let id = cart.length + 1;
        cart.push({
          id,
          price,
          interval: el.interval,
          ScheduleId: el.id,
          date: date,
          CourtCategoryId,
          name,
        });
        await AsyncStorage.setItem(`@cart`, JSON.stringify(cart));
        ToastAndroid.show("Cart added, Go check your cart", ToastAndroid.LONG, ToastAndroid.TOP);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {!orders.find((e) => e.ScheduleId === el.id && e.status == "Reserved") ? (
        <TouchableHighlight onPress={addToCart} style={tw`w-1/3 h-auto my-2`} underlayColor="white" activeOpacity={0.9}>
          <View style={tw`items-center content-center mx-auto h-30 bg-white shadow-lg m-2 rounded-xl`}>
            <View style={tw`m-auto`}>
              <Text style={tw`items-center content-center justify-center text-center text-xs font-bold`}>
                {date.toLocaleString().slice(0, 10)}
              </Text>
              <Text style={tw`items-center content-center justify-center text-center text-xs font-bold`}>
                {el.interval}
              </Text>
              <Text
                style={tw`bg-lime-100 mt-1 ml-1 border border-green-500 font-bold rounded-full text-center text-xs text-lime-500 px-1`}
              >
                Available
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      ) : (
        <View
          onPress={() => console.log("halo")}
          style={tw`w-1/3 h-auto my-2`}
          underlayColor="white"
          activeOpacity={0.9}
        >
          <View style={tw`items-center content-center mx-auto h-30 bg-white shadow-lg m-2 rounded-xl`}>
            <View style={tw`m-auto`}>
              <Text style={tw`items-center content-center justify-center text-center text-xs font-bold`}>
                {date.toLocaleString().slice(0, 10)}
              </Text>
              <Text style={tw`items-center content-center justify-center text-center text-xs font-bold`}>
                {el.interval}
              </Text>
              <Text
                style={tw`bg-red-100 mt-1 ml-1 border border-red-500 font-bold rounded-full text-center text-xs text-red-500 px-1`}
              >
                Not Available
              </Text>
            </View>
          </View>
        </View>
      )}
    </>
  );
};
export default ScheduleCard;
