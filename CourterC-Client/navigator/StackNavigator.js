import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from '../screens/Landing';
import StackOwner from './StackOwner';
import StackCustomer from './StackCustomer';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{ headerShown: false }} name="Landing" component={Landing}/>
            <Stack.Screen options={{ headerShown: false }} name="Owner" component={StackOwner}/>
            <Stack.Screen options={{ headerShown: false }} name="Customer" component={StackCustomer}/>
        </Stack.Navigator>
    )
}

export default StackNavigator