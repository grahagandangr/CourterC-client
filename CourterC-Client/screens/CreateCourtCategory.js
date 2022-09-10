import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function CreateCourtCategory({ navigation }) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const addCourt = () => {
    navigation.navigate("TabOwner");
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={tw`text-2xl font-bold my-5 text-slate-800`}>Create Your Court Category</Text>
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
            placeholder="Price"
            keyboardType="numeric"
          />

        </View>
        <TouchableOpacity
          onPress={addCourt}
          style={tw`bg-blue-600 h-11 mx-auto my-4 rounded-xl`}
        >
          <Text style={tw`text-lg text-slate-300 w-80 text-center my-auto font-bold`}>Add your Court Category</Text>
          
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
});
