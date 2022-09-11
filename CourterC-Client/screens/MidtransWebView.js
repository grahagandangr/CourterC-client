import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useCallback } from "react";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

export default function MidtransWebView() {
  const [url, setUrl] = useState("");
  const route = useRoute();
  const navigation = useNavigation();
  const amount = route.params.amount;
  console.log(amount);

  const updateBalanceHandler = async () => {
    try {
      await axios.post(
        `https://7a03-103-213-129-181.ap.ngrok.io/customer/top-up/update-balance`,
        {
          gross_amount: amount,
        },
        {
          headers: {
            access_token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYyODg1NjkzfQ.U0y7MyKC7TdpdCPswe_giC3TS4nVE6WTuNiVvs_9iiU",
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
          const { data } = await axios.post(
            `https://7a03-103-213-129-181.ap.ngrok.io/customer/top-up`,
            {
              amount: amount,
            },
            {
              headers: {
                access_token:
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjYyODg1NjkzfQ.U0y7MyKC7TdpdCPswe_giC3TS4nVE6WTuNiVvs_9iiU",
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
