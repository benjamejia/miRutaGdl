import { Link, Stack } from 'expo-router';
import { YStack, Text } from 'tamagui';
import { useTheme } from 'tamagui';

export default function NotFoundScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <YStack flex={1} alignItems="center" justifyContent="center" padding={20} backgroundColor="$background">
        <Text fontSize={20} fontWeight="bold" color="$color">Esta pantalla no existe.</Text>
        <Link href="/" style={{ marginTop: 15, paddingVertical: 15 }}>
          <Text fontSize={14} color="$secondary">¡Ir a la pantalla de inicio!</Text>
        </Link>
      </YStack>
    </>
  );
}
