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
  ImageBackground,
  Dimensions,
  StyleSheet,
  ToastAndroid
} from "react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import url from "../constant/url";

const OwnerCard = ({ el }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const deleteHandler = async (id) => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token");
      await axios.delete(
        `${url}/owner/courtCategories/${id}`,
        {
          headers: {
            access_token,
          },
        }
      );
      ToastAndroid.show("Court Category deleted", ToastAndroid.LONG, ToastAndroid.BOTTOM);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View
    // underlayColor="white"
    // activeOpacity={0.9}
    // style={{ width: windowWidth * 0.9 }}
    // onPress={() => {}}
    >
      <View style={tw`p-2`}>
        <View style={tw`flex-row bg-white rounded-xl shadow-lg `}>
          <Image
            style={tw`w-42 h-40 rounded-xl mr-2`}
            source={{
              uri: el.image,
            }}
          />
          <View style={tw`mt-2 my-auto w-1/2`}>
            <Text style={tw`text-lg font-bold`}>{el.name}</Text>
            <Text style={tw`text-lg font-bold`}> IDR {el.price}</Text>
            <TouchableOpacity
              onPress={() => deleteHandler(el.id)}
              style={tw`bg-red-500 mt-2 ml-1 font-bold rounded-full text-center text-xs text-lime-500 py-0.5`}
            >
              <Text
                style={tw`text-white font-bold text-base items-center justify-center content-center mx-auto`}
              >
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default OwnerCard;
