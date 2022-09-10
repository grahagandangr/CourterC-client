import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons'; 
import tw from "twrnc"
import Home from "./screens/Home"
import Profile from "./screens/Profile"
import Detail from "./screens/DetailCourt"
import Cart from './screens/Cart';
import OrderListPage from './screens/OrderList';
import { AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigator/StackNavigator';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator/>
    </NavigationContainer>
  );
}
// aaaa
