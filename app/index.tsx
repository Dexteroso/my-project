import { ComponenteCiudad } from "@/components/ComponenteCiudad";
import { ComponenteGrados } from "@/components/ComponenteGrados";
import { ComponenteInfo } from "@/components/ComponenteInfo";
import DailyForecast, { DailyItemData } from "@/components/DailyForecast";
import HourlyForecast, { HourlyItemData } from "@/components/HourlyForecast";
import { ThemeContext } from "@/context/context/ThemeContext";
import { router } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { Image, ImageBackground, Pressable, Text, View, TextInput, Keyboard, Platform } from "react-native";
import { useWindowDimensions } from "react-native";


export default function Index() {

  const ctx = useContext(ThemeContext);

  const toTitleCase = (texto: string) =>
    texto
      .toLowerCase()
      .split(" ")
      .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1))
      .join(" ");

  const [ciudad, setCiudad] = useState("-");
  const [temperatura, setTemperatura] = useState("-");
  const [descripcion, setDescripcion] = useState("-");
  const [tempMax, setTempMax] = useState("-");
  const [tempMin, setTempMin] = useState("-");
  const [city, setCity] = useState("Monterrey");
  const [cityDraft, setCityDraft] = useState("Monterrey");
  const [isCityInputOpen, setIsCityInputOpen] = useState(false);
  const cityInputRef = useRef<TextInput>(null);
  const [hourly, setHourly] = useState<HourlyItemData[]>([]);
  const [daily, setDaily] = useState<DailyItemData[]>([]);
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isDesktop = isWeb && width >= 768;
  const CONTENT_MAX_WIDTH = isDesktop ? 520 : 500;

  useEffect(() => {
    const cargarClima = async () => {
      try {
        const API_KEY = "2378f72f19c9c1a5d2a82ff0e5a99866";
        const cityName = city;

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric&lang=es`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Error al consultar OpenWeather");
        }

        setCiudad(data.name);
        setTemperatura(`${Math.round(data.main.temp)}°`);

        {/* Description en Title Case (Primera Letra De Cada Palabra) */ }
        const descripcionAPI: string = data?.weather?.[0]?.description ?? "-";
        setDescripcion(toTitleCase(descripcionAPI));

        {/* Hourly 24 horas */ }
        const hourlyUrl = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric&lang=es`;

        const hourlyResponse = await fetch(hourlyUrl);
        const hourlyData = await hourlyResponse.json();

        if (!hourlyResponse.ok) {
          throw new Error(hourlyData?.message || "Error al consultar Hourly");
        }

        {/* mapeo iconCode */ }
        const iconToEmoji = (iconCode: string) => {
          if (iconCode.startsWith("01")) return "☀️";
          if (iconCode.startsWith("02")) return "⛅";
          if (iconCode.startsWith("03") || iconCode.startsWith("04")) return "☁️";
          if (iconCode.startsWith("09") || iconCode.startsWith("10")) return "🌧️";
          if (iconCode.startsWith("11")) return "⛈️";
          if (iconCode.startsWith("13")) return "❄️";
          return "🌫️";
        };

        const now = new Date();
        const list: any[] = hourlyData?.list ?? [];

        let startIdx = list.findIndex((it) => new Date(it.dt * 1000) >= now);
        if (startIdx < 0) startIdx = 0;

        const next24: HourlyItemData[] = list.slice(startIdx, startIdx + 24).map((it, idx) => {
          const d = new Date(it.dt * 1000 - 3600000);
          const iconCode = it?.weather?.[0]?.icon ?? "01d";

          const hourLabel =
            idx === 0
              ? "Ahora"
              : d
                .toLocaleTimeString("es-MX", { hour: "numeric" })
                .toLowerCase();

          return {
            hour: hourLabel,
            icon: iconToEmoji(iconCode),
            temp: Math.round(it?.main?.temp ?? 0),
          };
        });

        setHourly(next24);

        {/* Pronóstico a 10 días */ }
        const dailyUrl = `https://pro.openweathermap.org/data/2.5/forecast/daily?q=${encodeURIComponent(
          cityName
        )}&cnt=10&appid=${API_KEY}&units=metric&lang=es`;

        const dailyResponse = await fetch(dailyUrl);
        const dailyData = await dailyResponse.json();

        if (!dailyResponse.ok) {
          throw new Error(dailyData?.message || "Error al consultar Daily 10 días");
        }

        setTempMax(`${Math.round(dailyData.list[0].temp.max)}°`);
        setTempMin(`${Math.round(dailyData.list[0].temp.min)}°`);

        setDaily(
          (dailyData.list || []).map((item: any, idx: number) => {
            const date = new Date(item.dt * 1000);

            const label =
              idx === 0
                ? "Hoy"
                : date
                  .toLocaleDateString("es-MX", { weekday: "short" })
                  .replace(".", "");

            const iconCode = item?.weather?.[0]?.icon ?? "01d";

            const icon = iconCode.startsWith("01")
              ? "☀️"
              : iconCode.startsWith("02")
                ? "⛅"
                : iconCode.startsWith("03") || iconCode.startsWith("04")
                  ? "☁️"
                  : iconCode.startsWith("09") || iconCode.startsWith("10")
                    ? "🌧️"
                    : iconCode.startsWith("11")
                      ? "⛈️"
                      : iconCode.startsWith("13")
                        ? "❄️"
                        : "🌫️";

            return {
              day: toTitleCase(String(label)),
              icon,
              minTemp: Math.round(item.temp.min),
              maxTemp: Math.round(item.temp.max),
              rainChance: Math.round((item.pop ?? 0) * 100),
            } as DailyItemData;
          })
        );
      }

      catch (err: any) {
        console.log("Error clima:", err?.message || err);
        setCiudad("Error");
        setTemperatura("-");
        setDescripcion("-");
        setTempMax("-");
        setTempMin("-");
        setHourly([]);
        setDaily([]);
      }
    };

    cargarClima();
  }, [city]);

  return (
    <ImageBackground
      source={
        ctx.isModoOscuro
          ? require("../assets/ClimaImages/backgrounds/Night.jpg")
          : require("../assets/ClimaImages/backgrounds/Day.jpg")
      }
      resizeMode="cover"
      style={[
        { flex: 1, width: "100%" },
        Platform.select({
          web: { minHeight: "100vh" as any },
        }),
      ]}
      imageStyle={{ width: "100%", height: "100%", resizeMode: "cover" }}
    >

      {isCityInputOpen && (
        <Pressable
          onPress={() => {
            setIsCityInputOpen(false);
            setCityDraft(city);
            Keyboard.dismiss();
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 5000,
          }}
        />
      )}

      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 150,
        }}
      >

        <View style={{ gap: 0, alignItems: "center" }}>
          <ComponenteCiudad name={ciudad} />
          <ComponenteGrados value={temperatura} />
          <ComponenteInfo description={descripcion} tempMax={tempMax} tempMin={tempMin} />
        </View>



        {isCityInputOpen && (
          <View
            style={{
              position: "absolute",
              top: 250,
              alignSelf: "center",
              width: "85%",
              zIndex: 5000,
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextInput
              ref={cityInputRef}
              value={cityDraft}
              onChangeText={setCityDraft}
              placeholder="Escribe una ciudad…"
              placeholderTextColor={ctx.getSecondaryText()}
              style={{
                flex: 1,
                backgroundColor: ctx.getCardBg(),
                color: "white",
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 14,
                borderWidth: 1,
                borderColor: ctx.getSeparator(),
              }}
              returnKeyType="search"
              autoCorrect={false}
              autoCapitalize="words"
              onSubmitEditing={() => {
                const cleaned = cityDraft.trim();
                if (!cleaned) return;

                setCity(cleaned);
                setIsCityInputOpen(false);
                Keyboard.dismiss();
              }}
            />
            
            {/* BOTÓN CANCELAR */}
            <Pressable
              onPress={() => {
                setIsCityInputOpen(false);
                setCityDraft(city);
                Keyboard.dismiss();
              }}
              style={{
                paddingHorizontal: 12,
              }}
            >
              <Text
                style={{
                  color: ctx.getSecondaryText(),
                  fontWeight: "500",
                }}
              >
                Cancelar
              </Text>
            </Pressable>
          </View>
        )}

        {/* Hourly Forecast View */}
        <View style={{
          marginTop: 60,
          backgroundColor: ctx.getCardBg(),
          padding: 10,
          borderRadius: 16,
          width: "90%",
          maxWidth: CONTENT_MAX_WIDTH,
        }}>

          <View style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "flex-start",
            gap: 10,
            marginTop: 5,
            width: "100%",
            paddingHorizontal: 10,
            paddingBottom: 5,
            borderBottomWidth: 0.3,
            borderBottomColor: ctx.getSeparator(),
          }}>
            <Image
              source={
                ctx.isModoOscuro
                  ? require("../assets/ClimaImages/icons/24hr/clock-three-dark.png")
                  : require("../assets/ClimaImages/icons/24hr/clock-three-light.png")
              }
              style={{ width: 16, height: 16 }}
              resizeMode="contain"
            />
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: ctx.getSecondaryText(),
                marginBottom: 10,
              }}>
              PRONÓSTICO POR HORA
            </Text>
          </View>
          <HourlyForecast items={hourly} />
        </View>

        <View
          style={{
            flex: 1,
            marginTop: 10,
            backgroundColor: ctx.getCardBg(),
            paddingVertical: 15,
            borderRadius: 16,
            width: "90%",
            overflow: "hidden",
            paddingHorizontal: 10,
            maxWidth: CONTENT_MAX_WIDTH,
          }}
        >
          <View
            style={{
              paddingHorizontal: 10,
              paddingTop: 1,
              paddingBottom: 50,
            }}>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                alignSelf: "center",
                justifyContent: "flex-start",
                width: "100%",
                gap: 10,
                paddingBottom: 10,
                borderBottomWidth: 0.3,
                borderBottomColor: ctx.getSeparator(),
              }}
            >
              <Image
                source={
                  ctx.isModoOscuro
                    ? require("../assets/ClimaImages/icons/calendar/calendar-night.png")
                    : require("../assets/ClimaImages/icons/calendar/calendar-day.png")
                }
                style={{ width: 16, height: 16 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: ctx.getSecondaryText(),
                }}
              >
                PRONÓSTICO PARA 10 DÍAS
              </Text>
            </View>
            <DailyForecast items={daily} />
          </View>
        </View>
      </View>


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
            onPress={() => router.push("/About")}
            hitSlop={0}
            style={{
              padding: 10,
              width: 72,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../assets/ClimaImages/icons/info/info.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            onPress={() => {
              setCityDraft('');
              setIsCityInputOpen((v) => {
                const next = !v;
                if (next) {
                  setTimeout(() => cityInputRef.current?.focus(), 50);
                } else {
                  Keyboard.dismiss();
                }
                return next;
              });
            }}
            hitSlop={0}
            style={{
              padding: 10,
              width: 72,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Image
              source={require("../assets/ClimaImages/icons/location/world.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable
            onPress={ctx.toggleModo}
            hitSlop={0}
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
    </ImageBackground >

  );
}
