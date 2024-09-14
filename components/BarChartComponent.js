import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const BarChartComponent = ({ data }) => {
  // Data transformation for chart
  const chartData = {
    labels: data.map(item => item.date), // X-axis labels (dates)
    datasets: [
      {
        data: data.map(item => item.amount), // Y-axis values (amounts)
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses by Date</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        fromZero={true}
        showBarTops={false}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffd700',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default BarChartComponent;
