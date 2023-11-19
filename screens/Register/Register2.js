import clsx from "clsx";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View } from "react-native";

import { Text } from "react-native-ui-lib";
import { RegisterForm2 } from "../../components/RegisterForm2/RegisterForm2";
import registerApi from "../../services/registerApi";
import { Logo } from "../../components/Logo";

export function RegisterScreen2({ route, navigation: { goBack, navigate } }) {
    const onErrorNsvigate = (navigate, route) => (params) => navigate(route, params);
    return (
        <SafeAreaView testID="container">
            <ScrollView showsVerticalScrollIndicator={undefined} className={clsx("bg-white h-full px-2 pt-4")}>
                <Logo />
                <Text className="mt-2 text-base font-bold text-center">Join ShopKonekt now -- it's free!</Text>
                <Text className="mb-4 text-gray-500 text-center text-sm">Step 3 of 3-steps-registration</Text>

                <RegisterForm2
                    registerApi={registerApi}
                    phoneParam={route.params.phone}
                    goBack={goBack}
                    onErrorNsvigate={onErrorNsvigate(navigate, "Register1")}
                />

                <View className="mb-10"></View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
