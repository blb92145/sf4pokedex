import { LinearGradient } from 'expo-linear-gradient';
import { Search, ShieldAlert, Sparkles } from 'lucide-react-native';
import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ArcadeButton } from '@/components/arcade-button';
import { PlayerCard } from '@/components/player-card';
import { scoutTheme } from '@/constants/scout-theme';
import { usePlayers } from '@/providers/players-provider';

export default function RosterScreen() {
  const {
    filteredPlayers,
    searchText,
    setSearchText,
    addQuickPlayer,
    isLoading,
    isSaving,
  } = usePlayers();
  const [name, setName] = useState<string>('');
  const [note, setNote] = useState<string>('');

  const headerCount = useMemo(() => `${filteredPlayers.length} files tracked`, [filteredPlayers.length]);

  const handleAddPlayer = () => {
    const trimmedName = name.trim();

    if (!trimmedName) {
      return;
    }

    addQuickPlayer({
      name: trimmedName,
      shortNote: note.trim(),
    });
    setName('');
    setNote('');
  };

  return (
    <LinearGradient
      colors={['#05070D', '#0A1220', '#101A2C']}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.screen}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            testID="roster-scroll"
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.heroCard}>
              <View style={styles.heroTopRow}>
                <View>
                  <Text style={styles.eyebrow}>SF4 SCOUTDEX</Text>
                  <Text style={styles.title}>Build reads on real players.</Text>
                </View>
                <View style={styles.heroBadge}>
                  <ShieldAlert color={scoutTheme.red} size={18} />
                </View>
              </View>
              <Text style={styles.description}>
                Arcade dossier for tendencies, pressure habits, panic options, and the small tells that win sets.
              </Text>
              <View style={styles.metricRow}>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>{filteredPlayers.length}</Text>
                  <Text style={styles.metricLabel}>Visible</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>Ranked</Text>
                  <Text style={styles.metricLabel}>By threat</Text>
                </View>
                <View style={styles.metricCard}>
                  <Text style={styles.metricValue}>{isSaving ? 'Syncing' : 'Ready'}</Text>
                  <Text style={styles.metricLabel}>Status</Text>
                </View>
              </View>
            </View>

            <View style={styles.searchShell}>
              <Search color={scoutTheme.textMuted} size={18} />
              <TextInput
                testID="search-input"
                value={searchText}
                onChangeText={setSearchText}
                placeholder="Search name, habits, notes..."
                placeholderTextColor={scoutTheme.textMuted}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.quickAddCard}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionEyebrow}>QUICK ADD</Text>
                <Sparkles color={scoutTheme.cyan} size={16} />
              </View>
              <Text style={styles.quickAddTitle}>Open a new player file in seconds.</Text>
              <TextInput
                testID="name-input"
                value={name}
                onChangeText={setName}
                placeholder="Player tag"
                placeholderTextColor={scoutTheme.textMuted}
                style={styles.input}
              />
              <TextInput
                testID="note-input"
                value={note}
                onChangeText={setNote}
                placeholder="Short first read"
                placeholderTextColor={scoutTheme.textMuted}
                style={[styles.input, styles.noteInput]}
                multiline
              />
              <ArcadeButton
                testID="add-player-button"
                label="Create player file"
                onPress={handleAddPlayer}
              />
            </View>

            <View style={styles.listHeader}>
              <View>
                <Text style={styles.sectionEyebrow}>ROSTER</Text>
                <Text style={styles.listTitle}>{headerCount}</Text>
              </View>
              <Text style={styles.listHint}>Highest threat first</Text>
            </View>

            {isLoading ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>Loading files...</Text>
              </View>
            ) : filteredPlayers.length === 0 ? (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyTitle}>No matching files.</Text>
                <Text style={styles.emptyText}>Try another keyword or create a new player dossier above.</Text>
              </View>
            ) : (
              filteredPlayers.map((player) => <PlayerCard key={player.id} player={player} />)
            )}
          </ScrollView>
        </KeyboardAvoidingView>
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
  flex: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 140,
    gap: 18,
  },
  heroCard: {
    borderRadius: 30,
    backgroundColor: 'rgba(17, 24, 39, 0.92)',
    borderWidth: 1,
    borderColor: scoutTheme.border,
    padding: 20,
    gap: 14,
    shadowColor: scoutTheme.shadow,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 14 },
    shadowRadius: 28,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
  },
  eyebrow: {
    color: scoutTheme.cyan,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.4,
  },
  title: {
    color: scoutTheme.text,
    fontSize: 30,
    fontWeight: '900',
    lineHeight: 34,
    marginTop: 10,
    maxWidth: 260,
  },
  heroBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 91, 110, 0.14)',
  },
  description: {
    color: scoutTheme.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
  },
  metricCard: {
    flex: 1,
    borderRadius: 18,
    padding: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    gap: 4,
  },
  metricValue: {
    color: scoutTheme.text,
    fontSize: 16,
    fontWeight: '800',
  },
  metricLabel: {
    color: scoutTheme.textMuted,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  searchShell: {
    minHeight: 56,
    borderRadius: 18,
    backgroundColor: 'rgba(8, 16, 24, 0.92)',
    borderWidth: 1,
    borderColor: 'rgba(98, 230, 255, 0.14)',
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: scoutTheme.text,
    fontSize: 15,
  },
  quickAddCard: {
    borderRadius: 28,
    backgroundColor: 'rgba(10, 17, 30, 0.92)',
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255, 91, 110, 0.16)',
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionEyebrow: {
    color: scoutTheme.amber,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  quickAddTitle: {
    color: scoutTheme.text,
    fontSize: 22,
    fontWeight: '800',
  },
  input: {
    minHeight: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 14,
    paddingVertical: 14,
    color: scoutTheme.text,
    fontSize: 15,
  },
  noteInput: {
    minHeight: 90,
    textAlignVertical: 'top',
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  listTitle: {
    color: scoutTheme.text,
    fontSize: 24,
    fontWeight: '800',
    marginTop: 6,
  },
  listHint: {
    color: scoutTheme.textMuted,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  emptyCard: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: scoutTheme.border,
    backgroundColor: 'rgba(13, 19, 32, 0.86)',
    padding: 20,
    gap: 8,
  },
  emptyTitle: {
    color: scoutTheme.text,
    fontSize: 20,
    fontWeight: '800',
  },
  emptyText: {
    color: scoutTheme.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
