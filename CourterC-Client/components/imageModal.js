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
} from 'react-native';
import tw from 'twrnc';

// const windowHeight = Dimensions.get("window").height;

export default function ImageModal(props) {
  const [url, setUrl] = useState('');
  const closeModal = (bool, data) => {
    props.changeModalVisible(bool);
    props.setPropsData(data);
  };
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <View
        style={tw`h-[250px] w-[375px] pt-10 shadow-lg rounded-lg bg-white `}
      >
        <Text style={tw`text-center pb-6 text-xl font-bold`}>
          Insert your Court Image
        </Text>
        <TextInput
          style={tw`w-[350px] h-10 mx-auto mb-10 px-4 rounded-xl bg-white text-xl shadow-lg`}
          onChangeText={setUrl}
          value={url}
          placeholder="Image Url"
          keyboardType="default"
        />
        <View style={tw`h-16 flex flex-row justify-center  pb-2`}>
          <TouchableOpacity
            style={tw`mx-1 bg-blue-500 rounded-md py-4 px-5`}
            onPress={() => closeModal(false, 'cancel')}
          >
            <Text style={tw`text-md text-white  text-center my-auto font-bold`}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`mx-1 bg-blue-500 rounded-md py-4 px-5`}
            onPress={() => closeModal(false, url)}
          >
            <Text style={tw`text-md text-white  text-center my-auto font-bold`}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
