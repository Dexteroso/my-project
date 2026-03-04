import { Text, View } from "react-native";

interface IComponenteGrados {
    value: string
}

export function ComponenteGrados(props: IComponenteGrados) {
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={{
                fontSize: 60,
                color: "white",
                lineHeight: 60,
                fontWeight: "200",
            }}>{props.value}</Text>
        </View>
    )
}