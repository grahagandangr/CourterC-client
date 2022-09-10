import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import HomePage from "./screens/Home";
import Register from "./screens/Register";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Landing from "./screens/Landing";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={Landing}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons name="home-outline" size={19} color="black" />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
// aaaa
