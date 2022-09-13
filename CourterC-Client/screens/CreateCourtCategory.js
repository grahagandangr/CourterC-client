import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ToastAndroid,
} from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';
import ImageModal from '../components/imageModal';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import url from '../constant/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Constants, Permissions } from 'expo';
import { Camera, CameraType } from 'expo-camera';
import { ScrollView } from 'react-native-gesture-handler';
export default function CreateCourtCategory({ navigation, route }) {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [categories, setCategories] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState({
    price: 0,
    selectedSport: null,
    imgUrl: [],
  });
  const [selectedSport, setSelectedSport] = useState('');
  const [warning, setWarning] = useState(false);

  const getCategories = async () => {
    try {
      const access_token = await AsyncStorage.getItem('@access_token');
      let { data } = await axios.get(url + '/owner/categories', {
        headers: {
          access_token: access_token,
        },
      });
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  const changeInputValue = (slot, value) => {
    setData({
      ...data,
      [slot]: value,
    });
  };
  const libraryHandler = async () => {
    setModalVisible(false);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log(result, 'result');

      if (!result.cancelled) {
        let newData = [...data.imgUrl,
          {
            name: `aa${Math.random()}`,
            uri: result.uri,
            type: `${result.type}/jpeg`,
          },];
        setData({ ...data, imgUrl: newData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cameraHandler = async () => {
    setModalVisible(false);
    try {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
      }
      let result = await ImagePicker.launchCameraAsync();

      console.log('result', result);

      if (!result.cancelled) {
        let newData = [
          ...data.imgUrl,
          {
            name: `aa${Math.random()}`,
            uri: result.uri,
            type: `${result.type}/jpeg`,
          },
        ];
        setData({ ...data, imgUrl: newData });
      }
    } catch (err) {
      console.log('err :>> ', err);
    }
  };

  const addCourt = async () => {
    try {
      const access_token = await AsyncStorage.getItem('@access_token');
      if (data.selectedSport && data.price !== 0 && data.imgUrl.length) {
        console.log('data.imgUrl :>> ', data.imgUrl);
        let formData = new FormData();
        data.imgUrl.forEach((item, index) => formData.append('images', item));
        // formData.append(`images`, data.imgUrl);
        formData.append('price', data.price);
        formData.append('CourtId', route.params.id);
        formData.append('CategoryId', data.selectedSport);
        console.log('formData :>> ', formData);
        let data1 = await axios.post(url + `/owner/courtCategories`, formData, {
          headers: {
            access_token: access_token,
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(data1.data);
        navigation.navigate("TabOwner");
        setWarning(false);

      } else {
        setWarning(true);
      }
      console.log(selectedSport);
    } catch (error) {
      console.log(error, { ...error });
      ToastAndroid.show(
        'Something went wrong',
        ToastAndroid.LONG,
        ToastAndroid.TOP
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ImageModal
        isModalVisible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        onLibrary={libraryHandler}
        onCamera={cameraHandler}
      />

      <ScrollView>
      <Text style={tw`text-2xl font-bold my-5 text-slate-800`}>
        Insert Your Court Category
      </Text>
      <View style={tw` mx-auto justify-center `}>
        <View style={tw`w-80 rounded-3xl mx-auto`}>
          {warning ? (
            <Text style={tw`text-red-500`}>
              Please select the courts sport Category, fill your Court's
              Price, and Upload minimum 1 image !!
            </Text>
          ) : null}
          <TextInput
            style={tw`w-full h-12 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) => {
              changeInputValue('price', value);
            }}
            value={data.price}
            placeholder="Price"
            keyboardType="numeric"
          />
          <View style={tw`border-2 rounded-lg `}>
            <Picker
              selectedValue={data.selectedSport}
              style={tw` border shadow-lg border-2 rounded-md`}
              ViewStyleProp={tw`border-2`}
              placeholder="Selt"
              // style={{ placeholderTextColor: '#fff'}}
              onValueChange={(itemValue, itemIndex) =>
                changeInputValue('selectedSport', itemValue)
              }
            >
              <Picker.Item label="Select sport" value="" />
              {categories.map((el) => {
                return (
                  <Picker.Item label={el.name} value={el.id} key={el.id} />
                );
              })}
            </Picker>
          </View>
        </View>
        <View style={tw` `}>
          <Text style={tw`text-xl py-5 text-black font-semibold`}>Images</Text>
          
          <View style={tw`h-16 flex flex-row justify-center flex-wrap`}>
            {data?.imgUrl.map((el, index) => (
              <Image
                source={{ uri: el.uri }}
                style={tw`w-20 h-20 mx-1 rounded-lg`}
                key={index}
              />
            ))}
            {!data?.imgUrl.length || data?.imgUrl.length < 4? 
            <TouchableOpacity
              // onPress={() => setModalVisible(isModalVisible.modal1 == true)}
              onPress={() => setModalVisible(true)}
              style={tw`mx-1 border-4 border-blue-500 rounded-md py-4 px-6`}
            >
              <Feather name="plus" size={24} color="blue" />
            </TouchableOpacity>
            :  null
            }
          </View>
        </View>
        <TouchableOpacity
          onPress={addCourt}
          style={tw`bg-blue-600 h-11 mx-auto mt-10 rounded-xl`}
        >
          <Text
            style={tw`text-xl text-white w-80 text-center my-auto font-bold`}
          >
            Add your Court Category
          </Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown3BtnStyle: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor: '#0000',
    shadowRadius: 15,
    shadowOffset: { width: 56, height: 13 },
    borderWidth: 0,
    borderRadius: 0,
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 0,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
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
  dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
});
