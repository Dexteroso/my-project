import { ThemeContext } from "@/context/context/ThemeContext";
import { router } from "expo-router";
import { useContext } from "react";
import { Image, Platform, Pressable, Text, useWindowDimensions, View } from "react-native";


export default function AboutView() {
    const ctx = useContext(ThemeContext);
    const { width } = useWindowDimensions();
    const isWeb = Platform.OS === "web";
    const isDesktop = isWeb && width >= 768;
    const CONTENT_MAX_WIDTH = isDesktop ? 520 : 500;

    return (
        <View style={{
            flex: 1,
            backgroundColor: ctx.getCardBg(),
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 175,
        }}>

            <View style={{
                alignItems: "center",
                gap: 200,
            }}>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "600",
                            color: ctx.getInfoText(),
                        }}
                    >
                        Mi App de Clima ⛅️
                    </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: ctx.getInfoText(),
                        }}
                    >
                        Desarrollado usando:
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "600",
                            color: ctx.getInfoText(),
                        }}
                    >
                        Expo + React Native
                    </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text
                        style={{
                            fontSize: 18,
                            color: ctx.getInfoText(),
                        }}
                    >
                        Desarrollador:
                    </Text>
                    <Text
                        style={{
                            fontSize: 25,
                            fontWeight: "600",
                            color: ctx.getInfoText(),
                        }}
                    >
                        Angel Solano
                    </Text>
                </View>
            </View>

            {/* Ícono home */}
            <View
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    alignItems: "center",
                    zIndex: 4000,
                    elevation: 4000,
                }}
            >
                <View
                    style={{
                        height: 50,
                        width: "90%",
                        maxWidth: CONTENT_MAX_WIDTH,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        backgroundColor: ctx.getCardBgBlur(),
                        borderRadius: 16,
                    }}
                >
                    <Pressable
                        onPress={() => router.push("/")}
                        hitSlop={10}
                        style={{
                            padding: 10,
                            width: 72,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                        }}
                    >
                        <Image
                            source={require("../assets/ClimaImages/icons/home/home.png")}
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    </Pressable>

                    <Pressable
                        onPress={ctx.toggleModo}
                        hitSlop={10}
                        style={{
                            padding: 10,
                            width: 72,
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 8,
                        }}
                    >
                        <Image
                            source={
                                ctx.isModoOscuro
                                    ? require("../assets/ClimaImages/icons/modes/light-mode.png")
                                    : require("../assets/ClimaImages/icons/modes/dark-mode.png")
                            }
                            style={{ width: 24, height: 24 }}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export { AboutView };
