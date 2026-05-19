import React, { useEffect, useState } from "react";
import { StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, XStack, YStack, Text, useThemeName } from "tamagui";
import { MaterialIcons } from "@expo/vector-icons";
import { fetchMatches, fetchFanFestEvents } from "../../src/services/events";
import type { Match, FanFestEvent } from "../../src/types/events";

const bg = { light: "#F6F6F9", dark: "#0C0E10" };

function MatchBanner({ match }: { match: Match }) {
  return (
    <YStack borderRadius={24} overflow="hidden" backgroundColor="#FF7A30">
      <XStack padding="$5" gap="$4" alignItems="center" $gtSm={{ padding: '$6' }} width="100%">
        <YStack
          width={56} height={56} borderRadius={16}
          backgroundColor="rgba(255,255,255,0.15)"
          justifyContent="center" alignItems="center" flexShrink={0}
        >
          <XStack gap={-8} alignItems="center">
            <YStack width={32} height={32} borderRadius={16} backgroundColor="white" justifyContent="center" alignItems="center">
              <Text fontSize={16}>{match.teamA}</Text>
            </YStack>
            <YStack width={32} height={32} borderRadius={16} backgroundColor="white" justifyContent="center" alignItems="center">
              <Text fontSize={16}>{match.teamB}</Text>
            </YStack>
          </XStack>
        </YStack>

        <YStack flex={1} gap={6}>
          <XStack gap={8} alignItems="center">
            <YStack
              paddingHorizontal={10} paddingVertical={3}
              backgroundColor={match.isLive ? "#6200EE" : "rgba(255,255,255,0.2)"}
              borderRadius="$10"
            >
              <Text fontSize={10} fontWeight="800" color="#ffffff" textTransform="uppercase" letterSpacing={1.2}>
                {match.isLive ? "EN VIVO" : "PARTIDO"}
              </Text>
            </YStack>
          </XStack>

          <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="#ffffff" lineHeight={24} letterSpacing={-0.3}>
            {match.title}
          </Text>

          <YStack gap={4}>
            <XStack gap={6} alignItems="center">
              <MaterialIcons name="location-on" size={14} color="rgba(255,255,255,0.7)" />
              <Text fontSize={12} color="rgba(255,255,255,0.7)" fontWeight="500">{match.stadium}</Text>
            </XStack>
            <XStack gap={6} alignItems="center">
              <MaterialIcons name="access-time" size={14} color="rgba(255,255,255,0.7)" />
              <Text fontSize={12} color="rgba(255,255,255,0.7)" fontWeight="500">{match.timeLabel}</Text>
            </XStack>
          </YStack>

          <XStack gap={8} alignItems="center" marginTop={4}>
            <XStack
              backgroundColor="#EBE6FF" paddingHorizontal={16} paddingVertical={8}
              borderRadius={12} cursor="pointer" gap={6} alignItems="center"
            >
              <Text fontSize={12} fontWeight="800" color="#6200EE" textTransform="uppercase" letterSpacing={0.8}>
                Cómo llegar
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#6200EE" />
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}

function FanFestBannerCard({ event }: { event: FanFestEvent }) {
  return (
    <YStack borderRadius={24} overflow="hidden" backgroundColor="#E84393">
      <XStack padding="$5" gap="$4" alignItems="center" $gtSm={{ padding: '$6' }} width="100%">
        <YStack
          width={56} height={56} borderRadius={16}
          backgroundColor="rgba(255,255,255,0.15)"
          justifyContent="center" alignItems="center" flexShrink={0}
        >
          <MaterialIcons name="music-note" size={30} color="#ffffff" />
        </YStack>

        <YStack flex={1} gap={6}>
          <XStack gap={8} alignItems="center">
            <YStack paddingHorizontal={10} paddingVertical={3} backgroundColor="rgba(0,255,180,0.25)" borderRadius="$10">
              <Text fontSize={10} fontWeight="800" color="#00FFB4" textTransform="uppercase" letterSpacing={1.2}>
                FAN FEST
              </Text>
            </YStack>
          </XStack>

          <Text fontFamily="$heading" fontSize={20} fontWeight="800" color="#ffffff" lineHeight={24} letterSpacing={-0.3}>
            {event.title}
          </Text>

          <Text fontSize={13} color="rgba(255,255,255,0.8)" lineHeight={18}>
            {event.description}
          </Text>

          <YStack gap={4}>
            <XStack gap={6} alignItems="center">
              <MaterialIcons name="location-on" size={14} color="rgba(255,255,255,0.7)" />
              <Text fontSize={12} color="rgba(255,255,255,0.7)" fontWeight="500">{event.location}</Text>
            </XStack>
            <XStack gap={6} alignItems="center">
              <MaterialIcons name="access-time" size={14} color="rgba(255,255,255,0.7)" />
              <Text fontSize={12} color="rgba(255,255,255,0.7)" fontWeight="500">{event.dateLabel}</Text>
            </XStack>
          </YStack>

          <XStack gap={8} alignItems="center" marginTop={4}>
            <XStack
              backgroundColor="#00FFB4" paddingHorizontal={16} paddingVertical={8}
              borderRadius={12} cursor="pointer" gap={6} alignItems="center"
            >
              <Text fontSize={12} fontWeight="800" color="#1A1A2E" textTransform="uppercase" letterSpacing={0.8}>
                Ver cartelera
              </Text>
              <MaterialIcons name="arrow-forward" size={16} color="#1A1A2E" />
            </XStack>
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  );
}

export default function EventsScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [fanFest, setFanFest] = useState<FanFestEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const themeName = useThemeName();

  useEffect(() => {
    async function load() {
      try {
        const [m, f] = await Promise.all([
          fetchMatches(),
          fetchFanFestEvents(),
        ]);
        setMatches(m);
        setFanFest(f);
      } catch (e: any) {
        setError(e.message ?? "Error al cargar eventos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bg[themeName as keyof typeof bg] ?? "#F6F6F9" }}>
      <StatusBar barStyle={themeName === 'dark' ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack $gtMd={{ maxWidth: 960, alignSelf: "center", width: "100%" }}>
          <YStack backgroundColor="$background" paddingHorizontal={24} paddingTop={24} paddingBottom={32} gap={16}>
            <Text fontFamily="$heading" fontSize={28} fontWeight="800" color="$color" letterSpacing={-0.5}>
              Eventos
            </Text>

            {loading ? (
              <YStack paddingVertical={60} alignItems="center">
                <ActivityIndicator size="large" color="#6200EE" />
              </YStack>
            ) : error ? (
              <YStack paddingVertical={60} alignItems="center" gap={12}>
                <MaterialIcons name="error-outline" size={40} color="$colorHover" />
                <Text fontSize={14} color="$colorHover" textAlign="center">{error}</Text>
              </YStack>
            ) : (
              <>
                {matches.length > 0 && (
                  <YStack gap={12}>
                    <XStack gap={8} alignItems="center" paddingTop={8}>
                      <MaterialIcons name="sports-soccer" size={22} color="$secondary" />
                      <Text fontSize={18} fontWeight="700" color="$color" letterSpacing={-0.3}>
                        Partidos
                      </Text>
                    </XStack>
                    {matches.map((match) => (
                      <MatchBanner key={match.id} match={match} />
                    ))}
                  </YStack>
                )}

                {fanFest.length > 0 && (
                  <YStack gap={12} paddingTop={8}>
                    <XStack gap={8} alignItems="center">
                      <MaterialIcons name="music-note" size={22} color="#E84393" />
                      <Text fontSize={18} fontWeight="700" color="$color" letterSpacing={-0.3}>
                        FIFA Fan Festival
                      </Text>
                    </XStack>
                    {fanFest.map((event) => (
                      <FanFestBannerCard key={event.id} event={event} />
                    ))}
                  </YStack>
                )}
              </>
            )}
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
