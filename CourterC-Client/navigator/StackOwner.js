import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginOwner from "../screens/LoginOwner";
import RegisterOwner from "../screens/RegisterOwner";
import CreateCourt from "../screens/CreateCourt";
import CreateCourtCategory from "../screens/CreateCourtCategory";
import TabOwner from "./TabOwner";
import Logo from '../components/logoHeader'
const Stack = createNativeStackNavigator();

const StackOwner = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="LoginOwner" component={LoginOwner} />
      <Stack.Screen options={{ headerShown: false }} name="RegisterOwner" component={RegisterOwner} />
      <Stack.Screen options={{ headerTitle: (props) => <Logo {...props} />, headerTitleAlign: 'center' , headerShadowVisible: false, headerLargeTitle: false}} name="CreateCourt" component={CreateCourt} />
      <Stack.Screen options={{ headerTitle: (props) => <Logo {...props} />, headerTitleAlign: 'center' , headerShadowVisible: false, headerLargeTitle: false}} name="CreateCourtCategory" component={CreateCourtCategory} />
      <Stack.Screen options={{ headerShown: false }} name="TabOwner" component={TabOwner} />
    </Stack.Navigator>
  );
};
export default StackOwner;
