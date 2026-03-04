import { ThemeContext } from "@/context/context/ThemeContext";
import { useContext } from "react";
import { Text, View } from "react-native";

interface IComponenteInfo {
    description: string;
    tempMax?: string;
    tempMin?: string;
}

export function ComponenteInfo(props: IComponenteInfo) {
    const ctx = useContext(ThemeContext);

    return <View>
        <Text style={{
            fontSize: 18,
            color: ctx.getSecondaryText(),
            fontWeight: "400",
            textAlign: "center",
            marginTop: 0
        }}>{props.description}
        </Text>

        <Text style={{
            fontSize: 16,
            color: "white",
            textAlign: "center",
            marginTop: 5
        }}>
            Máxima: {props.tempMax ?? "-"}   Mínima: {props.tempMin ?? "-"}
        </Text>
    </View>
}