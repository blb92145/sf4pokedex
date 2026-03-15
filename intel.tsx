import { LinearGradient } from 'expo-linear-gradient';
import { BrainCircuit, Crosshair, Shield, TriangleAlert } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { scoutTheme } from '@/constants/scout-theme';
import { usePlayers } from '@/providers/players-provider';

export default function IntelScreen() {
  const { players } = usePlayers();

  const topThreats = players.filter((player) => player.threat === 'S' || player.threat === 'A').length;
  const zoningCount = players.filter((player) => player.tendencies.includes('Zoning')).length;
  const mashCount = players.filter((player) => player.tendencies.includes('Mash DP')).length;

  return (
    <LinearGradient
      colors={['#060912', '#0B1220', '#0D1728']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.eyebrow}>MATCH INTEL</Text>
          <Text style={styles.title}>Fast reads before the set starts.</Text>
          <Text style={styles.subtitle}>
            A compact scouting board showing what your player pool is doing most often.
          </Text>

          <View style={styles.grid}>
            <View style={styles.statCard}>
              <TriangleAlert color={scoutTheme.red} size={18} />
              <Text style={styles.statValue}>{topThreats}</Text>
              <Text style={styles.statLabel}>High threat files</Text>
            </View>
            <View style={styles.statCard}>
              <Crosshair color={scoutTheme.cyan} size={18} />
              <Text style={styles.statValue}>{zoningCount}</Text>
              <Text style={styles.statLabel}>Zoners tracked</Text>
            </View>
            <View style={styles.statCard}>
              <Shield color={scoutTheme.amber} size={18} />
              <Text style={styles.statValue}>{mashCount}</Text>
              <Text style={styles.statLabel}>Mash DP habits</Text>
            </View>
          </View>

          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <BrainCircuit color={scoutTheme.cyan} size={18} />
              <Text style={styles.panelTitle}>Pre-set reminders</Text>
            </View>
            <Text style={styles.bullet}>• Start patient versus your S/A files. Force them to prove the hard read.</Text>
            <Text style={styles.bullet}>• When a profile mentions panic in the corner, spend meter to keep them there.</Text>
            <Text style={styles.bullet}>• If a player has no full profile yet, add one line right after the set while details are still fresh.</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Most common habits in your current roster</Text>
            {[
              ['Zoning', zoningCount],
              ['Mash DP', mashCount],
              ['Patient', players.filter((player) => player.tendencies.includes('Patient')).length],
              ['Jumpy', players.filter((player) => player.tendencies.includes('Jumpy')).length],
            ].map(([label, count]) => (
              <View key={label} style={styles.habitRow}>
                <Text style={styles.habitLabel}>{label}</Text>
                <Text style={styles.habitValue}>{count}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 120,
    gap: 18,
  },
  eyebrow: {
    color: scoutTheme.amber,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: scoutTheme.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
    marginTop: 8,
  },
  subtitle: {
    color: scoutTheme.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 22,
    backgroundColor: 'rgba(17, 24, 39, 0.88)',
    padding: 16,
    gap: 10,
    borderWidth: 1,
    borderColor: scoutTheme.border,
  },
  statValue: {
    color: scoutTheme.text,
    fontSize: 24,
    fontWeight: '900',
  },
  statLabel: {
    color: scoutTheme.textMuted,
    fontSize: 12,
    lineHeight: 18,
  },
  panel: {
    borderRadius: 26,
    backgroundColor: 'rgba(13, 19, 32, 0.9)',
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(98, 230, 255, 0.14)',
    gap: 12,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  panelTitle: {
    color: scoutTheme.text,
    fontSize: 20,
    fontWeight: '800',
  },
  bullet: {
    color: scoutTheme.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  habitRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  habitLabel: {
    color: scoutTheme.text,
    fontSize: 15,
    fontWeight: '700',
  },
  habitValue: {
    color: scoutTheme.cyan,
    fontSize: 15,
    fontWeight: '800',
  },
});
