import { Link } from "@react-navigation/native";
import clsx from "clsx";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, Colors, LoaderScreen, Text, TextField } from "react-native-ui-lib";

import useRegisterScreen from "../hooks/useRegisterPage";
import { sendOtpApi } from "../services/sendOtp";

export default function RegisterScreen() {
    const registerHook = useRegisterScreen();

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={undefined} className={clsx("bg-white h-full px-2 pt-4")}>
                <Text h3 className="mb-4">
                    Registration
                </Text>

                <TextField
                    label="Phone Number"
                    leadingAccessory={<Text className="mr-2">+255</Text>}
                    placeholder={"phone"}
                    value={registerHook.formValues.phone}
                    onChangeText={(text) => registerHook.onChangeText("phone", text)}
                    showCharCounter
                    maxLength={9}
                    className="p-2 rounded mb-1 bg-gray-200"
                    keyboardType="number-pad"
                    $iconPrimary
                />

                {registerHook.loading ? (
                    <LoaderScreen color={Colors.grey40} />
                ) : (
                    <Button
                        label="Continue"
                        className="w-full mt-2"
                        onPress={() =>
                            registerHook.onSubmit({
                                schema: registerHook.schema,
                                formData: registerHook.formValues,
                                sendOtpApi,
                            })
                        }
                    />
                )}

                <View className="mt-4 w-full flex items-center justify-center">
                    <Link to={"/Login"}>
                        <Text className="text-blue-500">Go to login</Text>
                    </Link>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
