import clsx from "clsx";
import { Dimensions, View } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Text } from "react-native-ui-lib";

export function Chart({
    backgroundColor = "#6174FF",
    title,
    subTitle,
    data = [],
    dataLabels = [],
    verticalSpacing = true,
    chartType = "LineChart",
}) {
    const props = {
        data: { labels: dataLabels, datasets: [{ data }] },
        className: `px-4 rounded-none flex items-center justify-center`,
        width: Dimensions.get("window").width * 0.92,
        height: 250,
        yAxisInterval: 1,
        chartConfig: {
            backgroundColor: backgroundColor,
            backgroundGradientFrom: backgroundColor,
            backgroundGradientTo: backgroundColor,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "6", strokeWidth: "2", stroke: "#fff", fill: backgroundColor },
        },
        style: { backgroundColor },
    };
    return (
        <View className={clsx(`rounded-lg bg-[${backgroundColor}] py-2`, verticalSpacing && "mb-4")}>
            <View className="px-2 text-white mb-2">
                <Text className="text-white">{title}</Text>
                <Text className="text-white font-bold">{subTitle}</Text>
            </View>

            {getChart({ chartType, props })}
        </View>
    );
}

function getChart({ chartType, props }) {
    const chartMap = new Map();

    chartMap.set("LineChart", <LineChart {...props} />);
    chartMap.set("BarChart", <BarChart {...props} {...{ barPercentage: 0.5 }} />);

    return chartMap.get(chartType);
}
