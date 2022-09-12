import { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  ImageModal  from "../components/imageModal";
import { Feather } from '@expo/vector-icons';
import tw from "twrnc";

export default function CreateCourt({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  
  const [isModalVisible , setModalVisible] = useState({
    modal1: false,
    modal2: false,
    modal3: false,
  })
  const [formData , setFormData] = useState({
    name: '',
    imgUrl: {
      imgUrl1 : '',
      imgUrl2 : '',
      imgUrl3 : '',
    }
  })
  const handleModal = () => {
    console.log('test');
  }
  const changeModalVisible = (bool) => {
    setModalVisible({
      modal1 : false,
      modal2 : false,
      modal3 : false,
    })
  }
  const setPropsData = ( data ) => {
    if(data === 'cancel' || data === ''){
      console.log("data")
    }else{
      console.log(data)
      setFormData(formData.imgUrl.imgUrl1 = data)
    }
    // console.log(formData)
  }
  const changeInputValue = (slot , value) => {
    setFormData({
      ...formData,
      [slot]:value

    })
  }
  const addCourt = () => {
    // navigation.navigate("CreateCourtCategory");
    console.log(formData)
  };
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
         setPropsData={setPropsData}
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
         setPropsData={setPropsData}
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
         setPropsData={setPropsData}
         />
      </Modal>

      <ScrollView >
        <Text style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>Add Your Court</Text>
      <View style={tw` mx-auto justify-center `}>

        <View style={tw`w-80 rounded-3xl mx-auto`}>
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            onChangeText={(value) =>{
              changeInputValue("name", value)
            }}
            value={formData.name}
            // value={}
            placeholder="Name"
            keyboardType="default"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Description"
            keyboardType="default"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Open Hour"
            keyboardType="default"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Close Hour"
            keyboardType="default"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Address"
            keyboardType="default"
          />
        </View>
        <Text style={tw`text-xl  my-3 text-black font-semibold`}>Images</Text> 
        <View style={tw`h-16 flex flex-row justify-center`}>
            <TouchableOpacity
                onPress={() => setModalVisible(isModalVisible.modal1 == true)}
                style={tw`mx-1 border-4 border-blue-500 rounded-md py-4 px-5`}
            >
             {formData.imgUrl.imgUrl1 !== ''?<Feather name='check' size={24} color="blue" /> : <Feather name='plus' size={24} color="blue" />}
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
          style={tw`bg-blue-600 h-11 mx-auto mt-10 rounded-xl`}
        >
          <Text style={tw`text-xl text-white w-80 text-center my-auto font-bold`}>Add your Court</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
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
});
