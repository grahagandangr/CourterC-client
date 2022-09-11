import "react-native-gesture-handler";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import OrderListPage from "../screens/OrderList";
import Chat from "../screens/Chat";
import { AntDesign } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const TabCustomer = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons name="home-outline" size={19} color="#2563eb" />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
            ) : (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons name="home-outline" size={19} color="gray" />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="OrderListPage"
        component={OrderListPage}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={tw`items-center justify-center content-center`}>
                <AntDesign name="inbox" size={19} color="#2563eb" />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
            ) : (
              <View style={tw`items-center justify-center content-center`}>
                <AntDesign name="inbox" size={19} color="gray" />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons
                  name="ios-chatbubbles-outline"
                  size={19}
                  color="#2563eb"
                />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
            ) : (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons
                  name="ios-chatbubbles-outline"
                  size={19}
                  color="gray"
                />
              </View>
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons
                  name="ios-person-circle-outline"
                  size={19}
                  color="#2563eb"
                />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
            ) : (
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons
                  name="ios-person-circle-outline"
                  size={19}
                  color="gray"
                />
              </View>
            ),
        }}
      />
    </Tab.Navigator>
  );
};
export default TabCustomer;
