import { ThemeContext } from "@/context/context/ThemeContext";
import { useContext } from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { useEffect, useRef } from "react";

export type DailyItemData = {
    day: string;
    icon: string;
    minTemp: number;
    maxTemp: number;
    rainChance: number;
};

type Props = {
    items: DailyItemData[];
};
const isWeb = Platform.OS === "web";

export default function DailyForecast({ items }: Props) {
    const ctx = useContext(ThemeContext);
    const scrollRef = useRef<ScrollView>(null);
    useEffect(() => {
        scrollRef.current?.scrollTo({ y: 0, animated: false });
    }, [items]);

    return (
        <ScrollView
            ref={scrollRef}
            bounces={false}
            alwaysBounceVertical={false}
            overScrollMode="never"
            showsVerticalScrollIndicator={false}
            style={[
                {gap: 5,
                paddingTop: 5,
                width: "100%",
                paddingBottom: 50,},
                isWeb && ({ maxHeight: 300, overflowY: "auto" } as any),
            ]

            }
        >
            {items.map((item, index) => (
                <View key={`${item.day}-${index}`}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingVertical: 15,
                        borderBottomWidth: 0.3,
                        borderBottomColor: ctx.getSeparator(),
                    }}
                >
                    {/* Día */}
                    <View style={{ flex: 1, maxWidth: 40 }}>
                        <Text style={{ fontSize: 18, color: "white" }}>
                            {item.day}
                        </Text>
                    </View>

                    {/* Ícono */}
                    <View style={{ flex: 1, maxWidth: 40, alignItems: "center" }}>
                        <Text style={{ fontSize: 20, color: "white" }}>
                            {item.icon}
                        </Text>
                    </View>


                    {/* Temperaturas */}
                    <View style={{
                        maxWidth: 120,
                        flexDirection: "row",
                        alignItems: "center",
                        flex: 2,
                        justifyContent: "space-between"
                    }}>
                        <Text style={{ fontSize: 18, color: "#8DD5FF" }}>
                            {item.minTemp}°
                        </Text>

                        <View
                            style={{
                                flex: 1,
                                alignItems: "center"
                            }}
                        >
                            <Text style={{ fontSize: 10 }}>🌧️</Text>
                            <Text style={{ fontSize: 8, color: ctx.getPrimaryText(), fontWeight: 800 }}>
                                {item.rainChance}%
                            </Text>
                        </View>

                        <Text style={{ fontSize: 18, color: "#fff" }}>
                            {item.maxTemp}°
                        </Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}