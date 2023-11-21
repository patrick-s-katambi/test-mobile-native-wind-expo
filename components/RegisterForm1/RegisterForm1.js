import { Button, Colors, LoaderScreen, Text, TextField } from "react-native-ui-lib";
import useRegisterForm1 from "../../hooks/useRegisterForm1/useRegisterForm1";
import { View } from "react-native";
import { Link } from "@react-navigation/native";
import appSettings from "../../utils/appSettings";

export function RegisterForm1({ sendOtpApi = async () => {}, goToNextStep }) {
    const registerHook = useRegisterForm1({ sendOtpApi, goToNextStep });

    return (
        <View testID="form-container" className="flex flex-col">
            <TextField
                testID="phone-input"
                value={registerHook.form.phone}
                onChangeText={(text) => {
                    registerHook.onChangeText({ formKey: "phone", text: text.slice(0, 9) });
                }}
                maxLength={9}
                showCharCounter
                className="bg-gray-50 border border-gray-300 p-2 rounded mb-1"
                placeholder="785948549"
                label="Phone Number"
                leadingAccessory={<Text className="mr-2">+255</Text>}
                keyboardType="number-pad"
            />

            {registerHook.loading ? (
                <LoaderScreen color={Colors.blue40} />
            ) : (
                <>
                    <Button
                        testID="submit-button"
                        onPress={registerHook.onSubmit}
                        label="Submit"
                        disabled={!registerHook.form.phone || registerHook.form.phone.length < 9}
                        className="w-full mt-2"
                    />

                    <View className="mt-8 w-full flex items-center justify-center">
                        <Link to={"/Login"}>
                            <View className="flex flex-row gap-1">
                                <Text className="">Already on {appSettings.name}?</Text>
                                <Text className="text-blue-500">Login</Text>
                            </View>
                        </Link>
                    </View>
                </>
            )}
        </View>
    );
}
