import { ComponenteCiudad } from "@/components/ComponenteCiudad";
import { ComponenteGrados } from "@/components/ComponenteGrados";
import HourlyForecast, { HourlyItemData } from "@/components/HourlyForecast";
import { Saludo } from "@/components/Saludo";
import { Button, Text, View, Platform, Image, Pressable } from "react-native";
import { router } from "expo-router";
import { ComponenteInfo } from "@/components/ComponenteInfo";
import { ImageBackground } from "react-native";
import DailyForecast, { DailyItemData } from "@/components/DailyForecast";
import { useContext } from "react";
import { AppContext } from "@/context/context/AppContext";


export default function Index() {

  const ctx = useContext(AppContext);
  console.log("modo:", ctx.isModoOscuro);

  const clima = {
    ciudad: "Monterrey",
    grados: 35,
    info: "Parcialmente Soleado" + "\n" + "Maxima: 38º Mínima: 28º"
  }

  const hourly: HourlyItemData[] = [
    { hour: "Ahora", icon: "☀️", temp: 35 },
    { hour: "2p.m.", icon: "☀️", temp: 37 },
    { hour: "3p.m.", icon: "☀️", temp: 38 },
    { hour: "4p.m.", icon: "⛅", temp: 36 },
    { hour: "5p.m.", icon: "⛅", temp: 33 },
    { hour: "6p.m.", icon: "⛅", temp: 28 },
    { hour: "7p.m.", icon: "🌧️", temp: 25 },
    { hour: "8p.m.", icon: "🌧️", temp: 25 },
    { hour: "9p.m.", icon: "🌧️", temp: 23 },
    { hour: "10p.m.", icon: "🌧️", temp: 21 },
  ];

  const daily: DailyItemData[] = [
    { day: "Hoy", icon: "☀️", minTemp: 28, maxTemp: 38, airQuality: 45 },
    { day: "Mar", icon: "⛅", minTemp: 27, maxTemp: 36, airQuality: 52 },
    { day: "Mié", icon: "🌧️", minTemp: 24, maxTemp: 30, airQuality: 60 },
    { day: "Jue", icon: "⛅", minTemp: 25, maxTemp: 33, airQuality: 40 },
    { day: "Vie", icon: "☀️", minTemp: 26, maxTemp: 35, airQuality: 35 },
    { day: "Sáb", icon: "☀️", minTemp: 26, maxTemp: 35, airQuality: 35 },
    { day: "Dom", icon: "☀️", minTemp: 26, maxTemp: 35, airQuality: 42 },
    { day: "Lun", icon: "⛅", minTemp: 24, maxTemp: 33, airQuality: 46 },
    { day: "Mar", icon: "⛅", minTemp: 23, maxTemp: 28, airQuality: 55 },
    { day: "Mié", icon: "🌧️", minTemp: 24, maxTemp: 31, airQuality: 34 },
    { day: "Jue", icon: "☀️", minTemp: 28, maxTemp: 38, airQuality: 45 },
  ];
  // Esto es lo que se va a mostrar en pantalla

  return (
    <ImageBackground
      source={
        ctx.isModoOscuro
          ? require("../assets/ClimaImages/backgrounds/Night.jpg")
          : require("../assets/ClimaImages/backgrounds/Day.jpg")
      }
      style={[
        { flex: 1, width: "100%" },
        Platform.select({
          web: { minHeight: "100vh" as any },
        }),
      ]}
      imageStyle={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    >

      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 180,
        }}
      >

        <View style={{ gap: 0, alignItems: "center" }}>
          <ComponenteCiudad name={clima.ciudad} />
          <ComponenteGrados value={clima.grados} />
          <ComponenteInfo description={clima.info} />
        </View>

        {/* Hourly Forecast View */}
        <View style={{
          marginTop: 50,
          backgroundColor: ctx.getCardBg(),
          padding: 10,
          borderRadius: 16,
          width: "90%"
        }}>

          <View style={{
            marginTop: 5,
            width: "100%"
          }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "400",
                marginBottom: 10,
                textAlign: "center",
                color: "white",
                paddingBottom: 8,
                borderBottomWidth: 0.3,
                borderBottomColor: ctx.getAccent(),
              }}>
              Cielo soleado durante la mañana.{"\n"}
              Parcialmente nublado a partir de las 4p.m.
            </Text>
            <HourlyForecast items={hourly} />
          </View>
        </View>

        {/* // Daily Forecast View */}

        {/* // Container*/}
        <View
          style={{
            marginTop: 10,
            backgroundColor: ctx.getCardBg(),
            padding: 10,
            borderRadius: 16,
            width: "90%",
            maxHeight: 400,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingHorizontal: 10,
              borderBottomWidth: 0.3,
              borderBottomColor: ctx.getAccent(),
              paddingBottom: 10,
              width: "100%",
              alignSelf: "center",
              gap: 10,
            }}
          >
            <Image
              source={
                ctx.isModoOscuro
                  ? require("../assets/ClimaImages/icons/calendar/calendar-night.png")
                  : require("../assets/ClimaImages/icons/calendar/calendar-day.png")
              }
              style={{ width: 16, height: 16, marginRight: 6 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "600",
                color: ctx.getSecondaryText(),
              }}
            >
              PRONÓSTICO PARA 10 DÍAS
            </Text>
          </View>
          <DailyForecast items={daily} />
        </View>
      </View>


      <View
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          paddingHorizontal: 20,
          paddingVertical: 0,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: ctx.getCardBgBlur(),
          // borderRadius: 16,
          marginHorizontal: 22,
          zIndex: 9999,
          elevation: 9999,
        }}
      >
        <Pressable
          onPress={() => router.push("/About")}
          hitSlop={10}
          style={{
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Image
            source={require("../assets/ClimaImages/info/info.png")}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </Pressable>

        <Pressable
          onPress={ctx.toggleModo}
          hitSlop={10}
          style={{
            padding: 10,
            borderRadius: 8,
          }}
        >
          <Image
            source={
              ctx.isModoOscuro
                ? require("../assets/ClimaImages/icons/modes/dark-mode.png")
                : require("../assets/ClimaImages/icons/modes/light-mode.png")
            }
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </ImageBackground>

  );
}
