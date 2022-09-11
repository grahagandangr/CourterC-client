import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Button,Picker } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import tw from "twrnc";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const countries = [
  'Egypt',
  'Canada',
  'Australia',
  'Ireland',
  'Brazil',
  'England',
  'Dubai',
  'France',
  'Germany',
  'Saudi Arabia',
  'Argentina',
  'India',
];
export default function CreateCourtCategory({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const addCourt = () => {
    navigation.navigate("TabOwner");
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={tw`text-2xl font-bold my-5 text-slate-800`}>Edit Your Court Category</Text>
      <View style={tw` mx-auto justify-center `}>

        <View style={tw`w-80 rounded-3xl mx-auto`}>

        <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>


        </View>
        <TouchableOpacity
          onPress={addCourt}
          style={tw`bg-blue-600 h-11 mx-auto my-4 rounded-xl`}
        >
          <Text style={tw`text-lg text-white w-80 text-center my-auto font-bold`}>Add your Court Category</Text>
          
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: 'center',
    alignItems: "center",
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor : "#0000",
    shadowRadius: 15 ,
    shadowOffset : { width: 56, height: 13},
    borderWidth:0,
    borderRadius:0,

  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  }
});