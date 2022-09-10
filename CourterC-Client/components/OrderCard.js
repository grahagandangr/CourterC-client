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


const OrderCard = () => {
    return (
        <View
            style={tw`bg-white h-32 w-full mt-1 border flex rounded-xl flex-row border-slate-800`}
          >
            <Image
              style={tw`w-1/3 h-full rounded-xl`}
              source={{
                uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
              }}
            />
            <View style={tw``}>
              <Text
                style={tw`bg-lime-100 mt-1 ml-1 border border-green-500 font-bold rounded-full text-center text-xs text-lime-500 px-1`}
                
              >
                Finished
              </Text>
              <Text style={tw`ml-1 mt-1 text-sm text-orange-500 font-bold`}>Nama Lapanagan</Text>
              <Text style={tw`ml-1 text-xs text-gray-500`}>26 Jan 2022 = 07:00 - 09:00</Text>
              <Text style={tw`ml-1 text-xs text-gray-500 mt-1`}>Rp. 40.000</Text>
              <TouchableOpacity
                style={tw`bg-red-500 ml-1 mt-2 content-center absolute bottom-1 justify-center items-center flex flex-row rounded-full py-1 px-2`}
              >
                <Text style={tw`text-white font-bold text-xs`}> Cancel Order</Text>
              </TouchableOpacity>
            </View>
          </View>
    )
}
export default OrderCard