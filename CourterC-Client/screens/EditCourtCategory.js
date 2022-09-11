import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Button,Picker } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SelectDropdown from 'react-native-select-dropdown'
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
          <SelectDropdown
              data={countries}
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
                      <Image source={"https://raw.githubusercontent.com/AdelRedaa97/react-native-select-dropdown/master/examples/Images/Australia.png"} style={styles.dropdown3BtnImage} />
                    ) : (
                      <Image source={"https://raw.githubusercontent.com/AdelRedaa97/react-native-select-dropdown/master/examples/Images/Australia.png"} style={styles.dropdown3BtnImage} />
                    )}
                    <Text style={styles.dropdown3BtnTxt}>{selectedItem ? selectedItem.title : 'Select Sport'}</Text>
                  </View>
                );
              }}
              dropdownStyle={styles.dropdown3DropdownStyle}
              rowStyle={styles.dropdown3RowStyle}
              renderCustomizedRowChild={(item, index) => {
                return (
                  <View style={styles.dropdown3RowChildStyle}>
                    <MaterialCommunityIcons
                  name="basketball"
                  size={20}
                  color="#fb923c"
                />
                    <Text style={styles.dropdown3RowTxt}>{item}</Text>
                  </View>
                );
              }}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
              }}
              />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Price"
            keyboardType="numeric"
          />

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