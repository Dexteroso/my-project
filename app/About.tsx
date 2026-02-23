import { View, Text } from "react-native";

export default function AboutView() {
    return (
    <View>
        <Text style={{ fontSize: 60 }}>Mi App de Clima</Text>
        <Text style={{ fontSize: 60, backgroundColor: 'red', color: 'white'}}>Mi App de Clima</Text>
        <Text>Mi App de Clima</Text>
    </View>
    );
}

export { AboutView };