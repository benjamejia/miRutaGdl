import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'tamagui';

function TabIcon({ name, color, focused }: { name: string; color: string; focused: boolean }) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: focused ? 'rgba(98, 0, 238, 0.1)' : 'transparent',
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
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#2D2F31',
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
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: '#5A5C5E',
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home'} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="lines"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="directions-bus" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="emoji-events" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
