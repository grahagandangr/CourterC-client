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
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

const ChartPage = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View
        style={tw`flex justify-between w-full h-full content-center items-center`}
      >
        <View
          style={tw`bg-blue-600 w-full h-10 rounded-b-3xl opacity-85 px-8 flex flex-row`}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Home");
            }}
            style={tw`bg-white px-1 content-center mt-2 mb-2 justify-center items-center rounded-lg`}
          >
            <AntDesign name="left" size={16} color="blue" />
          </TouchableOpacity>
          <Text style={tw`m-auto text-base text-white font-semibold`}>
            My Chart
          </Text>
        </View>
        <ScrollView style={tw`ml-2 mb-4 mr-2 p-0.5 w-5/6`}>
          <View style={tw`bg-white h-16 w-full mt-1 border border-slate-800`}>
            <View style={tw`flex flex-row justify-between`}>
              <Text style={tw`text-sm font-bold text-orange-500 ml-1`}>
                Nama Court Categories
              </Text>
              <TouchableOpacity style={tw`text-sm font-bold text-gray-500 mr-1 mt-1`}>
                <Feather name="trash-2" size={18} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={tw`text-xs font-semibold text-gray-500 ml-1`}>
              12-Sep-2002 = 06:00 - 08:00
            </Text>
            <Text style={tw`text-xs font-semibold text-gray-500 ml-1`}>
              Rp.
              <Text style={tw`mt-1`}> 30.000</Text>
            </Text>
          </View>
        </ScrollView>
        <View
          style={tw`bg-white shadow-2xl justify-between w-full h-10 absolute bottom-0 flex flex-row`}
        >
          <Text style={tw`m-2 ml-4 font-bold`}>
            TOTAL{" "}
            <Text style={tw`mt-2 text-blue-500 font-semibold`}>Rp. 30000</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {}}
            style={tw`bg-blue-600 h-full content-center px-1 justify-center items-center`}
          >
            <Text style={tw`text-xs text-white`}>Checkout Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default ChartPage;
