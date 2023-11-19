import clsx from "clsx";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text } from "react-native-ui-lib";
import { object, string } from "yup";
import { LoginForm } from "../components/LoginForm/LoginForm";
import loginApi from "../services/loginApi";
import { Logo } from "../components/Logo";

let loginSchema = object({
    username: string().email(),
    password: string().required().max(6),
});

export default function LoginScreen() {
    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={undefined} className={clsx("bg-white h-full px-2 pt-4")}>
                <Logo />
                <Text className="mt-2 mb-4 text-base font-bold text-center">
                    Nice to see you again, let's get back to work!
                </Text>
                {/* <Text className="mb-4 text-gray-500 text-center text-sm">Step 2 of 3-steps-registration</Text> */}

                <LoginForm loginApi={loginApi} />

                <View className="mb-10"></View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
