import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormHeader from '../../components/ui/FormHeader';

import { CheckIcon, BackPage } from '../../components/Icons/Icons';
const ASYNC_STORAGE_KEY = '@syncHistory';

const formatSyncDate = date => {
  if (!date) return '';
  return date.toLocaleDateString('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};

const HistoryItem = ({ date }) => (
  <View style={styles.itemContainer}>
    <CheckIcon width={16} height={16} color="#00A859" />
    <Text style={styles.itemText}>Sincronizado em {formatSyncDate(date)}</Text>
  </View>
);

const EmptyList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>
      Nenhum histórico de sincronização encontrado.
    </Text>
  </View>
);

export default function SyncHistoryScreen({ navigation }) {
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState(1);

  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const loadSyncHistory = async () => {
        setIsLoading(true);
        try {
          const savedHistoryString = await AsyncStorage.getItem(
            ASYNC_STORAGE_KEY,
          );
          if (savedHistoryString) {
            const historyArray = JSON.parse(savedHistoryString);
            setHistory(historyArray.map(dateStr => new Date(dateStr)));
          } else {
            setHistory([]);
          }
        } catch (e) {
          console.error('Failed to load sync history', e);
          setHistory([]);
        } finally {
          setIsLoading(false);
        }
      };

      loadSyncHistory();
    }, []),
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color="#00A859" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        >
          <BackPage />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Histórico de Sincronização</Text>
      </View>
      <FlatList
        data={history}
        keyExtractor={item => item.toISOString()}
        renderItem={({ item }) => <HistoryItem date={item} />}
        ListEmptyComponent={EmptyList}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: '#ffffffff',
    paddingTop: 40,
  },
  headerIcon: {
    padding: 5,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  itemText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 16,
    color: '#888',
  },
});
