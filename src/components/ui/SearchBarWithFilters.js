// components/SearchBarWithFilters.jsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

import {
  ArrowDownIcon,
  ClockIcon,
  EyeIcon,
  CheckIconFilter,
  CancelIcon,
  SearchIcon,
} from '../Icons/Icons';

const FilterModal = ({
  visible,
  onClose,
  onApply,
  selectedStatuses,
  setSelectedStatuses,
  filterConfig,
}) => {
  const defaultStatuses = [
    { name: 'Aguardando', icon: <ClockIcon width={16} height={16} /> },
    { name: 'Em Atendimento', icon: <EyeIcon width={16} height={16} /> },
    { name: 'Realizada', icon: <CheckIconFilter width={16} height={16} /> },
    { name: 'Desistência', icon: <CancelIcon width={16} height={16} /> },
  ];

  const statuses = filterConfig?.statuses || defaultStatuses;

  const toggleStatus = statusName => {
    if (selectedStatuses.includes(statusName)) {
      setSelectedStatuses(selectedStatuses.filter(s => s !== statusName));
    } else {
      setSelectedStatuses([...selectedStatuses, statusName]);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          {filterConfig?.modalTitle || 'Filtros de Pesquisa'}
        </Text>
        <Text style={styles.modalSubtitle}>
          {filterConfig?.statusSubtitle || 'Status do Atendimento'}
        </Text>
        <View style={styles.statusContainer}>
          {statuses.map((status, index) => {
            const isSelected = selectedStatuses.includes(status.name);
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.statusButton,
                  isSelected && styles.statusButtonSelected,
                ]}
                onPress={() => toggleStatus(status.name)}
              >
                {status.icon}
                <Text
                  style={[
                    styles.statusButtonText,
                    isSelected && styles.statusButtonTextSelected,
                  ]}
                >
                  {status.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <TouchableOpacity style={styles.applyButton} onPress={onApply}>
          <Text style={styles.applyButtonText}>
            {filterConfig?.applyButtonText || 'Aplicar Filtros'}
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default function SearchBarWithFilters({
  searchValue = '',
  onSearchChange,
  onSearchSubmit,
  placeholder = 'Buscar por Nome ou CPF',

  selectedStatuses = [],
  onStatusChange,

  filterConfig = {},
  containerStyle = {},
  searchInputStyle = {},
  filterButtonStyle = {},
}) {
  const [isFilterVisible, setFilterVisible] = useState(false);

  const handleApplyFilters = () => {
    setFilterVisible(false);
    if (filterConfig.onApply) {
      filterConfig.onApply(selectedStatuses);
    }
  };

  const handleSearchChange = text => {
    onSearchChange(text);
  };

  return (
    <View style={[styles.searchContainer, containerStyle]}>
      <SearchIcon width={18} height={18} />
      <TextInput
        placeholder={placeholder}
        style={[styles.searchInput, searchInputStyle]}
        placeholderTextColor="#999"
        value={searchValue}
        onChangeText={handleSearchChange}
        onSubmitEditing={onSearchSubmit}
        returnKeyType="search"
      />
      <TouchableOpacity
        style={[styles.filterButton, filterButtonStyle]}
        onPress={() => setFilterVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filtros</Text>
        <ArrowDownIcon width={12} height={12} />
      </TouchableOpacity>

      <FilterModal
        visible={isFilterVisible}
        onClose={() => setFilterVisible(false)}
        onApply={handleApplyFilters}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={onStatusChange}
        filterConfig={filterConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingLeft: 15,
    paddingRight: 10,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2.62,
    height: 45,
    width: '95%',
  },
  searchInput: {
    fontFamily: 'Ubuntu-Regular',
    flex: 1,
    fontSize: 14,
    color: '#333',
    marginLeft: 5,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 1,
    height: '100%',
  },
  filterButtonText: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 12,
    marginRight: 6,
    color: '#1f1f1fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(32, 32, 32, 0.13)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontFamily: 'Ubuntu-Medium',
    fontSize: 18,
    marginBottom: 8,
  },
  modalSubtitle: {
    fontFamily: 'Ubuntu-Light',
    fontSize: 14,
    color: '#2c2c2cff',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '48%',
    marginBottom: 10,
  },
  statusButtonSelected: {
    backgroundColor: '#E1FFEA',
    borderColor: '#00A859',
    borderWidth: 1,
  },
  statusButtonText: {
    fontFamily: 'Ubuntu-Regular',
    marginLeft: 18,
    color: '#333',
  },
  statusButtonTextSelected: {
    color: '#00A859',
  },
  applyButton: {
    backgroundColor: '#00A859',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    fontFamily: 'Ubuntu-Regular',
    color: 'white',
    fontSize: 16,
  },
});
