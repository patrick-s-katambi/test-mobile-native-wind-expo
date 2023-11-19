import clsx from "clsx";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-ui-lib";
import { GoBack } from "../../components/GoBack";
import { OtpForm } from "../../components/OtpForm/OtpForm";
import validateOtpApi from "../../services/validateOtpApi";
import { Logo } from "../../components/Logo";

export default function EnterOtpScreen({ route, navigation: { navigate, goBack } }) {
    const phone = route.params?.phone ?? "--";
    const goToNextStep =
        ({ phone, navigate, route }) =>
        (params) =>
            navigate(route, { ...params, phone });

    const onErrorNsvigate = (navigate, route) => (params) => navigate(route, params);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={undefined} className={clsx("bg-white h-full px-2 pt-4")}>
                <GoBack goBack={goBack} />

                <Logo />
                <Text className="mt-2 text-base font-bold text-center">Join ShopKonekt now -- it's free!</Text>
                <Text className="mb-4 text-gray-500 text-center text-sm">Step 2 of 3-steps-registration</Text>

                <Text h6 className="mb-2 text-center">
                    Enter code sent to{" "}
                    <Text h6 className="text-blue-500">
                        {phone}
                    </Text>
                </Text>

                <OtpForm
                    validateOtpApi={validateOtpApi}
                    goToNextStep={goToNextStep({ phone, navigate, route: "Register2" })}
                    phone={phone}
                    goBack={goBack}
                    onErrorNsvigate={onErrorNsvigate(navigate, "Register1")}
                />
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
