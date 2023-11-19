import { View } from "react-native";
import { Button, Colors, LoaderScreen, Text, TextField } from "react-native-ui-lib";
import { useLoginForm } from "../../hooks/useLoginForm/useLoginForm";
import { Link } from "@react-navigation/native";
import appSettings from "../../utils/appSettings";

export function LoginForm({ loginApi }) {
    const hook = useLoginForm({ loginApi });
    return (
        <View testID="form-container">
            <TextField
                testID="username-field"
                label="Username"
                value={hook.form.username}
                onChangeText={(text) => hook.onChangeText("username", text)}
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-4"
                placeholder="email@mail.com or 0784758392"
            />
            <TextField
                testID="password-field"
                label="Password"
                maxLength={128}
                value={hook.form.password}
                onChangeText={(text) => hook.onChangeText("password", text)}
                secureTextEntry
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                placeholder="your password"
                showCharCounter
            />

            {hook.loading ? (
                <LoaderScreen color={Colors.blue40} />
            ) : (
                <>
                    <Button
                        testID="submit-button"
                        label="Login"
                        disabled={!hook.canProceed}
                        className="mt-4"
                        onPress={hook.onSubmit}
                    />

                    <View className="mt-8 w-full flex items-center justify-center">
                        <Link to={"/Register1"}>
                            <View className="flex flex-row gap-1">
                                <Text className="">Not registered on {appSettings.name}?</Text>
                                <Text className="text-blue-500">Register</Text>
                            </View>
                        </Link>
                    </View>
                </>
            )}
        </View>
    );
}
