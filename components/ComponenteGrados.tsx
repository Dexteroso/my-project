import { Text, View } from "react-native";

//Aqquí especificamos la estructura del componente
interface IComponenteGrados {
    value: number
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
                fontSize: 110,
                color: "white",
                lineHeight: 110,
                fontWeight: "200",
                // Ajusté el espacio entre el número y el símbolo de grados para que se vean más juntos
                marginTop: -5,
                marginBottom: -15,
            }}>{props.value}°</Text>
        </View>
    )
}