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
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import tw from "twrnc";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 


const ProfilePage = () => {
    return (
        <SafeAreaView>
            <View style={tw`justify-center content-center items-center mt-4 flex flex-row`}>
                <Ionicons name="md-person-circle-outline" size={40} color="#0284c7" />
                <Text style={tw`ml-1 font-semibold text-blue-500`}>User 1</Text>
            </View>
            <View style={tw`justify-center content-center m-auto items-center mt-4 bg-blue-600 opacity-85 shadow-xl w-5/6 h-36 rounded-lg`}>
                <FontAwesome5 name="money-check" size={18} color="#d1d5db" />
                <Text style={tw`font-bold text-gray-300 text-sm mb-1 mt-1`}>Balance</Text>
                <Text style={tw`font-bold text-gray-300 text-2xl mb-1`}>Rp. 30.000</Text>
                <Text style={tw`font-bold text-gray-300 text-sm mb-1`}>CPay</Text>
            </View>
            <TouchableOpacity style={tw`justify-center content-center flex flex-row m-auto items-center mt-4 bg-orange-500 opacity-85 shadow-xl w-5/6 h-10 rounded-lg`}>
                <MaterialCommunityIcons name="credit-card-plus-outline" size={22} color="black" />
                <Text style={tw`font-bold text-black ml-1`}>Top Up Balance</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfilePage