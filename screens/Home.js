import { useState } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import { Picker, Text } from "react-native-ui-lib";
import appSettings from "../utils/appSettings";
import { Chart } from "../components/Chart";
import clsx from "clsx";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function Home() {
    const [value, setValue] = useState("2023");
    const getRandomData = () => [
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
        Math.random() * 100,
    ];
    return (
        <SafeAreaView>
            <StatusBar style="auto" />
            <ScrollView showsVerticalScrollIndicator={undefined} className="bg-white h-full px-2">
                <Text className="mt-2 text-sm text-gray-400">{new Date().toDateString()}</Text>

                <Text className="mt-2 text-xl font-bold">
                    Welcome back, <Text className="text-blue-500">Paulina</Text>
                </Text>

                <Picker
                    value={value}
                    onChange={(value) => setValue(value)}
                    placeholder={"Placeholder"}
                    useSafeArea
                    items={Array.from({ length: 10 }).map((_, num) => ({
                        label: (2023 - num).toString(),
                        value: (2023 - num).toString(),
                    }))}
                    renderItem={(value, { isSelected }, itemLabel) => {
                        return (
                            <View className="flex flex-row p-4 items-center">
                                <View
                                    className={clsx(
                                        "mr-2 h-8 w-8 flex flex-row items-center justify-center",
                                        !isSelected && "opacity-0"
                                    )}
                                >
                                    {isSelected ? (
                                        <AntDesign name="check" size={20} color="rgb(96 165 250)" />
                                    ) : undefined}
                                </View>
                                <Text>{itemLabel}</Text>
                            </View>
                        );
                    }}
                    className={`bg-gray-50 p-2 rounded border border-gray-300 mt-2`}
                />

                <Text className="mt-0 mb-4">
                    Here is a quick summary of your online business in the year
                    <Text className="mt-0 font-bold"> {value ?? "--"}.</Text>
                </Text>

                <Chart
                    title={"Sales"}
                    subTitle={`${appSettings.currency} 13,030,000.18`}
                    data={getRandomData()}
                    dataLabels={["January", "February", "March", "April", "May", "June", "July", "August"]}
                />

                <Chart
                    title={"Customers paying through ShopKonekt"}
                    subTitle={541}
                    data={getRandomData()}
                    dataLabels={["January", "February", "March", "April", "May", "June", "July", "August"]}
                    chartType="BarChart"
                />

                <Chart
                    title={"Customers who called directly"}
                    subTitle={132}
                    data={getRandomData()}
                    dataLabels={["January", "February", "March", "April", "May", "June", "July", "August"]}
                    chartType="BarChart"
                />
            </ScrollView>
        </SafeAreaView>
    );
}
