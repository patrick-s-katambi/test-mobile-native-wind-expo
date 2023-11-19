import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import { Text, TouchableOpacity } from "react-native-ui-lib";

export function GoBack({ goBack, label = "Go back" }) {
    return (
        <TouchableOpacity onPress={goBack} className="mb-4">
            <View className="flex flex-row items-center gap-1">
                <AntDesign name="left" size={20} color="rgb(59 130 246)" className="text-blue-500" />
                <Text className="text-blue-500">{label}</Text>
            </View>
        </TouchableOpacity>
    );
}
