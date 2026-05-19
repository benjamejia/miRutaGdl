import React from 'react';
import { ScrollView, YStack, XStack, Text } from 'tamagui';
import { ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ContextRouteHeader } from './ContextRouteHeader';
import { AlternativeRouteCard } from './AlternativeRouteCard';
import { PulseSearchBar } from './PulseSearchBar';
import { WorldCupPromoCard } from '../events/WorldCupPromoCard';
import { InteractiveMapContainer } from '../map/InteractiveMapContainer';
import { markers, zoneMarkers, getActiveRoute, routeLineColors } from '../../lib/routes-data';
import { useRouteAlternatives } from '../../hooks/useRouteAlternatives';

export function RouteMapView() {
  const { alternatives, routeDetails, selectedLineName, selectedDuration, selectedStatus, loading, error, selectRoute } = useRouteAlternatives();

  const activeRouteGeo = getActiveRoute(selectedLineName);

  const arrivalTime = new Date(Date.now() + selectedDuration * 60000);
  const arrivalLabel = `Llegada ${arrivalTime.getHours()}:${String(arrivalTime.getMinutes()).padStart(2, '0')}`;

  return (
    <ScrollView flex={1} showsVerticalScrollIndicator={false} backgroundColor="#F6F6F9">
      <YStack paddingHorizontal="$5" paddingTop="$2">
        <PulseSearchBar onSearch={(q) => {}} />
      </YStack>
      <ContextRouteHeader />
      <InteractiveMapContainer
        height={300}
        routeGeoJSON={activeRouteGeo.geojson}
        originGeoJSON={markers.origin}
        destinationGeoJSON={markers.destination}
        zonesGeoJSON={zoneMarkers}
        routeSummary={{
          line: selectedLineName,
          duration: String(selectedDuration),
          status: selectedStatus === 'delayed' ? 'Con retraso' : 'A tiempo',
          statusColor: selectedStatus === 'delayed' ? '#B02500' : '#026948',
          arrival: arrivalLabel,
        }}
        routeColor={routeLineColors[activeRouteGeo.line]}
      />
      <YStack
        backgroundColor="$surfaceLowest"
        borderTopLeftRadius={24}
        borderTopRightRadius={24}
        marginTop={-20}
        zIndex={10}
        paddingTop="$5"
        paddingHorizontal="$5"
        paddingBottom="$8"
        $gtMd={{ paddingHorizontal: "$6" }}
      >
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color" letterSpacing={0.4}>
            Mejores alternativas
          </Text>
          <XStack
            paddingHorizontal="$4"
            height={36}
            borderRadius="$10"
            backgroundColor="$surface"
            justifyContent="center"
            alignItems="center"
            gap={4}
            cursor="pointer"
            pressStyle={{ opacity: 0.75 }}
          >
            <MaterialIcons name="tune" size={16} color="$colorHover" />
            <Text fontSize={11} fontWeight="700" color="$colorHover" textTransform="uppercase" letterSpacing={0.5}>
              Filtros
            </Text>
          </XStack>
        </XStack>

        {loading ? (
          <YStack justifyContent="center" alignItems="center" padding="$8">
            <ActivityIndicator size="large" color="#6200EE" />
          </YStack>
        ) : error ? (
          <YStack justifyContent="center" alignItems="center" padding="$8" gap="$3">
            <MaterialIcons name="error-outline" size={48} color="$error" opacity={0.6} />
            <Text fontSize={14} color="$error" textAlign="center">{error}</Text>
          </YStack>
        ) : (
          <YStack gap={16}>
            {alternatives.map((route) => {
              const detail = routeDetails[route.id];
              const isSelected = detail && detail.lineName === selectedLineName;
              return (
                <AlternativeRouteCard
                  key={route.id}
                  route={route}
                  selected={isSelected}
                  onPress={detail ? () => selectRoute(detail.lineName, detail.duration, detail.status) : undefined}
                />
              );
            })}
            <WorldCupPromoCard />
          </YStack>
        )}
      </YStack>
    </ScrollView>
  );
}
