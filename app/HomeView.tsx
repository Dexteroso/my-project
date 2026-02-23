import { ComponenteCiudad } from "@/components/ComponenteCiudad";
import { ComponenteGrados } from "@/components/ComponenteGrados";
import { View } from "react-native";

export default function HomeView() {
    return <View>
       <ComponenteCiudad name="Cancún"/>
       <ComponenteGrados value={32} />
    </View>
}