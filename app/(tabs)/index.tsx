import React from 'react';
import { ScrollView, YStack, XStack, Text, Button } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  HeroBanner,
  PulseSearchBar,
  EventCard,
  MatchSection,
  FanZoneSection,
  TransitTicker,
  SectionHeader,
  WayFinderBanner,
} from '../../src/components';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderRow />
        <YStack
          paddingHorizontal={24}
          gap={28}
          paddingBottom={32}
          $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%' }}
        >
          <HeroBanner
            tag="Guadalajara 2026"
            title="Vive la Pasión\nen Zapopan"
            subtitle="El epicentro del fútbol mundial se traslada a la ciudad de las niñas y los niños."
          />
          <PulseSearchBar onSearch={(q) => {}} onFocus={() => router.push('/(app)/routes')} />
          <WayFinderBanner />
          <BentoSection />
          <EventsSection />
          <TransitTicker />
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

function BentoSection() {
  return (
    <YStack gap={16}>
      <MapCard />
      <DigitalPassCard />
    </YStack>
  );
}

function EventsSection() {
  return (
    <YStack gap={20}>
      <SectionHeader
        title="Eventos Próximos"
        subtitle="Sigue el calendario de la Copa del Mundo"
        actionLabel="Ver todo"
        onAction={() => {}}
      />
      <YStack
        gap={16}
        $gtSm={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        <YStack $gtSm={{ flex: 1, minWidth: 280 }}>
          <EventCard
            title="México vs Sudáfrica"
            location="Estadio Akron, Zapopan"
            schedule="18:00 hrs | 14 Junio"
            buttonText="Como llegar"
            buttonColor="$secondary"
            leftSection={
              <MatchSection
                teamAFlag="🇲🇽"
                teamBFlag="🇿🇦"
                backgroundColor="$primaryContainer"
                badgeText="En Vivo"
                badgeColor="$secondary"
              />
            }
            onButtonPress={() => {}}
          />
        </YStack>
        <YStack $gtSm={{ flex: 1, minWidth: 280 }}>
          <EventCard
            title="FIFA Fan Festival"
            location="Parque de las Niñas y Niños, Zapopan"
            schedule="Entrada Gratuita"
            buttonText="Ver Cartelera"
            buttonColor="$primary"
            leftSection={
              <FanZoneSection
                icon="music-note"
                label="Fan Zone"
                backgroundColor="$secondaryContainer"
              />
            }
            onButtonPress={() => {}}
          />
        </YStack>
      </YStack>
    </YStack>
  );
}

function HeaderRow() {
  return (
    <XStack
      paddingHorizontal={24}
      paddingVertical={12}
      justifyContent="space-between"
      alignItems="center"
      $gtMd={{ paddingHorizontal: 0, maxWidth: 960, alignSelf: 'center', width: '100%' }}
    >
      <XStack gap={12} alignItems="center">
        <XStack
          width={38}
          height={38}
          borderRadius={12}
          backgroundColor="rgba(255,107,0,0.1)"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialIcons name="directions-bus" size={20} color="#FF6B00" />
        </XStack>
        <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color" letterSpacing={-0.3}>
          Zapopan Move
        </Text>
      </XStack>
      <XStack gap={4}>
        {['translate', 'accessibility-new'].map((icon) => (
          <XStack
            key={icon}
            minWidth={44}
            minHeight={44}
            borderRadius={12}
            justifyContent="center"
            alignItems="center"
            hoverStyle={{ backgroundColor: '$surface' }}
            pressStyle={{ backgroundColor: '$surface' }}
          >
            <MaterialIcons name={icon as any} size={20} color="#5A5C5E" />
          </XStack>
        ))}
      </XStack>
    </XStack>
  );
}

function MapCard() {
  return (
    <YStack
      height={220}
      borderRadius={20}
      overflow="hidden"
      $gtSm={{ height: 260 }}
    >
      <LinearGradient
        start={[0.2, 0]}
        end={[0.8, 1]}
        colors={['#E8E0F0', '#D6CCE0', '#C4B8D4']}
        style={{ position: 'absolute', inset: 0 }}
      />
      <YStack position="absolute" inset={0} justifyContent="center" alignItems="center" opacity={0.3}>
        <MaterialIcons name="map" size={80} color="#6200EE" />
      </YStack>
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        colors={['transparent', 'rgba(0,0,0,0.55)']}
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 120 }}
      />
      <YStack position="absolute" bottom={18} left={20} gap={4} zIndex={2}>
        <Text fontFamily="$heading" fontSize={20} fontWeight="700" color="white" lineHeight={24}>
          Rutas Mundialistas
        </Text>
        <Text color="rgba(255,255,255,0.8)" fontSize={13} lineHeight={18} numberOfLines={2}>
          Ver transporte público en tiempo real
        </Text>
      </YStack>
      <XStack
        position="absolute"
        top={16}
        right={16}
        backgroundColor="rgba(255,255,255,0.85)"
        paddingHorizontal={12}
        paddingVertical={6}
        borderRadius={12}
        gap={6}
        alignItems="center"
        borderWidth={1}
        borderColor="rgba(255,255,255,0.3)"
      >
        <YStack width={6} height={6} borderRadius={3} backgroundColor="#026948" />
        <Text fontSize={10} fontWeight="800" color="#026948" textTransform="uppercase" letterSpacing={1.5}>
          Servicio Normal
        </Text>
      </XStack>
    </YStack>
  );
}

function DigitalPassCard() {
  return (
    <XStack
      minHeight={160}
      borderRadius={20}
      overflow="hidden"
      backgroundColor="#A5FACF"
      padding="$5"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      $gtSm={{ minHeight: 170, padding: '$6' }}
    >
      <YStack position="absolute" top={-20} right={-20} opacity={0.08}>
        <MaterialIcons name="qr-code-2" size={140} color="#026948" />
      </YStack>
      <YStack flex={1} justifyContent="space-between" height="100%" zIndex={1} gap={12}>
        <YStack gap={12}>
          <XStack
            width={44}
            height={44}
            borderRadius={14}
            backgroundColor="rgba(2,105,72,0.12)"
            justifyContent="center"
            alignItems="center"
          >
            <MaterialIcons name="qr-code-2" size={24} color="#026948" />
          </XStack>
          <YStack gap={2}>
            <Text fontFamily="$heading" fontSize={24} fontWeight="800" color="#026948" lineHeight={28} letterSpacing={-0.5}>
              Mi Pase Digital
            </Text>
            <Text color="rgba(2,105,72,0.7)" fontSize={13} lineHeight={18} maxWidth={220}>
              Accede a tren ligero y macrobús con un solo toque.
            </Text>
          </YStack>
        </YStack>
      </YStack>
      <Button
        backgroundColor="#026948"
        borderRadius={14}
        height={44}
        paddingHorizontal={20}
        onPress={() => {}}
        pressStyle={{ opacity: 0.85, scale: 0.97 }}
        zIndex={1}
        flexShrink={0}
      >
        <Text color="#A5FACF" fontWeight="800" fontSize={12} textTransform="uppercase" letterSpacing={1}>
          Abrir Wallet
        </Text>
      </Button>
    </XStack>
  );
}
