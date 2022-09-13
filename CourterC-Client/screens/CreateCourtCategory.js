import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet,Modal, Button, ToastAndroid } from "react-native";
import { useState , useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {Picker} from '@react-native-picker/picker';
import tw from "twrnc";
import  ImageModal  from "../components/imageModal";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import url from "../constant/url";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default function CreateCourtCategory({navigation , route}) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [categories , setCategories] = useState([])
  const [isModalVisible , setModalVisible] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  })
  const [data , setData] = useState({
    price: 0,
    selectedSport: null,
    imgUrl: {
      imgUrl1 : '',
      imgUrl2 : '',
      imgUrl3 : '',
    }
  })
  const [selectedSport, setSelectedSport] = useState('');
  const [warning , setWarning] = useState(false)
  const getCategories = async () => {
    try {
      const access_token = await AsyncStorage.getItem("@access_token")
      let {data} = await axios.get(url + '/customer/categories' ,{
        headers:{
          access_token: access_token
        }
      })
      setCategories(data)
    } catch (err) {
      console.log(err)
      
    }
  }
  useEffect(()=>{
    getCategories()
  },[])
  const changeInputValue = (slot , value) => {
      setData({
        ...data,
        [slot] : value
      })  
  }  
  const changeModalVisible = (bool) => {
    setModalVisible({
      modal1 : false,
      modal2 : false,
      modal3 : false,
    })
  }
  const setPropsData1 = ( data ) => {
    if(data === 'cancel' || data === ''){
    }else{
      setFormData(formData.imgUrl.imgUrl1 = data)
    }
  }
  const setPropsData2 = ( data ) => {
    if(data === 'cancel' || data === ''){
    }else{
      setFormData(formData.imgUrl.imgUrl2 = data)
    }
}
const setPropsData3 = ( data ) => {
  if(data === 'cancel' || data === ''){
  }else{
    setFormData(formData.imgUrl.imgUrl3 = data)
  }
}

  const addCourt = async() => {
    try {
      const access_token = await AsyncStorage.getItem("@access_token")
      if(data.selectedSport && data.price !== 0){
        let  data1  = await axios.post(url+ `/owner/courtCategories`,{
          price: data.price,
          CategoryId: data.selectedSport,
          CourtId: route.params.id
        },{ headers: {
          access_token: access_token
        }})
        // navigation.navigate("TabOwner");
        setWarning(false)
      }else{
        setWarning(true)
      }
      console.log(selectedSport);
      
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Something went wrong", ToastAndroid.LONG, ToastAndroid.TOP);
      
    }
  };
console.log(data);
  return (
    <SafeAreaView style={styles.container}>

<Modal 
      visible={isModalVisible.modal1}
      transparent={false}
      animationType='fade'
      style={tw`text-3xl text-center font-bold m-5 text-slate-800`}
      nRequestClose={() => setModalVisible(isModalVisible.modal1 = false)}
      >
        <View style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>
         </View>
         <ImageModal
         changeModalVisible={changeModalVisible}
         setPropsData={setPropsData1}
         />
      </Modal>

      <Modal 
      visible={isModalVisible.modal2}
      transparent={false}
      animationType='fade'
      style={tw`text-3xl text-center font-bold m-5 text-slate-800`}
      nRequestClose={() => changeModalVisible(false)}
      >
        <View style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>
         </View>
         <ImageModal
         changeModalVisible={changeModalVisible}
         setPropsData={setPropsData2}
         />
      </Modal>

      <Modal 
      visible={isModalVisible.modal3}
      transparent={false}
      animationType='fade'
      style={tw`text-3xl text-center font-bold m-5 text-slate-800`}
      nRequestClose={() => changeModalVisible(false)}
      >
        <View style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>
         </View>
         <ImageModal
         changeModalVisible={changeModalVisible}
         setPropsData={setPropsData3}
         />
      </Modal>

        <Text style={tw`text-2xl font-bold my-5 text-slate-800`}>Insert Your Court Category</Text>
      <View style={tw` mx-auto justify-center `}>

        <View style={tw`w-80 rounded-3xl mx-auto`}>
        {warning ? <Text style={tw`text-red-500`}>Please select the courts sport Category and Input your Court's Price !!</Text> : null}
          <TextInput
            style={tw`w-full h-12 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("price", value)
            }}
            value={data.price}
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
            changeInputValue('selectedSport' , itemValue)
          }>
          <Picker.Item label="Select sport" value="" />
          {categories.map(el =>{
              return  <Picker.Item label={el.name} value={el.id} />

          })}
        </Picker>
        </View>

        </View>


        <Text style={tw`text-xl  my-3 text-black font-semibold`}>Images</Text> 
        <View style={tw`h-16 flex flex-row justify-center`}>
            <TouchableOpacity
                onPress={() => setModalVisible(isModalVisible.modal1 == true)}
                style={tw`mx-1 border-4 border-blue-500 rounded-md py-4 px-5`}
            >
              <Feather name='plus' size={24} color="blue" /> 
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setModalVisible(isModalVisible.modal2 == true)}
                style={tw`mx-1 border-4 border-blue-500 rounded-md py-4 px-5`}
            >
              <Feather name="plus" size={24} color="blue" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setModalVisible(isModalVisible.modal3 == true)}
                style={tw`mx-1 border-4 border-blue-500 rounded-md py-4 px-5`}
            >
              <Feather name="plus" size={24} color="blue" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
          onPress={addCourt}
          style={tw`bg-blue-600 h-11 mx-auto my-6 rounded-xl`}
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




