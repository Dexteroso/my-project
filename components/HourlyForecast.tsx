import { ScrollView, Text, View } from "react-native";
import { useRef, useEffect } from "react";

export type HourlyItemData = {
    hour: string;
    temp: number;
    icon: string;
};

type Props = {
    items: HourlyItemData[];
};

export default function HourlyForecast({ items }: Props) {
    const scrollRef = useRef<ScrollView>(null);
    useEffect(() => {
        scrollRef.current?.scrollTo({ x: 0, animated: false });
    }, [items]);

    return (
        <ScrollView
            ref={scrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
                        style={{ width: "100%" }}
            contentContainerStyle={{
                paddingTop: 15,
                paddingBottom: 15,
                alignItems: 'center',
                gap:8,
            }}
        >
            {items.map((item, idx) => (
                <View
                    key={`${item.hour}-${idx}`}
                    style={{
                        alignItems: "center",
                        paddingHorizontal: 8,
                        borderRadius: 16,
                        minWidth: 30,
                    }}
                >
                    {/* Hora */}
                    <Text style={{ fontSize: 14, color: "white" }}>
                        {item.hour}
                    </Text>

                    {/* Ícono */}
                    <Text style={{ fontSize: 20, color: "white", marginVertical: 20 }}>
                        {item.icon}
                    </Text>


                    {/* Temperatura */}
                    <Text style={{ fontSize: 14, color: "white" }}>
                        {item.temp}°
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
}