import { Text, View } from "react-native";

interface IComponenteCiudad {
    name: string
}

export function ComponenteCiudad(props: IComponenteCiudad) {
    return <View>
        <Text style={{
            fontSize: 35,
            color: "white",
            fontWeight: "400"
        }}>{props.name}</Text>
    </View>
}