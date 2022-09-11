import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
// import SelectDropdown from 'react-native-select-dropdown'
import {Picker} from '@react-native-picker/picker';
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
  
  const [selectedSport, setSelectedSport] = useState('');
  const [warning , setWarning] = useState(false)
  const addCourt = () => {
    if(selectedSport){
      navigation.navigate("TabOwner");
      setWarning(false)
    }else{
      setWarning(true)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
        <Text style={tw`text-2xl font-bold my-5 text-slate-800`}>Insert Your Court Category</Text>
      <View style={tw` mx-auto justify-center `}>

        <View style={tw`w-80 rounded-3xl mx-auto`}>
        {warning ? <Text style={tw`text-red-500`}>Please select the courts sport Category !!</Text> : null}
          <TextInput
            style={tw`w-full h-12 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Price"
            keyboardType="numeric"
          />
        <View style={tw`border-2 rounded-lg `}>
        <Picker
          selectedValue={selectedSport}
          style={tw` border shadow-lg border-2 rounded-md`}
          ViewStyleProp={tw`border-2`}
          placeholder="Selt"
          // style={{ placeholderTextColor: '#fff'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSport(itemValue)
          }>
          <Picker.Item label="Select sport" value="" />
          <Picker.Item label="Java" value="java" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
          <Picker.Item label="JavaScript" value="JavaScript" />
        </Picker>
        </View>

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




{/* <SelectDropdown
data={countriesWithFlags}
// defaultValueByIndex={1}
// defaultValue={{
//   title: 'England',
//   image: require('./Images/England.jpg'),
// }}
onSelect={(selectedItem, index) => {
  console.log(selectedItem, index);
}}
buttonStyle={styles.dropdown3BtnStyle}
renderCustomizedButtonChild={(selectedItem, index) => {
  return (
    <View style={styles.dropdown3BtnChildStyle}>
      {selectedItem ? (
        <Image source={selectedItem.image} style={styles.dropdown3BtnImage} />
      ) : (
        <Ionicons name="md-earth-sharp" color={'#444'} size={32} />
      )}
      <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select country'}</Text>
      <FontAwesome name="chevron-down" color={'#444'} size={18} />
    </View>
  );
}}
dropdownStyle={styles.dropdown3DropdownStyle}
rowStyle={styles.dropdown3RowStyle}
renderCustomizedRowChild={(item, index) => {
  return (
    <View style={styles.dropdown3RowChildStyle}>
      <Image source={item.image} style={styles.dropdownRowImage} />
      <Text style={styles.dropdown3RowTxt}>{item.title}</Text>
    </View>
  );
}}
/> */}