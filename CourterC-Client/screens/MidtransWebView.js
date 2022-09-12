import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import urlNgrok from "../constant/url"
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function MidtransWebView() {
  const [url, setUrl] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const amount = route.params.amount;
  console.log(amount);

  const updateBalanceHandler = async () => {
    try {
      let access_token = await AsyncStorage.getItem("@access_token")
      await axios.post(
        urlNgrok + `/customer/top-up/update-balance`,
        {
          gross_amount: amount,
        },
        {
          headers: {
            access_token
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const statusHandler = (param) => {
    const { url } = param;
    // console.log(url);

    if (url.includes("status_code=200")) {
      updateBalanceHandler();
      navigation.navigate("Profile");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const payTopUpBalance = async () => {
        try {
          let access_token = await AsyncStorage.getItem("@access_token")
          const { data } = await axios.post(
            urlNgrok + `/customer/top-up`,
            {
              amount: amount,
            },
            {
              headers: {
                access_token
              },
            }
          );
          setUrl(data.redirect_url);
        } catch (err) {
          console.log(err);
        }
      };
      payTopUpBalance();
    }, [])
  );

  if (!url) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <WebView source={{ uri: url }} onNavigationStateChange={statusHandler} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
});
