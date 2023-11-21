import clsx from "clsx";
import { View } from "react-native";
import { Text } from "react-native-ui-lib";

export function Logo({ centered, spaceBelow = true, small = false }) {
    return (
        <View className={clsx("flex flex-row gap-0 items-center", centered && "self-center", spaceBelow && "my-4")}>
            <Text className={clsx("font-black text-gray-500", small ? "text-sm" : "text-xl")}>Shop</Text>
            <Text className={clsx("font-black text-blue-500", small ? "text-sm" : "text-xl")}>Kon</Text>
            <View className="bg-blue-500 px-1 rounded-lg">
                <Text className={clsx("font-black text-white", small ? "text-sm" : "text-xl")}>ekt.</Text>
            </View>
        </View>
    );
}

// export function Logo() {
//     const [assets, error] = useAssets([require("../assets/sample-logo.png")]);

//     return assets ? <Image source={assets[0]} className="h-[60px] w-[100px] object-scale-down" /> : null;
// }
