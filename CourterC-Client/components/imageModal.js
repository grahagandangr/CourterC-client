import { useState } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Modal,
} from 'react-native';
import tw from 'twrnc';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 

// const windowHeight = Dimensions.get("window").height;

export default function ImageModal(props) {
  const [url, setUrl] = useState('');
  const closeModal = (bool, data) => {
    // props.changeModalVisible(bool);
    // props.setPropsData(data);
  };
  return (
    <Modal
    visible={props.isModalVisible}
      transparent={true}
      animationType='fade'
      style={tw`text-3xl text-center font-bold m-5 text-slate-800 bg-black/75`}
      onRequestClose={props.onRequestClose}
      >
        <View style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>
         </View>
    <View style={tw`flex-1 items-center justify-center`}>
      <View
        style={tw`h-[250px] w-[375px] shadow-lg rounded-lg bg-white `}
      >
         <View style={tw`flex-row`}>
          <View style={tw`flex-1 `}></View>
          <TouchableOpacity
          onPress={props.onRequestClose}
          style={tw`p-4`}
          >
            <Entypo name="cross" size={24} color="black" />

          </TouchableOpacity>
         </View>
        <Text style={tw`text-center pb-6 text-xl font-bold`}>
          Select your Method to insert your Court Image
        </Text>
        <View style={tw`h-16 flex flex-row justify-center  pb-2`}>
          <TouchableOpacity
            style={tw`mx-1 bg-blue-500 rounded-md py-4 px-5`}
            onPress={props.onCamera}
          >
            <Entypo name="camera" size={24} color="white" />

          </TouchableOpacity>
          <TouchableOpacity
            style={tw`mx-1 bg-blue-500 rounded-md py-4 px-5`}
            onPress={props.onLibrary}
          >
              <MaterialCommunityIcons name="folder-image" size={24} color="white" />

          </TouchableOpacity>
        </View>
      </View>
    </View>
    </Modal>

  );
}
