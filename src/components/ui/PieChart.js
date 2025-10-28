import React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import { View, Text, StyleSheet } from 'react-native';
import { ms } from 'react-native-size-matters';

const describeArc = (x, y, radius, startAngle, endAngle) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
  const d = [
    'M',
    start.x,
    start.y,
    'A',
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
  ].join(' ');
  return d;
};

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const PieChart = ({ data, totalValue, size = 300 }) => {
  const radius = size / 2;
  const strokeWidth = radius * 0.4;
  const center = radius;
  let startAngle = 0;

  const colorScale = ['#00A859', '#66BB6A', '#AED581', '#9CCC65', '#C5E1A5'];

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G x={center} y={center}>
          {data.map((slice, index) => {
            const sliceAngle = (slice.count / totalValue) * 360;
            const endAngle = startAngle + sliceAngle;
            const path = describeArc(
              0,
              0,
              radius - strokeWidth / 2,
              startAngle,
              endAngle,
            );
            startAngle += sliceAngle;
            return (
              <Path
                key={index}
                d={path}
                fill="none"
                stroke={colorScale[index % colorScale.length]}
                strokeWidth={strokeWidth}
              />
            );
          })}
        </G>
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={styles.totalAttendees}>{totalValue}</Text>
        <Text style={styles.totalAttendeesLabel}>Atendimentos</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalAttendees: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: ms(16),
    color: '#212121',
  },
  totalAttendeesLabel: {
    fontFamily: 'Ubuntu-Light',
    fontSize: ms(12),
    color: '#000000ff',
    marginTop: ms(2),
  },
});

export default PieChart;
