import { StatusBar } from "expo-status-bar";
import { SafeAreaView, ScrollView } from "react-native";
import { Text } from "react-native-ui-lib";

export default function Products() {
    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView showsVerticalScrollIndicator={undefined} className="bg-white h-full px-2">
                <Text>Products</Text>
            </ScrollView>
        </SafeAreaView>
    );
}
