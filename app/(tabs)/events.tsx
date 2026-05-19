import React, { useState } from 'react';
import { ScrollView, YStack, XStack, Text } from 'tamagui';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {
  FeaturedEventHero,
  CategorySelector,
  BentoEventCard,
} from '../../src/components';

export default function EventsScreen() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderRow />
        <YStack
          paddingHorizontal="$5"
          gap="$6"
          paddingBottom="$8"
          $gtSm={{ paddingHorizontal: "$6" }}
          $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%', gap: "$8" }}
          $gtLg={{ paddingHorizontal: "$8" }}
        >
          <FeaturedEventHero onPlanRoute={() => {}} />

          <CategorySelector active={activeCategory} onChange={setActiveCategory} />

          <YStack gap="$5">
            <XStack justifyContent="space-between" alignItems="center" paddingHorizontal={2}>
              <Text
                fontFamily="$heading"
                fontSize={20}
                fontWeight="800"
                color="$color"
                letterSpacing={0.5}
                lineHeight={26}
              >
                Próximos Eventos
              </Text>
              <Text
                fontSize={13}
                fontWeight="700"
                color="$primary"
                cursor="pointer"
                pressStyle={{ opacity: 0.6 }}
              >
                Ver calendario
              </Text>
            </XStack>

            <YStack gap="$5" $gtSm={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <YStack $gtSm={{ flex: 1, minWidth: 280 }}>
                <BentoEventCard
                  variant="match"
                  title="Alemania vs Australia"
                  location="Estadio Akron"
                  dateLabel="18 JUN • 18:00"
                  phaseLabel="Fase de Grupos"
                  onPrimaryAction={() => {}}
                  onSecondaryAction={() => {}}
                />
              </YStack>
              <YStack $gtSm={{ flex: 1, minWidth: 280 }}>
                <BentoEventCard
                  variant="fanzone"
                  title="FIFA Fan Festival™ - Plaza Liberación"
                  location="Centro Histórico"
                  priceLabel="Entrada Gratuita • Todo el día"
                  onPrimaryAction={() => {}}
                />
              </YStack>
              <YStack $gtSm={{ flex: 1, minWidth: 280 }}>
                <BentoEventCard
                  variant="cultural"
                  title="Zapopan: Arte y Deporte"
                  subtitle="Exhibición Cultural"
                  description="Una mirada profunda a la conexión entre el arte huichol y la pasión futbolística de la región. Galería abierta al público."
                  onPrimaryAction={() => {}}
                />
              </YStack>
              <YStack $gtSm={{ flex: 1, minWidth: 280 }}>
                <BentoEventCard
                  variant="match"
                  title="USA vs Brasil"
                  location="Estadio Akron"
                  dateLabel="20 JUN • 20:30"
                  phaseLabel="Fase de Grupos"
                  primaryActionLabel="Ruta"
                  secondaryActionLabel="Tickets"
                  onPrimaryAction={() => {}}
                  onSecondaryAction={() => {}}
                />
              </YStack>
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}

function HeaderRow() {
  return (
    <XStack
      paddingHorizontal="$5"
      paddingVertical="$3"
      alignItems="center"
      justifyContent="space-between"
      $gtSm={{ paddingHorizontal: "$6" }}
      $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%', paddingHorizontal: 0 }}
      $gtLg={{ paddingHorizontal: 0 }}
    >
      <XStack gap="$3" alignItems="center">
        <XStack
          width={40}
          height={40}
          borderRadius="$4"
          backgroundColor="$primaryLight"
          justifyContent="center"
          alignItems="center"
        >
          <MaterialIcons name="sports-soccer" size={22} color="$primary" />
        </XStack>
        <YStack gap={1}>
          <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color" letterSpacing={0.3} lineHeight={22}>
            Zapopan Move
          </Text>
          <Text fontSize={11} fontWeight="600" color="$colorHover" letterSpacing={0.8} textTransform="uppercase">
            Eventos Mundialistas
          </Text>
        </YStack>
      </XStack>
      <XStack
        width={42}
        height={42}
        borderRadius="$5"
        borderWidth={2}
        borderColor="$primaryContainer"
        overflow="hidden"
        justifyContent="center"
        alignItems="center"
        backgroundColor="$surfaceLowest"
        pressStyle={{ opacity: 0.7, scale: 0.95 }}
        cursor="pointer"
      >
        <MaterialIcons name="person" size={22} color="$colorHover" />
      </XStack>
    </XStack>
  );
}
