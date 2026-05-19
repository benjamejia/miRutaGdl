import { useRouter } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, YStack, useThemeName } from "tamagui";
import {
  FanFestBanner,
  HeroBanner,
  MatchesBanner,
  PulseSearchBar,
  WayFinderBanner,
} from "../../src/components";

const bg = { light: "#F6F6F9", dark: "#0C0E10" };
const surface = { light: "#e7e7e7", dark: "#1A1C1E" };

export default function HomeScreen() {
  const router = useRouter();
  const themeName = useThemeName();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg[themeName as keyof typeof bg] ?? "#F6F6F9" }}>
      <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack $gtMd={{ maxWidth: 960, alignSelf: "center", width: "100%" }}>
          <YStack
            backgroundColor={surface[themeName as keyof typeof surface] ?? '#e7e7e7'}
            paddingHorizontal={24}
            paddingTop={20}
            paddingBottom={32}
            gap={48}
          >
            <HeroBanner
              tag="Guadalajara 2026"
              title="Vive la Pasión en Zapopan"
              subtitle="El epicentro del fútbol mundial se traslada a la ciudad de las niñas y los niños."
            />

            <PulseSearchBar
              onSearch={() => {}}
              onFocus={() => router.push("/(app)/routes")}
            />
            <FanFestBanner onPress={() => router.push('/(tabs)/events')} />
            <WayFinderBanner />
            <MatchesBanner onPress={() => router.push('/(tabs)/events')} />
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
