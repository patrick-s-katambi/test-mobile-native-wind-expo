import { Link } from "@react-navigation/native";
import clsx from "clsx";
import { StatusBar } from "expo-status-bar";
import { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import { Button, Text, TextField } from "react-native-ui-lib";
import { object, string } from "yup";

let loginSchema = object({
    username: string().email(),
    password: string().required().max(6),
});

export default function LoginScreen() {
    const [formValues, setFormValues] = useState({ username: "", password: "" });
    const onChangeText = useCallback(
        (inputKey, text) => setFormValues({ ...formValues, [inputKey]: text }),
        [formValues]
    );

    const onSubmit = useCallback(({ schema, formData }) => {
        try {
            const errors = schema.validate(formData);
            errors && console.log("errors", errors);
        } catch (error) {
            throw "error";
        }
    }, []);

    return (
        <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={undefined} className={clsx("bg-white h-full px-2 pt-4")}>
                <Text h3 className="mb-4">
                    Login
                </Text>

                <TextField
                    label="Username"
                    placeholder={"Username"}
                    value={formValues.username}
                    onChangeText={(text) => onChangeText("username", text)}
                    showCharCounter
                    maxLength={30}
                    className="p-2 rounded mb-1 bg-gray-200"
                    keyboardType="email-address"
                />

                <TextField
                    label={"Password"}
                    placeholder={"Password"}
                    value={formValues.password}
                    onChangeText={(text) => onChangeText("password", text)}
                    showCharCounter
                    maxLength={6}
                    className="p-2 rounded mb-1 bg-gray-200"
                    secureTextEntry
                />
                <Button
                    label="Login"
                    className="w-full mt-2"
                    onPress={() => onSubmit({ schema: loginSchema, formData: formValues })}
                />
                {/* <LoaderScreen color={Colors.grey40} /> */}
                <View className="mt-4 w-full flex items-center justify-center">
                    <Link to={"/Register"}>
                        <Text className="text-blue-500">Go to register</Text>
                    </Link>
                </View>
            </ScrollView>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}
