import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pantalla Modal</Text>
      <View style={styles.separator} />
      
      <Text style={styles.text}>
        Este es un modal universal y limpio listo para tu MVP. 
        Próximamente cambiaremos estos componentes por elementos de Tamagui.
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});