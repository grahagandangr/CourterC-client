import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";

export default function Register() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        maxHeight: windowHeight,
      }}
    >
      <View style={tw`my-auto mx-auto justify-center items-center`}>
        <Image
          style={{ width: windowWidth * 0.3, height: windowHeight * 0.14 }}
          source={require("../assets/CourterC_Transparent.png")}
        />
        <Text style={tw`text-3xl font-bold my-5 text-slate-800`}>Hello, Welcome!</Text>
        <View style={tw`w-80 rounded-3xl mx-auto`}>
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Username"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Email"
            keyboardType="email-address"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Phone Number"
            keyboardType="number-pad"
          />
          <TextInput
            style={tw`w-full h-10 mx-auto my-3 px-4 rounded-xl bg-white text-xl shadow-lg`}
            // onChangeText={}
            // value={}
            placeholder="Address"
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
          style={tw`bg-blue-600 h-10 mx-auto my-4 rounded-xl`}
          // onPress={}
        >
          <Text style={tw`text-xl text-slate-300 w-80 text-center my-auto font-bold`}>Register</Text>
        </TouchableOpacity>
        <Text style={tw`text-base text-slate-800 w-80 text-center font-bold`}>
          Already have an account? <Text style={tw`text-blue-600 underline`}>Login Here</Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}
