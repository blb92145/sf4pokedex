import { Tabs } from 'expo-router';
import { Radar, ScrollText } from 'lucide-react-native';
import React from 'react';

import { scoutTheme } from '@/constants/scout-theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0B1220',
          borderTopColor: 'rgba(98, 230, 255, 0.12)',
        },
        tabBarActiveTintColor: scoutTheme.cyan,
        tabBarInactiveTintColor: scoutTheme.textMuted,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '700',
          letterSpacing: 0.4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Roster',
          tabBarIcon: ({ color, size }) => <Radar color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="intel"
        options={{
          title: 'Intel',
          tabBarIcon: ({ color, size }) => <ScrollText color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}

