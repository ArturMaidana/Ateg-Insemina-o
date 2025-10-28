// src/components/MonthCarousel.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { s, vs, ms } from 'react-native-size-matters';

import { ArrowLeftIcon, ArrowRightIcon } from '../Icons/Icons';

const MONTH_NAMES = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
];

const MonthCarousel = ({
  displayMonthIndex,
  onMonthChange,
  monthlyEventCounts = {},
}) => {
  const handlePrevMonth = () => {
    const newIndex = (displayMonthIndex - 1 + 12) % 12;
    onMonthChange(newIndex);
  };

  const handleNextMonth = () => {
    const newIndex = (displayMonthIndex + 1) % 12;
    onMonthChange(newIndex);
  };

  const handleMonthPress = monthIndex => {
    onMonthChange(monthIndex);
  };

  const getVisibleMonths = () => {
    const visibleMonths = [];
    for (let i = -2; i <= 2; i++) {
      const monthIndex = (displayMonthIndex + i + 12) % 12;
      visibleMonths.push({
        name: MONTH_NAMES[monthIndex],
        events: monthlyEventCounts[monthIndex] || 0,
        monthIndex: monthIndex,
      });
    }
    return visibleMonths;
  };

  return (
    <View style={styles.eventsSection}>
      <View style={styles.eventsHeader}>
        <Text style={styles.eventsTitle}>Agenda</Text>
        <View style={styles.arrowButtonsContainer}>
          <TouchableOpacity
            onPress={handlePrevMonth}
            style={styles.arrowButton}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleNextMonth}
            style={[styles.arrowButton, { marginLeft: 8 }]}
          >
            <ArrowRightIcon />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.monthsWrapper}>
        {getVisibleMonths().map((month, index) => {
          const isActive = index === 2; // O mês do meio é o ativo
          return (
            <TouchableOpacity
              key={`${month.name}-${index}`}
              onPress={() => handleMonthPress(month.monthIndex)}
              style={[styles.monthBox, isActive && styles.activeMonthBox]}
            >
              <Text
                style={[styles.monthText, isActive && styles.activeMonthText]}
              >
                {month.name}
              </Text>
              <Text
                style={[
                  styles.eventCountText,
                  isActive && styles.activeEventCountText,
                ]}
              >
                {month.events} Atend
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventsSection: {
    backgroundColor: '#ffffffff',
    paddingHorizontal: ms(15),
  },
  eventsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ms(10),
  },
  arrowButtonsContainer: {
    flexDirection: 'row',
  },
  arrowButton: {
    padding: ms(3),
    borderWidth: ms(1),
    borderColor: '#E0E0E0',
    borderRadius: ms(5),
    backgroundColor: '#FFFFFF',
  },
  eventsTitle: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(16),
    color: '#333',
  },
  monthsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  monthBox: {
    width: ms(60),
    height: ms(60),
    borderRadius: ms(5),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: ms(4),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: vs(1) },
    shadowOpacity: 0.2,
    shadowRadius: ms(1.41),
  },
  activeMonthBox: {
    backgroundColor: '#00A859',
  },
  monthText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(14),
    color: '#424242',
  },
  activeMonthText: {
    color: '#FFFFFF',
  },
  eventCountText: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(10),
    color: '#424242',
    marginTop: vs(4),
  },
  activeEventCountText: {
    color: '#FFFFFF',
    opacity: 0.9,
  },
});

export default MonthCarousel;
