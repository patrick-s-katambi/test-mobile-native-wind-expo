import { View } from "react-native";
import { Button, Colors, DateTimePicker, LoaderScreen, Text, TextField } from "react-native-ui-lib";
import { useRegisterForm2 } from "../../hooks/useRegisterForm2/useRegisterForm2";
import { Link } from "@react-navigation/native";
import appSettings from "../../utils/appSettings";

export function RegisterForm2({ registerApi, phoneParam = "", goBack, onErrorNsvigate = () => {} }) {
    const hook = useRegisterForm2({ registerApi, phoneParam, onErrorNsvigate });
    return (
        <View testID="form-container">
            <TextField
                testID="username-field"
                showCharCounter
                maxLength={30}
                placeholder="Juma Shops"
                label="Username"
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                value={hook.form.username}
                onChangeText={(text) => hook.onChangeFormValue("username", text)}
            />
            <TextField
                testID="email-field"
                placeholder="email@mail.com"
                label="Email Address"
                showCharCounter
                maxLength={40}
                minLength={1}
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                value={hook.form.email}
                onChangeText={(text) => hook.onChangeFormValue("email", text)}
                keyboardType="email-address"
            />
            <TextField
                testID="first-name-field"
                placeholder="your first name"
                label="First Name"
                showCharCounter
                maxLength={30}
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                value={hook.form.firstName}
                onChangeText={(text) => hook.onChangeFormValue("firstName", text)}
            />
            <TextField
                testID="last-name-field"
                placeholder="your last name"
                label="Last Name"
                showCharCounter
                maxLength={30}
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                value={hook.form.lastName}
                onChangeText={(text) => hook.onChangeFormValue("lastName", text)}
            />
            <DateTimePicker
                testID="dob-field"
                placeholder="your date of birth"
                label="Date of Birth"
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                value={hook.form.dob}
                onChangeText={(text) => hook.onChangeFormValue("dob", text)}
            />
            <TextField
                testID="password-field"
                placeholder="secret code for you"
                label="Password"
                showCharCounter
                maxLength={68}
                minLength={6}
                className="bg-gray-100 border border-gray-300 p-2 rounded mb-1"
                secureTextEntry
                value={hook.form.password}
                onChangeText={(text) => hook.onChangeFormValue("password", text)}
            />

            {hook.loading ? (
                <LoaderScreen color={Colors.blue40} />
            ) : (
                <>
                    <Button
                        testID="submit-button"
                        label="Submit"
                        disabled={!hook.canProceed}
                        onPress={hook.onSubmit}
                        className="mt-4"
                    />
                    <View className="mt-8 w-full flex items-center justify-center">
                        <Link to={{ screen: "Register1", params: { phone: phoneParam } }}>
                            <View className="flex flex-row gap-1 justify-center items-center">
                                <Text className="text-blue-500">Reguest another OTP</Text>
                            </View>
                        </Link>
                    </View>
                    <View className="mt-4 w-full flex items-center justify-center">
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
