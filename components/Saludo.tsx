import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export function Saludo() {
const [nombre, setNombre ]= useState('')

console.log("nombre", nombre)

function actualizarComponente(){
console.log("El componente se actualizó")
}


// function actualizarComponente() {
//     console.log("El componente se actualizó", nombre)
// }

    console.log(":: DENTRO CÓDIGO :: Este es el componente SALUDO.tsx")

    // Montaje (Renderizado)
    useEffect(()=>{
            console.log("::Saludo.tsxt: se montó el componente")
        },
        // La razón por la que se actualice el componente
        [])

        // Actualizar después de 1 segundo
        setTimeout(()=>{
            setNombre('Alan')
        },1000)

        useEffect(actualizarComponente, [nombre])
    return <View>
        <Text>Hello World</Text>
    </View>
}