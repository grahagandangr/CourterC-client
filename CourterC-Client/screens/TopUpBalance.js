import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import tw from "twrnc";
import { useState } from "react";

export default function TopUpBalance({ navigation }) {
  const [amount, setAmount] = useState(0);

  const changeAmountHandler = (amount) => {
    setAmount(amount);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={tw`justify-center items-center mt-4 bg-blue-600 shadow-xl w-5/6 py-5 rounded-lg`}>
        <FontAwesome5 name="money-check" size={22} color="#d1d5db" />
        <Text style={tw`font-bold text-slate-300 text-xl mb-1 mt-1`}>Top Up Balance</Text>
        <TextInput
          style={tw`w-3/4 h-8 mx-auto my-3 px-4 rounded-xl bg-slate-300 text-lg shadow-lg my-8`}
          onChangeText={changeAmountHandler}
          value={amount}
          placeholder="Rp."
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={tw`bg-slate-300 h-8 rounded-xl shadow-lg`}
          onPress={() => navigation.navigate("MidtransWebView", { amount: +amount })}
        >
          <Text style={tw`text-lg text-slate-800 w-full px-2 text-center  my-auto font-bold`}>Submit</Text>
        </TouchableOpacity>
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
