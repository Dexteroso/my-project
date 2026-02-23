import { AppContext } from "@/context/context/AppContext";
import { useContext } from "react";
import { View, Text, ScrollView } from "react-native";

export type DailyItemData = {
    day: string;
    icon: string;
    minTemp: number;
    maxTemp: number;
    airQuality: number; // 0–100 scale
};

type Props = {
    items: DailyItemData[];
};

export default function DailyForecast({ items }: Props) {
    const ctx = useContext(AppContext);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                gap: 5,
                paddingHorizontal: 10,
                paddingTop: 5,
                width: "100%",
            }}
        >
            {items.map((item, index) => (
                <View key={`${item.day}-${index}`}
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                        paddingVertical: 10,
                        borderBottomWidth: 0.3,
                        borderBottomColor: ctx.getAccent(),
                    }}
                >
                    {/* Día */}
                    <Text style={{ fontSize: 18, color: "white" }}>
                        {item.day}
                    </Text>

                    {/* Ícono */}
                    <Text style={{ fontSize: 20, color: "white" }}>
                        {item.icon}
                    </Text>


                    {/* Temperaturas */}
                    <View style={{ flexDirection: "row", gap: 8 }}>
                        <Text style={{ fontSize: 18, color: "#8DD5FF" }}>
                            {item.minTemp}°
                        </Text>

                        <Text style={{ fontSize: 18, color: "white", opacity: 0.7 }}>
                            Aire: {item.airQuality}°
                        </Text>

                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            {item.maxTemp}°
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}