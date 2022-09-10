import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import RegisterOwner from "../screens/RegisterOwner";
import CreateCourt from "../screens/CreateCourt";
import TabOwner from "./TabOwner";
const Stack = createNativeStackNavigator();

const StackOwner = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RegisterOwner"
        component={RegisterOwner}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CreateCourt"
        component={CreateCourt}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TabOwner"
        component={TabOwner}
      />
    </Stack.Navigator>
  );
};
export default StackOwner;
