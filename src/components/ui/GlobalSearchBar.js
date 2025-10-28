import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { SearchIcon } from '../Icons/Icons';

const FilterModal = ({
  visible,
  onClose,
  onApply,
  selectedFilters,
  setSelectedFilters,
}) => {
  const categories = [
    { name: 'Eventos', icon: '📅' },
    { name: 'Atendimentos', icon: '👥' },
    { name: 'Serviços', icon: '🔧' },
    { name: 'Participantes', icon: '👤' },
  ];

  const toggleFilter = categoryName => {
    if (selectedFilters.includes(categoryName)) {
      setSelectedFilters(selectedFilters.filter(s => s !== categoryName));
    } else {
      setSelectedFilters([...selectedFilters, categoryName]);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Filtrar por Categoria</Text>
          <Text style={styles.modalSubtitle}>
            Selecione as categorias para buscar
          </Text>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => {
              const isSelected = selectedFilters.includes(category.name);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryButton,
                    isSelected && styles.categoryButtonSelected,
                  ]}
                  onPress={() => toggleFilter(category.name)}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryButtonText,
                      isSelected && styles.categoryButtonTextSelected,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={() => setSelectedFilters([])}
            >
              <Text style={styles.clearButtonText}>Limpar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.applyButton} onPress={onApply}>
              <Text style={styles.applyButtonText}>Aplicar Filtros</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const GlobalSearchBar = ({
  searchQuery,
  onSearchQueryChange,
  onResultSelect,
  searchResults,
  isLoading,
  onFocus,
  onBlur,
  placeholder = 'Pesquisar no sistema...',
}) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleResultPress = result => {
    Keyboard.dismiss();
    onResultSelect(result);
  };

  const showResults = searchQuery.trim().length > 1;

  const handleApplyFilters = () => {
    setFilterVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.searchContainer}>
        <SearchIcon width={18} height={18} style={{ color: '#616161' }} />
        <TextInput
          placeholder={placeholder}
          style={styles.searchInput}
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={onSearchQueryChange}
          onFocus={onFocus}
          onBlur={onBlur}
          returnKeyType="search"
        />
      </View>

      {showResults && (
        <View style={styles.resultsWrapper}>
          {isLoading ? (
            <ActivityIndicator
              size="large"
              color="#00A859"
              style={{ paddingVertical: 20 }}
            />
          ) : searchResults.length > 0 ? (
            <FlatList
              data={searchResults}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.resultItem}
                  onPress={() => handleResultPress(item)}
                >
                  <View style={styles.resultIcon}>
                    <Text style={{ fontSize: 16 }}>{item.icon || '🔍'}</Text>
                  </View>
                  <View style={styles.resultContent}>
                    <Text style={styles.resultTitle}>{item.title}</Text>
                    <Text style={styles.resultSubtitle}>{item.subtitle}</Text>
                    <Text style={styles.resultType}>{item.type}</Text>
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={item => `${item.type}-${item.id}`}
              style={styles.resultsList}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                Nenhum resultado encontrado.
              </Text>
            </View>
          )}
        </View>
      )}

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingLeft: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    height: 44,
  },
  searchInput: {
    fontFamily: 'Ubuntu-Regular',
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
    marginRight: 8,
  },
  filterButton: {
    padding: 10,
  },
  resultsWrapper: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 16,
    maxHeight: 350,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  resultsList: {
    padding: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f7f7f7',
  },
  resultIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  resultType: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 10,
    color: '#00A859',
    backgroundColor: '#E1FFEA',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
    overflow: 'hidden',
  },
  noResults: {
    padding: 20,
    alignItems: 'center',
  },
  noResultsText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(32, 32, 32, 0.2)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
  },
  modalTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 14,
    color: '#555',
    marginBottom: 20,
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  categoryButtonSelected: {
    backgroundColor: '#E1FFEA',
    borderColor: '#00A859',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  categoryButtonText: {
    fontFamily: 'Ubuntu-Medium',
    color: '#333',
  },
  categoryButtonTextSelected: {
    color: '#00A859',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  clearButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearButtonText: {
    fontFamily: 'Ubuntu-Medium',
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#00A859',
    borderRadius: 8,
    paddingVertical: 14,
    flex: 1,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    fontFamily: 'Ubuntu-Medium',
    color: 'white',
    fontSize: 14,
  },
});

export default GlobalSearchBar;
