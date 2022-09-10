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
import { MaterialIcons } from '@expo/vector-icons';
import OrderCard from "../components/OrderCard";

const OrderListPage = ({ navigation }) => {
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
            Orders
          </Text>
        </View>
        <ScrollView style={tw`ml-2 mb-4 mr-2 p-0.5 w-5/6`}>
          <OrderCard/>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default OrderListPage;
