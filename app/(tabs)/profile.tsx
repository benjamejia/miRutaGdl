import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, YStack, XStack, Text, Button, Switch, Image } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

function ProfileHeader() {
  return (
    <YStack alignItems="center">
      <YStack position="relative" marginBottom="$4" $gtMd={{ marginBottom: "$5" }}>
        <YStack
          width={100}
          height={100}
          borderRadius={50}
          $gtMd={{ width: 140, height: 140, borderRadius: 70 }}
          overflow="hidden"
          borderWidth={4}
          borderColor="$surfaceLowest"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}
        >
          <Image
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDa8TQvsEg09pv-TjXvWd8tzX2n7aFeDpHKEPz2TIyYjeNwr9Dt9TpFJymZ5tKYdtzxDmmSnhygINaJfh4De8vSLEFkFbCAuuZ5JYXp5qjOj7hU4_uaHfu2lY4bwckq6Top9yJQ_frblGUQnd2xo4oFU6ihIaw7fBPxlbikEnR27qFYytJtpTrXf8DF1bICxqtkTNjJ9HqVdkVq93qvSvMJhISCczSBIIFRXbDCXsCYErvZ3nYr1VdrrlXXr7fx0s_j1Z45s3FH9rlf',
            }}
            width={100}
            height={100}
            $gtMd={{ width: 140, height: 140 }}
          />
        </YStack>
        <XStack
          position="absolute"
          bottom={-2}
          right={-4}
          backgroundColor="$secondary"
          paddingHorizontal="$3"
          paddingVertical={3}
          borderRadius={999}
          alignItems="center"
          gap={3}
          $gtMd={{ bottom: 0, right: 0, paddingHorizontal: "$4", paddingVertical: 5, gap: 4 }}
          style={{
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          }}
        >
          <MaterialIcons name="verified" size={11} color="#FFFFFF" $gtMd={{ size: 14 }} />
          <Text
            fontSize={10}
            fontWeight="700"
            color="#FFFFFF"
            $gtMd={{ fontSize: 13 }}
          >
            Fan ID Verificado
          </Text>
        </XStack>
      </YStack>
      <Text
        fontFamily="$heading"
        fontSize={26}
        fontWeight="900"
        letterSpacing={-0.5}
        color="$color"
        marginBottom={2}
        $gtSm={{ fontSize: 30 }}
        $gtMd={{ fontSize: 34, marginBottom: 4 }}
      >
        Alex Rivera
      </Text>
      <Text
        color="$colorHover"
        fontWeight="500"
        fontSize={13}
        $gtMd={{ fontSize: 15 }}
      >
        Fan N° 48.291 • Zapopan, MX
      </Text>
    </YStack>
  );
}

function FanIdBentoCard() {
  const qrPattern = [
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 0, 1, 1],
  ];

  return (
    <YStack
      position="relative"
      overflow="hidden"
      borderRadius="$6"
      padding="$6"
      $gtSm={{ borderRadius: "$8", padding: "$8" }}
      minHeight={200}
      $gtMd={{ minHeight: 220 }}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        elevation: 10,
      }}
    >
      <LinearGradient
        colors={['#9c3f00', '#ff7a2f']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <LinearGradient
        colors={['rgba(98,0,238,0.4)', 'transparent']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <YStack
        position="absolute"
        right={-40}
        bottom={-40}
        opacity={0.1}
        style={{ transform: [{ rotate: '12deg' }] }}
      >
        <MaterialIcons name="confirmation-number" size={160} color="#FFFFFF" $gtMd={{ size: 200 }} />
      </YStack>

      <YStack
        position="relative"
        zIndex={10}
        flexDirection="column"
        $gtMd={{ flexDirection: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap="$6"
      >
        <YStack flex={1} width="100%" gap="$2">
          <Text
            fontSize={10}
            fontWeight="700"
            letterSpacing={2.8}
            textTransform="uppercase"
            opacity={0.8}
            color="#FFFFFF"
            $gtSm={{ fontSize: 11, letterSpacing: 3 }}
            $gtMd={{ fontSize: 12, letterSpacing: 3.2 }}
          >
            Fan ID Mundialista 2026
          </Text>
          <Text
            fontFamily="$heading"
            fontSize={20}
            fontWeight="900"
            letterSpacing={0.5}
            lineHeight={28}
            color="#FFFFFF"
            $gtSm={{ fontSize: 22, lineHeight: 30 }}
            $gtMd={{ fontSize: 26, lineHeight: 36 }}
          >
            Guadalajara Host City
          </Text>
          <XStack gap="$4" paddingTop="$4" flexWrap="wrap">
            <XStack
              backgroundColor="rgba(255,255,255,0.2)"
              paddingHorizontal="$4"
              paddingVertical="$2"
              borderRadius="$4"
            >
              <Text fontWeight="700" fontSize={12} color="#FFFFFF" $gtMd={{ fontSize: 14 }}>
                Estadio Akron
              </Text>
            </XStack>
            <XStack
              backgroundColor="rgba(255,255,255,0.2)"
              paddingHorizontal="$4"
              paddingVertical="$2"
              borderRadius="$4"
            >
              <Text fontWeight="700" fontSize={12} color="#FFFFFF" $gtMd={{ fontSize: 14 }}>
                VIP Access
              </Text>
            </XStack>
          </XStack>
        </YStack>

        <YStack backgroundColor="#FFFFFF" padding="$3" borderRadius="$5" alignSelf="center" $gtMd={{ padding: "$4" }}>
          <YStack
            width={80}
            height={80}
            $gtSm={{ width: 100, height: 100 }}
            $gtMd={{ width: 140, height: 140 }}
            backgroundColor="#F1F5F9"
            alignItems="center"
            justifyContent="center"
            position="relative"
          >
            <YStack gap={1.5} width="100%" height="100%" padding={6} $gtMd={{ gap: 2, padding: "$2" }}>
              {qrPattern.map((row, i) => (
                <XStack key={i} gap={1.5} flex={1} $gtMd={{ gap: 2 }}>
                  {row.map((cell, j) => (
                    <YStack
                      key={j}
                      flex={1}
                      backgroundColor={cell ? '$color' : 'transparent'}
                      borderRadius={1.5}
                      $gtMd={{ borderRadius: 2 }}
                    />
                  ))}
                </XStack>
              ))}
            </YStack>
            <YStack position="absolute" alignItems="center" justifyContent="center">
              <MaterialIcons name="qr-code" size={24} color="#6200EE" $gtSm={{ size: 32 }} $gtMd={{ size: 40 }} />
            </YStack>
          </YStack>
        </YStack>
      </YStack>
    </YStack>
  );
}

interface AccessibilityToggleRowProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

function AccessibilityToggleRow({
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
  value,
  onValueChange,
}: AccessibilityToggleRowProps) {
  return (
    <YStack
      backgroundColor="$surfaceLowest"
      padding="$5"
      borderRadius="$6"
      minHeight={52}
      $gtMd={{ padding: "$6", minHeight: 56 }}
      borderWidth={2}
      borderColor={value ? '$primary' : 'transparent'}
      style={
        value
          ? {
              shadowColor: '#FF6B00',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 6,
            }
          : {}
      }
    >
      <XStack alignItems="center" justifyContent="space-between" gap="$4">
        <XStack gap="$4" flex={1} alignItems="flex-start" flexShrink={1}>
          <YStack backgroundColor={iconBgColor} padding="$3" borderRadius={999}>
            <MaterialIcons name={icon as any} size={22} color={iconColor} $gtMd={{ size: 24 }} />
          </YStack>
          <YStack flex={1} minWidth={0}>
            <Text fontWeight="700" color="$color" textAlign="left" fontSize={15} $gtMd={{ fontSize: 16 }}>
              {title}
            </Text>
            <Text fontSize={13} color="$colorHover" textAlign="left" $gtMd={{ fontSize: 14 }}>
              {description}
            </Text>
          </YStack>
        </XStack>
        <Switch checked={value} onCheckedChange={onValueChange} backgroundColor="$surfaceHigh" flexShrink={0}>
          <Switch.Thumb />
        </Switch>
      </XStack>
    </YStack>
  );
}

interface SettingNavigationButtonProps {
  icon: string;
  title: string;
  value?: string;
  onPress?: () => void;
}

function SettingNavigationButton({
  icon,
  title,
  value,
  onPress,
}: SettingNavigationButtonProps) {
  return (
    <Button
      unstyled
      width="100%"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      padding="$5"
      minHeight={52}
      $gtMd={{ padding: "$6", minHeight: 56 }}
      backgroundColor="transparent"
      onPress={onPress}
      cursor="pointer"
      pressStyle={{ backgroundColor: '$surface' }}
    >
      <XStack gap="$4" alignItems="center" flexShrink={1} minWidth={0}>
        <MaterialIcons name={icon as any} size={22} color="$colorHover" $gtMd={{ size: 24 }} />
        <Text fontWeight="500" color="$color" fontSize={15} $gtMd={{ fontSize: 16 }}>
          {title}
        </Text>
      </XStack>
      <XStack gap="$2" alignItems="center" flexShrink={0}>
        {value && (
          <Text fontSize={13} fontWeight="700" color="$primary" numberOfLines={1} $gtMd={{ fontSize: 14 }}>
            {value}
          </Text>
        )}
        <MaterialIcons name="chevron-right" size={22} color="$outlineVariant" $gtMd={{ size: 24 }} />
      </XStack>
    </Button>
  );
}

export default function ProfileScreen() {
  const [rutasAccesibles, setRutasAccesibles] = useState(true);
  const [asistenciaVisual, setAsistenciaVisual] = useState(false);
  const [guiaPorVoz, setGuiaPorVoz] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6F9' }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <YStack
          paddingHorizontal="$5"
          gap="$10"
          paddingBottom="$8"
          $gtSm={{ paddingHorizontal: "$6" }}
          $gtMd={{ maxWidth: 960, alignSelf: 'center', width: '100%', gap: "$11" }}
          $gtLg={{ paddingHorizontal: "$8" }}
        >
          <ProfileHeader />

          <FanIdBentoCard />

          <YStack gap="$6">
            <XStack gap="$2" alignItems="center">
              <MaterialIcons name="accessible" size={22} color="$secondary" $gtMd={{ size: 24 }} />
              <Text
                fontFamily="$heading"
                fontSize={18}
                fontWeight="700"
                color="$color"
                letterSpacing={0.6}
                lineHeight={24}
                $gtMd={{ fontSize: 21, lineHeight: 28 }}
              >
                Accesibilidad
              </Text>
            </XStack>
            <YStack gap="$4">
              <AccessibilityToggleRow
                icon="accessible"
                iconBgColor="rgba(2,105,72,0.1)"
                iconColor="#026948"
                title="Rutas Accesibles"
                description="Prioriza elevadores y rampas"
                value={rutasAccesibles}
                onValueChange={setRutasAccesibles}
              />
              <AccessibilityToggleRow
                icon="visibility"
                iconBgColor="rgba(98,0,238,0.1)"
                iconColor="#6200EE"
                title="Asistencia Visual"
                description="Alto contraste y texto grande"
                value={asistenciaVisual}
                onValueChange={setAsistenciaVisual}
              />
              <AccessibilityToggleRow
                icon="record-voice-over"
                iconBgColor="rgba(255,107,0,0.1)"
                iconColor="#FF6B00"
                title="Guía por Voz"
                description="Indicaciones de voz por parada"
                value={guiaPorVoz}
                onValueChange={setGuiaPorVoz}
              />
            </YStack>
          </YStack>

          <YStack gap="$6">
            <XStack gap="$2" alignItems="center">
              <MaterialIcons name="settings" size={22} color="$secondary" $gtMd={{ size: 24 }} />
              <Text
                fontFamily="$heading"
                fontSize={18}
                fontWeight="700"
                color="$color"
                letterSpacing={0.6}
                lineHeight={24}
                $gtMd={{ fontSize: 21, lineHeight: 28 }}
              >
                Ajustes de Cuenta
              </Text>
            </XStack>
            <YStack
              backgroundColor="$surfaceLowest"
              borderRadius="$7"
              overflow="hidden"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 8,
                elevation: 2,
              }}
            >
              <SettingNavigationButton icon="notifications" title="Notificaciones" />
              <YStack height={1} backgroundColor="rgba(172,173,175,0.1)" />
              <SettingNavigationButton icon="language" title="Idioma" value="Español" />
              <YStack height={1} backgroundColor="rgba(172,173,175,0.1)" />
              <SettingNavigationButton icon="lock" title="Privacidad" />
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
