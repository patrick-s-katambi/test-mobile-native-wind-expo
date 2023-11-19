import { View } from "react-native";
import { Button, Colors, LoaderScreen, Text, TextField, TouchableOpacity } from "react-native-ui-lib";
import { useOtpForm } from "../../hooks/useOtpForm/useOtpForm";
import { useCallback, useRef } from "react";
import clsx from "clsx";
import { Link } from "@react-navigation/native";
import appSettings from "../../utils/appSettings";

export function OtpForm({ validateOtpApi, goToNextStep = () => {}, phone = "", goBack, onErrorNsvigate = () => {} }) {
    const inputRef = useRef(null);
    const hook = useOtpForm({ validateOtpApi, goToNextStep, phone, onErrorNsvigate });
    const onBoxPress = useCallback(() => inputRef.current.focus(), [inputRef]);
    return (
        <View testID="form-container">
            <View className="flex flex-row gap-2 justify-center mb-4">
                {Array.from({ length: 4 }).map((_, index) => {
                    const codeNum = hook.form.otp[index] ?? "";
                    return (
                        <TouchableOpacity onPress={onBoxPress} key={index}>
                            <View
                                className={clsx(
                                    "aspect-square border border-gray-500 h-14 rounded flex items-center justify-center",
                                    codeNum && "border-blue-500 border-2"
                                )}
                            >
                                <Text className="text-xl">{codeNum}</Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {hook.loading ? (
                <LoaderScreen color={Colors.blue40} />
            ) : (
                <>
                    <Button testID="submit-button" label="Submit" disabled={!hook.canProceed} onPress={hook.onSubmit} />
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

            <TextField
                testID="otp-field"
                maxLength={4}
                minLength={4}
                value={hook.form.otp}
                onChangeText={(text) => hook.onChangeText("otp", text)}
                keyboardType="number-pad"
                ref={inputRef}
                className="opacity-0 mt-10"
            />
        </View>
    );
}
