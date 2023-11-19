import clsx from "clsx";
import { View } from "react-native";
import { Text } from "react-native-ui-lib";

export function Logo({ centered, spaceBelow = true }) {
    return (
        <View className={clsx("flex flex-row gap-0 items-center", centered && "self-center", spaceBelow && "mb-4")}>
            <Text className="text-xl font-black text-gray-500">Shop</Text>
            <Text className="text-xl font-black text-blue-300">Kon</Text>
            <View className="bg-blue-500 px-1 rounded-lg">
                <Text className="text-xl font-black text-white">ekt.</Text>
            </View>
        </View>
    );
}

// export function Logo() {
//     const [assets, error] = useAssets([require("../assets/sample-logo.png")]);

//     return assets ? <Image source={assets[0]} className="h-[60px] w-[100px] object-scale-down" /> : null;
// }
