import clsx from "clsx";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View } from "react-native";

import { Text } from "react-native-ui-lib";
import { RegisterForm1 } from "../../components/RegisterForm1/RegisterForm1";
import { sendOtpApi } from "../../services/sendOtpApi";
import { Logo } from "../../components/Logo";

export function RegisterScreen1({ navigation: { navigate } }) {
    const goToNextStep =
        ({ route }) =>
        (params) =>
            navigate(route, params);

    return (
        <SafeAreaView testID="container">
            <ScrollView showsVerticalScrollIndicator={undefined} className={clsx("bg-white h-full px-2 pt-4")}>
                <Logo />
                <Text className="mt-2 text-base font-bold text-center">Join ShopKonekt now -- it's free!</Text>
                <Text className="mb-4 text-gray-500 text-center text-sm">Step 1 of 3-steps-registration</Text>

                <RegisterForm1 sendOtpApi={sendOtpApi} goToNextStep={goToNextStep({ route: "EnterOtp" })} />

                <View className="mb-10"></View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
