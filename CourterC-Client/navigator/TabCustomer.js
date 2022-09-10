import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons'; 
import tw from "twrnc"
import Home from "../screens/Home"
import Profile from "../screens/Profile"
import Detail from "../screens/DetailCourt"
import Cart from '../screens/Cart';
import OrderListPage from '../screens/OrderList';
import { AntDesign } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabCustomer = () => {
    const HomeStack = () => {
        return (
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Detail"
              component={Detail}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        );
      };
    
    return (
        <Tab.Navigator>
        <Tab.Screen name="HomeStack" component={HomeStack} 
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              focused ?
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons name="home-outline" size={19} color="#2563eb" />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
              :
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons name="home-outline" size={19} color="gray" />
              </View>
            )
          }}/>
          <Tab.Screen name="OrderListPage" component={OrderListPage} 
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              focused ?
              <View style={tw`items-center justify-center content-center`}>
                <AntDesign name="inbox" size={19} color="#2563eb" />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
              :
              <View style={tw`items-center justify-center content-center`}>
              <AntDesign name="inbox" size={19} color="gray" />
              </View>
            )
          }}/>
          <Tab.Screen name="Profile" component={Profile} 
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              focused ?
              <View style={tw`items-center justify-center content-center`}>
                <Ionicons name="ios-person-circle-outline" size={19} color="#2563eb" />
                <Text style={tw`font-bold text-xl -mt-4 text-blue-800`}>.</Text>
              </View>
              :
              <View style={tw`items-center justify-center content-center`}>
              <Ionicons name="ios-person-circle-outline" size={19} color="gray" />
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    )
}
export default TabCustomer