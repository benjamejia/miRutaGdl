import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, useThemeName } from 'tamagui';

const colors = {
  light: {
    bg: '#FFFFFF',
    borderTop: '#E7E8EB',
    shadow: '#2D2F31',
    active: '#6200EE',
    inactive: '#5A5C5E',
    focusBg: 'rgba(98, 0, 238, 0.1)',
  },
  dark: {
    bg: '#0C0E10',
    borderTop: '#1A1C1E',
    shadow: '#000',
    active: '#CCB9FF',
    inactive: '#A1A3A5',
    focusBg: 'rgba(204, 185, 255, 0.15)',
  },
};

function TabIcon({ name, color, focused, bgColor }: { name: string; color: string; focused: boolean; bgColor: string }) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? bgColor : 'transparent',
        borderRadius: 16,
        paddingHorizontal: 20,
        paddingVertical: 8,
      }}
    >
      <MaterialIcons name={name as any} size={24} color={color} />
      <View style={{ height: 4 }} />
    </View>
  );
}

export default function TabLayout() {
  const themeName = useThemeName();
  const c = colors[themeName as keyof typeof colors] ?? colors.light;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: c.bg,
          borderTopWidth: 0,
          borderTopColor: c.borderTop,
          elevation: 0,
          shadowColor: c.shadow,
          shadowOffset: { width: 0, height: -8 },
          shadowOpacity: 0.06,
          shadowRadius: 24,
          paddingTop: 12,
          paddingBottom: 32,
          height: 88,
          borderRadius: 32,
          marginHorizontal: 16,
          marginBottom: 16,
        },
        tabBarActiveTintColor: c.active,
        tabBarInactiveTintColor: c.inactive,
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home'} color={color} focused={focused} bgColor={c.focusBg} />
          ),
        }}
      />
      <Tabs.Screen
        name="lines"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="directions-bus" color={color} focused={focused} bgColor={c.focusBg} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Eventos',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="event" color={color} focused={focused} bgColor={c.focusBg} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person" color={color} focused={focused} bgColor={c.focusBg} />
          ),
        }}
      />
    </Tabs>
  );
}
