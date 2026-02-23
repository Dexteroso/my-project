import { View, Text, ScrollView } from "react-native";

export type HourlyItemData = {
    hour: string;
    temp: number;
    icon: string;
};

type Props = {
    items: HourlyItemData[];
};

export default function HourlyForecast({ items }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ alignSelf: 'center' }}
            contentContainerStyle={{
                gap: 0,
                alignItems: 'center',
            }}
        >
            {items.map((item) => (
                <View
                    key={item.hour}
                    style={{
                        alignItems: "center",
                        padding: 15,
                        gap: 15,
                        borderRadius: 16,
                        // backgroundColor: "#f2f2f2",
                        minWidth: 30,
                    }}
                >
                    {/* Hora */}
                    <Text style={{ fontSize: 14, color: "white", marginBottom: 4 }}>
                        {item.hour}
                    </Text>

                    {/* Ícono */}
                    <Text style={{ fontSize: 20, color: "white", marginVertical: 4 }}>
                        {item.icon}
                    </Text>


                    {/* Temperatura */}
                    <Text style={{ fontSize: 14, color: "white", fontWeight: "400" }}>
                        {item.temp}°
                    </Text>
                </View>
            ))}
        </ScrollView>
    );
}