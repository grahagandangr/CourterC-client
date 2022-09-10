import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function LoginOwner({navigation}) {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const LoginHandler = () => {
      navigation.navigate("TabOwner")
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`my-auto mx-auto justify-center items-center`}>
        <Image
          style={{ width: windowWidth * 0.48, height: windowHeight * 0.185 }}
          source={require("../assets/CourterC_Transparent.png")}
        />
        <Text style={tw`text-3xl font-bold my-5 text-slate-800`}>Hello, Welcome Back!</Text>
        <View style={tw`w-80 rounded-3xl mx-auto`}>
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white border-black text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Password"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <TouchableOpacity
          onPress={LoginHandler}
          style={tw`bg-blue-600 h-10 mx-auto my-4 rounded-xl`}
          // onPress={}
        >
          <Text style={tw`text-xl text-slate-300 w-80 text-center my-auto font-bold`}>Login</Text>
        </TouchableOpacity>

        <Text style={tw`text-base text-slate-800 w-80 text-center font-bold`}>
          Don`t have an account? <Text onPress={() => {
            navigation.navigate("RegisterOwner")
          }} style={tw`text-blue-600 underline`}>Register Here</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
