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
    TouchableHighlight
  } from "react-native";
import tw from "twrnc";


const ScheduleCard = () => {
    return (
        <TouchableHighlight onPress={() => console.log("halo")} style={tw`w-1/3 h-auto my-2`} underlayColor="white"
        activeOpacity={0.9} >
            <View style={tw`items-center content-center mx-auto h-30 bg-white shadow-lg m-2 rounded-xl`}>
                <View style={tw`m-auto`}>
                    <Text style={tw`items-center content-center justify-center text-center text-xs font-bold`}>06:00 - 07:00</Text>
                    <Text style={tw`items-center content-center justify-center text-center text-xs font-bold`}>Rp. 30000</Text>
                    <Text  style={tw`bg-lime-100 mt-1 ml-1 border border-green-500 font-bold rounded-full text-center text-xs text-lime-500 px-1`}>Available</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}
export default ScheduleCard