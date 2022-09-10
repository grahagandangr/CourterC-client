import { useEffect, useState } from "react";
import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Button, ScrollView, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import  ImageModal  from "../components/imageModal";
import tw from "twrnc";

export default function CreateCourt({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const addCourt = () => {
    navigation.navigate("CreateCourtCategory");
  };

  const [isModalVisible , setModalVisible] = useState(false)
  const [chooseData, setChooseData] = useState()
    const handleModal = () => {
      console.log('test');
    }
    const changeModalVisible = (bool) => {
      setModalVisible(bool)
    }
    const setData = ( data ) => {
      setChooseData(data)
    }
  return (
    <SafeAreaView style={styles.container}>

      <Modal 
      visible={isModalVisible}
      transparent={true}
      animationType='fade'
      style={tw`text-3xl text-center font-bold m-5 text-slate-800`}
      nRequestClose={() => changeModalVisible(false)}
      >
        <View style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>
         </View>
         <ImageModal
         changeModalVisible={changeModalVisible}
         setData={setData}
         />
      </Modal>
      
      <ScrollView >
        <Text style={tw`text-3xl text-center font-bold my-5 text-slate-800`}>Create Court</Text>
      <View style={tw` mx-auto justify-center `}>

        <View style={tw`w-80 rounded-3xl mx-auto`}>
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
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
            placeholder="Adress"
            keyboardType="default"
          />
        </View>
        <Text style={tw`text-xl  my-3 text-slate-800`}>Image</Text> 
        <View style={tw`h-16 flex flex-row `}>
          <Button
            title="Photo"
            style={tw`mx-1`}
            onPress={() => setModalVisible(true)}
            />
            <Button
            title="Photo"
            style={tw`mx-1`}
            onPress={() => setModalVisible(true)}
            />
            <Button
            title="Photo"
            onPress={() => setModalVisible(true)}
            />
          </View>
        <TouchableOpacity
          onPress={addCourt}
          style={tw`bg-blue-600 h-11 mx-auto my-4 rounded-xl`}
        >
          <Text style={tw`text-xl text-slate-300 w-80 text-center my-auto font-bold`}>Add your Court</Text>
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
