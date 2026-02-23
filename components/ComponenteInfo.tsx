import { Text, View } from "react-native";

//Aqquí especificamos la estructura del componente
interface IComponenteInfo {
    description: string
}

export function ComponenteInfo(props: IComponenteInfo) {
    return <View>
        <Text style={{
            fontSize: 18,
            color: "white",
            fontWeight: "400",
            textAlign: "center"
        }}>{props.description}</Text>
    </View>
}