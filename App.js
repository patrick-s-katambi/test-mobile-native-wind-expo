import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "./config/styles";
import LoginScreen from "./screens/Login";
import { RegisterScreen1 } from "./screens/Register/Register1";
import { RegisterScreen2 } from "./screens/Register/Register2";
import EnterOtpScreen from "./screens/Register/EnterOtp";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register1" component={RegisterScreen1} options={{ headerShown: false }} />
                <Stack.Screen name="EnterOtp" component={EnterOtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register2" component={RegisterScreen2} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
