import React, { useState, useMemo, useRef } from 'react';
import { ScrollView, YStack, XStack, Text, useTheme } from 'tamagui';
import { ActivityIndicator, NativeScrollEvent, NativeSyntheticEvent, useWindowDimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ContextRouteHeader } from './ContextRouteHeader';
import { AlternativeRouteCard } from './AlternativeRouteCard';
import { PulseSearchBar } from './PulseSearchBar';
import { InteractiveMapContainer } from '../map/InteractiveMapContainer';
import { markers, zoneMarkers, getActiveRoute, routeLineColors } from '../../lib/routes-data';
import { useRouteAlternatives } from '../../hooks/useRouteAlternatives';

export function RouteMapView() {
  const { alternatives, routeDetails, selectedLineName, selectedDuration, selectedStatus, loading, error, selectRoute } = useRouteAlternatives();
  const [searchQuery, setSearchQuery] = useState('');
  const [routesExpanded, setRoutesExpanded] = useState(true);
  const theme = useTheme();
  const { height: winH } = useWindowDimensions();
  const hasScrolledRef = useRef(false);

  const activeRouteGeo = getActiveRoute(selectedLineName);

  const arrivalTime = new Date(Date.now() + selectedDuration * 60000);
  const arrivalLabel = `Llegada ${arrivalTime.getHours()}:${String(arrivalTime.getMinutes()).padStart(2, '0')}`;

  const filteredAlternatives = useMemo(() => {
    if (!searchQuery.trim()) return alternatives;
    const q = searchQuery.toLowerCase();
    return alternatives.filter((route) => {
      const hasMatch = route.segments.some(
        (s) => s.line && s.line.toLowerCase().includes(q)
      );
      const durationMatch = String(route.duration).includes(q);
      return hasMatch || durationMatch;
    });
  }, [alternatives, searchQuery]);

  const altSectionMaxHeight = Math.min(380, winH * 0.4);

  const handleAltScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y > 20) {
      hasScrolledRef.current = true;
    }
  };

  const handleAltScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (e.nativeEvent.contentOffset.y <= 0 && hasScrolledRef.current && routesExpanded) {
      setRoutesExpanded(false);
      hasScrolledRef.current = false;
    }
  };

  return (
    <YStack flex={1} backgroundColor="$background">
      <YStack paddingHorizontal="$5" paddingTop="$4" gap="$3">
        <PulseSearchBar
          onSearch={(q) => setSearchQuery(q)}
          onChangeText={(t) => setSearchQuery(t)}
        />
        <ContextRouteHeader />
      </YStack>

      <YStack flex={1} minHeight={180}>
        <InteractiveMapContainer
          flex
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
      </YStack>

      {routesExpanded ? (
        <YStack
          backgroundColor="$surfaceLowest"
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          marginTop={-20}
          zIndex={10}
          maxHeight={altSectionMaxHeight}
          paddingTop="$5"
          paddingHorizontal="$5"
          paddingBottom="$8"
          $gtMd={{ paddingHorizontal: '$6' }}
        >
          <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
            <XStack gap={8} alignItems="center" flex={1}>
              <Text fontFamily="$heading" fontSize={18} fontWeight="800" color="$color" letterSpacing={0.4} numberOfLines={1}>
                {searchQuery.trim() ? `Resultados (${filteredAlternatives.length})` : 'Mejores alternativas'}
              </Text>
            </XStack>
            <XStack gap={8} alignItems="center">
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
                onPress={() => setRoutesExpanded(false)}
              >
                <MaterialIcons name="visibility-off" size={16} color="$colorHover" />
                <Text fontSize={11} fontWeight="700" color="$colorHover" textTransform="uppercase" letterSpacing={0.5}>
                  Ocultar
                </Text>
              </XStack>
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
          </XStack>

          <ScrollView
            style={{ flex: 1 }}
            showsVerticalScrollIndicator
            nestedScrollEnabled
            onScroll={handleAltScroll}
            onScrollEndDrag={handleAltScrollEndDrag}
            scrollEventThrottle={16}
          >
            {loading ? (
              <YStack justifyContent="center" alignItems="center" padding="$8">
                <ActivityIndicator size="large" color={theme.secondary?.val ?? '#6200EE'} />
              </YStack>
            ) : error ? (
              <YStack justifyContent="center" alignItems="center" padding="$8" gap="$3">
                <MaterialIcons name="error-outline" size={48} color="$error" opacity={0.6} />
                <Text fontSize={14} color="$error" textAlign="center">{error}</Text>
              </YStack>
            ) : filteredAlternatives.length === 0 ? (
              <YStack justifyContent="center" alignItems="center" padding="$8" gap="$3">
                <MaterialIcons name="search-off" size={40} color="$colorHover" opacity={0.5} />
                <Text fontSize={14} color="$colorHover" textAlign="center">
                  {searchQuery.trim() ? `Sin resultados para "${searchQuery}"` : 'No hay rutas disponibles'}
                </Text>
              </YStack>
            ) : (
              <YStack gap={16} paddingBottom="$4">
                {filteredAlternatives.map((route) => {
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
              </YStack>
            )}
          </ScrollView>
        </YStack>
      ) : (
        <YStack
          backgroundColor="$surfaceLowest"
          borderTopLeftRadius={24}
          borderTopRightRadius={24}
          marginTop={-20}
          zIndex={10}
          paddingHorizontal="$5"
          paddingTop="$3"
          paddingBottom="$6"
        >
          <XStack
            height={40}
            backgroundColor="$surface"
            borderRadius={12}
            alignItems="center"
            justifyContent="center"
            gap={6}
            cursor="pointer"
            pressStyle={{ opacity: 0.8 }}
            onPress={() => setRoutesExpanded(true)}
          >
            <MaterialIcons name="keyboard-arrow-up" size={18} color="$colorHover" />
            <Text fontSize={13} fontWeight="600" color="$colorHover">
              {filteredAlternatives.length} ruta{filteredAlternatives.length !== 1 ? 's' : ''} disponible{filteredAlternatives.length !== 1 ? 's' : ''}
            </Text>
            <MaterialIcons name="keyboard-arrow-up" size={18} color="$colorHover" />
          </XStack>
        </YStack>
      )}
    </YStack>
  );
}
