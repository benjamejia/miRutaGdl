import React from 'react';
import { YStack, XStack, Text } from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';

interface HeroBannerProps {
  tag?: string;      // Por si quieres pasarle "FIFA World Cup"
  title: string;    // "GUADALAJARA"
  subtitle: string; // "Estadio Guadalajara - Zapopan Jal."
}

export function HeroBanner({ tag = "FIFA World Cup", title, subtitle }: HeroBannerProps) {
  return (
    <YStack
      height={160}
      borderRadius={24}
      overflow="hidden"
      backgroundColor="#1A1A1A" // El tono exacto de la tarjeta de la FIFA
      position="relative"
      justifyContent="center"
      paddingHorizontal={24}
      $gtSm={{ height: 180, paddingHorizontal: 32 }}
      $gtMd={{ height: 200 }}
    >
      {/* 1. NÚMERO "26" ENORME DIFUMINADO EN EL FONDO */}
      <Text
        position="absolute"
        right={60}
        bottom={-40}
        fontSize={180}
        fontWeight="900"
        color="#262626" // Un gris sutilmente más claro que el fondo negro
        opacity={0.7}
        zIndex={1}
        userSelect="none"
        $gtSm={{ fontSize: 220, right: 90 }}
      >
        26
      </Text>

      {/* 2. EL ARCO MUNDIALISTA OFICIAL (Derecha) */}
      <YStack
        position="absolute"
        right={24}
        bottom={16}
        width={45}
        height={90}
        borderTopLeftRadius={30}
        borderTopRightRadius={30}
        overflow="hidden"
        zIndex={2}
        $gtSm={{ right: 32, width: 50, height: 100, borderTopLeftRadius: 35, borderTopRightRadius: 35 }}
      >
        <LinearGradient
          start={[0, 0]}
          end={[0, 1]}
          colors={['#D29200', '#7A4B00']} // Degradado dorado/ocre del arco oficial
          style={{ flex: 1 }}
        />
      </YStack>

      {/* 3. CONTENIDO DE TEXTO (Izquierda) */}
      <YStack gap={2} zIndex={3} maxWidth="75%">
        {tag && (
          <Text
            fontSize={13}
            fontWeight="700"
            color="#A3A3A3" // Gris claro para el "FIFA World Cup"
            letterSpacing={0.2}
            $gtSm={{ fontSize: 15 }}
          >
            {tag}
          </Text>
        )}
        
        <Text
          fontFamily="$heading"
          fontSize={28}
          fontWeight="900"
          color="#FF6B00" // Tu "Momentum Orange" del Design System
          textTransform="uppercase"
          lineHeight={32}
          letterSpacing={-0.5}
          $gtSm={{ fontSize: 36, lineHeight: 40 }}
          $gtMd={{ fontSize: 42, lineHeight: 46 }}
        >
          {title}
        </Text>

        <Text
          color="#8E8E93" // Tipografía secundaria legible pero discreta
          fontSize={11}
          fontWeight="500"
          marginTop={4}
          $gtSm={{ fontSize: 13 }}
        >
          {subtitle}
        </Text>
      </YStack>
    </YStack>
  );
}