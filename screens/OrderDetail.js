import { faker } from "@faker-js/faker";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-ui-lib";
import * as Linking from "expo-linking";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function OrderDetail({ route, navigation: { setOptions } }) {
    const orderId = route.params.id ?? "--";
    setOptions({ title: `#${orderId}` });

    const order = useMemo(
        () => ({
            id: faker.string.uuid().slice(0, 13),
            time: `${faker.number.int({ min: 1, max: 10 })} hours ago`,
            customer: {
                name: faker.person.fullName(),
                phone: "+255758948594",
                address: faker.location.city(),
                email: faker.internet.email(),
            },
            products: Array.from({ length: 4 }).map(() => ({
                name: faker.commerce.productName(),
                quantity: faker.number.int({ min: 1, max: 10 }),
                unit: faker.commerce.productAdjective(),
                variant: faker.commerce.productMaterial(),
            })),
        }),
        []
    );

    const onPressPhoneNumber = useCallback(
        () => Linking.openURL(`tel:${order.customer.phone}`),
        [order.customer.phone]
    );

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView showsVerticalScrollIndicator={undefined} className="bg-white h-full">
                <View className="p-4 bg-gray-50 border-b border-b-gray-300">
                    <Text className="mb-4">
                        Updated by <Text className="font-bold">John Michaels</Text> on{" "}
                        <Text className="font-bold">2023.04.12 at 12:21 PM</Text>
                    </Text>

                    <Text style={{ color: "rgb(96 165 250)" }}>Open</Text>

                    <Text className="mt-4">Customer Information</Text>

                    <View className="flex space-y-2 mt-2">
                        <View className="flex flex-row items-center space-x-4 justify-between mt-0">
                            <Text className=" text-gray-500">Name</Text>
                            <Text className="">{order.customer.name}</Text>
                        </View>
                        <View className="flex flex-row items-center space-x-4 justify-between mt-0">
                            <Text className=" text-gray-500">Email</Text>
                            <Text className="">{order.customer.email}</Text>
                        </View>
                        <View className="flex flex-row items-center space-x-4 justify-between mt-0">
                            <Text className=" text-gray-500">Address</Text>
                            <Text className="">{order.customer.address}</Text>
                        </View>

                        <View className="flex flex-row items-center space-x-4 justify-between mt-0 mb-2">
                            <Text className=" text-gray-500">Phone Number</Text>
                            <TouchableOpacity onPress={onPressPhoneNumber}>
                                <View className="flex flex-row space-x-2 items-center">
                                    <MaterialCommunityIcons name="phone" size={16} color={"rgb(59 130 246)"} />
                                    <Text className=" text-blue-500">{order.customer.phone}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
