import { View, Text, Image, Dimensions, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import { useEffect, useRef } from "react";

const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{
        ...props.style,
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default function Landing() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`my-auto mx-auto justify-center items-center`}>
        <FadeInView>
          <Image
            style={{ width: windowWidth * 0.3, height: windowHeight * 0.14 }}
            source={require("../assets/CourterC_Transparent.png")}
          />
        </FadeInView>
        <FadeInView style={tw`text-center justify-center items-center mt-3`}>
          <Text style={tw`text-3xl font-bold my-2 text-slate-800`}>Are you</Text>
          <TouchableOpacity>
            <Text style={tw`text-3xl font-bold my-2 text-blue-600 underline`}>Court Owner</Text>
          </TouchableOpacity>
          <Text style={tw`text-3xl font-bold my-2 text-slate-800`}>or</Text>
          <TouchableOpacity>
            <Text style={tw`text-3xl font-bold my-2 text-blue-600 underline`}>Court Renter</Text>
          </TouchableOpacity>
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
