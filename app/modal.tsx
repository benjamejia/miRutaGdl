import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { YStack, Text, useThemeName } from 'tamagui';

const bg = { light: '#F6F6F9', dark: '#0C0E10' };
const separator = { light: '#eee', dark: '#444648' };

export default function ModalScreen() {
  const themeName = useThemeName();

  return (
    <YStack flex={1} alignItems="center" justifyContent="center" padding={20} backgroundColor={bg[themeName as keyof typeof bg] ?? '#F6F6F9'}>
      <Text fontSize={20} fontWeight="bold" color="$color">Pantalla Modal</Text>
      <YStack marginVertical={30} height={1} width="80%" backgroundColor={separator[themeName as keyof typeof separator] ?? '#eee'} />
      <Text fontSize={16} textAlign="center" color="$colorHover" paddingHorizontal={20}>
        Este es un modal universal y limpio listo para tu MVP.
        Próximamente cambiaremos estos componentes por elementos de Tamagui.
      </Text>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </YStack>
  );
}
