import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { TouchableOpacity } from "react-native-ui-lib";
import { Logo } from "./components/Logo";
import "./config/styles";
import Home from "./screens/Home";
import LoginScreen from "./screens/Login";
import Orders from "./screens/Orders";
import Products from "./screens/Products";
import Profile from "./screens/Profile";
import EnterOtpScreen from "./screens/Register/EnterOtp";
import { RegisterScreen1 } from "./screens/Register/Register1";
import { RegisterScreen2 } from "./screens/Register/Register2";
import OrderDetail from "./screens/OrderDetail";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register1" component={RegisterScreen1} options={{ headerShown: false }} />
                <Stack.Screen name="EnterOtp" component={EnterOtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register2" component={RegisterScreen2} options={{ headerShown: false }} />
                <Stack.Screen name="Home" component={MainAppScreens} options={{ headerShown: false }} />
                <Stack.Screen name="Order-details" component={OrderDetail} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function MainAppScreens() {
    const commonOptions = useMemo(
        () => ({
            tabBarActiveBackgroundColor: "#E5E6FF",
            tabBarInactiveBackgroundColor: "white",
            tabBarItemStyle: { paddingBottom: 5 },
        }),
        []
    );
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home-Tab"
                component={Home}
                options={{
                    headerShown: false,
                    headerLeft: (props) => <Logo small spaceBelow={false} />,
                    title: "Home",
                    tabBarIcon: (props) => <AntDesign name="home" size={20} color={props.color} />,
                    ...{ ...commonOptions },
                }}
            />
            <Tab.Screen
                name="Orders-Tab"
                component={Orders}
                options={{
                    title: "Orders",
                    tabBarIcon: (props) => (
                        <MaterialCommunityIcons name="view-list-outline" size={20} color={props.color} />
                    ),
                    ...{ ...commonOptions },
                }}
            />
            <Tab.Screen
                name="Products-Tab"
                component={Products}
                options={{
                    title: "Products",
                    tabBarIcon: (props) => <MaterialCommunityIcons name="apps-box" size={20} color={props.color} />,
                    ...{ ...commonOptions },
                    headerRight: (props) => (
                        <TouchableOpacity className="mr-4">
                            <AntDesign name="plus" size={20} color={props.color} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile-Tab"
                component={Profile}
                options={{
                    title: "Profile",
                    tabBarIcon: (props) => <MaterialCommunityIcons name="account" size={20} color={props.color} />,
                    ...{ ...commonOptions },
                }}
            />
        </Tab.Navigator>
    );
}
