import { MaterialCommunityIcons } from "@expo/vector-icons";
import { faker } from "@faker-js/faker";
import clsx from "clsx";
import * as Linking from "expo-linking";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text, TextField, TouchableOpacity } from "react-native-ui-lib";

export default function Orders({ navigation: { navigate } }) {
    const [selectedOrderState, setSelectedOrderState] = useState(1);
    const onChangeOrderState = useCallback((oderStateId) => setSelectedOrderState(oderStateId), []);
    const orderStates = useMemo(
        () => [
            { label: `All`, id: 1 },
            { label: `Closed`, id: 2 },
            { label: `Open`, id: 3 },
            { label: `Pending payment`, id: 4 },
            { label: `Customer complain`, id: 5 },
        ],
        []
    );
    const orders = Array.from({ length: 4 }).map(() => ({}));

    const onOrderPress = useCallback(
        ({ navigate, route }) =>
            ({ id }) =>
                navigate(route, { id }),
        []
    );

    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView showsVerticalScrollIndicator={undefined} className="bg-white h-full px-2">
                <ScrollView
                    horizontal
                    className="flex flex-row gap-4 overflow-scroll"
                    contentContainerStyle={{ alignItems: "center" }}
                >
                    {orderStates.map((orderState) => {
                        const isSelected = selectedOrderState === orderState.id;
                        return (
                            <TouchableOpacity
                                key={orderState.id}
                                className={clsx("mb-2", isSelected && "bg-blue-500 px-6 py-2 rounded")}
                                onPress={() => onChangeOrderState(orderState.id)}
                            >
                                <Text className={clsx(isSelected && "text-white")}>{orderState.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <TextField
                    className="my-4 bg-gray-50 p-2 border border-gray-300 rounded"
                    placeholder="Search for orders"
                />

                {orders.map((_, orderIndex) => (
                    <OrderItem key={orderIndex} onOrderPress={onOrderPress({ navigate, route: "Order-details" })} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

function OrderItem({ onOrderPress }) {
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

    const totalProductCount = useMemo(() => order.products.length, [order.products]);
    const onPressPhoneNumber = useCallback(
        () => Linking.openURL(`tel:${order.customer.phone}`),
        [order.customer.phone]
    );
    return (
        <TouchableOpacity
            onPress={() => onOrderPress({ id: order.id })}
            className="bg-gray-50 p-4 border border-gray-400 rounded flex space-y-4 mb-4"
        >
            <View className="flex space-y-2">
                <View className="flex flex-row items-center justify-between">
                    <Text className="font-bold">{order.customer.name}</Text>
                    <Text style={{ color: "rgb(96 165 250)" }}>Open</Text>
                </View>

                <View className="flex flex-row items-center space-x-4 mt-0">
                    <Text className="text-gray-400">#{order.id}</Text>
                    <MaterialCommunityIcons name="circle" size={5} />
                    <Text className="text-gray-400">{order.time}</Text>
                </View>
            </View>

            <View className="flex space-y-2">
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

            <View className="flex space-y-2">
                <Text className=" text-gray-400">Products</Text>
                <View className="">
                    {order.products.map((product, productIndex) => (
                        <ProductItemOrderView
                            key={productIndex}
                            isLastItem={totalProductCount - 1 === productIndex}
                            name={product.name}
                            quantity={product.quantity}
                            unit={product.unit}
                            variant={product.variant}
                        />
                    ))}
                </View>
            </View>
        </TouchableOpacity>
    );
}

function ProductItemOrderView({ isLastItem, name, quantity, unit, variant }) {
    return (
        <View className={clsx("mb-2 pb-2", isLastItem ? "border-none" : "border-b border-b-gray-300")}>
            <Text className="font-semibold mb-1">{name}</Text>

            <View className="flex flex-row items-center space-x-4 justify-between mt-0">
                <Text className=" text-gray-500">Quantity</Text>
                <Text className="">{quantity}</Text>
            </View>
            <View className="flex flex-row items-center space-x-4 justify-between mt-0">
                <Text className=" text-gray-500">Unit</Text>
                <Text className="">{unit}</Text>
            </View>
            <View className="flex flex-row items-center space-x-4 justify-between mt-0">
                <Text className=" text-gray-500">Variant</Text>
                <Text className="">{variant}</Text>
            </View>
        </View>
    );
}
