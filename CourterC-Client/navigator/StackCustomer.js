import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login"
import Register from "../screens/Register"
import TabCustomer from "./TabCustomer";

const Stack = createNativeStackNavigator();

const StackCustomer = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TabCustomer"
        component={TabCustomer}
      />
    </Stack.Navigator>
  );
};
export default StackCustomer;
