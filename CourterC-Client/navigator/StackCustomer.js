import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import TabCustomer from "./TabCustomer";
import Home from "../screens/Home";
import DetailCourt from "../screens/DetailCourt";
import Cart from "../screens/Cart";
import TopUpBalance from "../screens/TopUpBalance";
import MidtransWebView from "../screens/MidtransWebView";

const Stack = createNativeStackNavigator();

const StackCustomer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
      <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
      <Stack.Screen options={{ headerShown: false }} name="TabCustomer" component={TabCustomer} />
      <Stack.Screen
        name="DetailCourt"
        component={DetailCourt}
        options={{
          headerShown: false,
          // headerTransparent: true,
          // headerLargeTitle: false,
          // title: "",
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="TopUpBalance"
        component={TopUpBalance}
        options={{
          headerShown: true,
          headerTransparent: true,
          headerLargeTitle: false,
          title: "",
        }}
      />
      <Stack.Screen
        name="MidtransWebView"
        component={MidtransWebView}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default StackCustomer;
