import { StatusBar } from "expo-status-bar";
import { View, Text, Button, StyleSheet, FlatList, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import CourtCard from "../components/CourtCard";

export default function HomePage() {
  return (
    <SafeAreaView style={tw`flex items-center justify-center`}>
      <CourtCard></CourtCard>
    </SafeAreaView>
  );
}
