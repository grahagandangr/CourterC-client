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
  } from "react-native";
import tw from "twrnc";

const OwnerCard = () => {
    const windowWidth = Dimensions.get("window").width;
    const windowHeight = Dimensions.get("window").height;
  
    return (
        <TouchableHighlight
          underlayColor="white"
          activeOpacity={0.9}
          style={{ width: windowWidth * 0.9 }}
          onPress={() => {}}
        >
          <View style={tw`p-2`}>
            <View style={tw`flex-row bg-white rounded-xl shadow-lg `}>
              <Image
                style={tw`w-50 h-40 rounded-xl mr-2`}
                source={{
                  uri: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/kAVRgw7GgK1CfYEJq8ME6EvRIgU.jpg",
                }}
              />
              <View style={tw`flex-col mt-2 my-auto`}>
                <Text style={tw`text-lg font-bold`}>Categorydwddw</Text>
                <Text style={tw`text-lg font-bold`}>Price</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
    )
}
export default OwnerCard