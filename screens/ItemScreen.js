import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import BarChartComponent from '../components/BarChartComponent'; // Adjust the import path as necessary
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function ItemScreen({ route }) {
  const { groupKey } = route.params; // Retrieve groupKey from params
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchExpenses = async () => {
    if (!groupKey) {
      console.error('Group key is undefined');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://192.168.100.7:8000/api/expenses/?group_key=${groupKey}&format=json`);
      const json = await response.json();
      setExpenses(json.results || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    

    fetchExpenses();
  }, [groupKey]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;

const groupByDate = (items) => {
  return items.reduce((groups, item) => {
    const date = item.date || 'No Date'; // Provide a default value if date is undefined
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(item);
    return groups;
  }, {});
};

const transformDataForChart = (groupedData) => {
  return Object.keys(groupedData).map(date => ({
    x: date,
    y: groupedData[date].reduce((sum, item) => sum + item.amount, 0), // Sum amounts for each date
  }));
};

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchExpenses();
    setRefreshing(false);
  };

  // Group and transform the expenses data
  const groupedExpenses = groupByDate(expenses);
  const chartData = transformDataForChart(groupedExpenses);

  // Prepare data for chart
  const data = {
    labels: chartData.map(item => item.x), // X-axis labels (dates)
    datasets: [
      {
        data: chartData.map(item => item.y), // Y-axis values (amounts)
      },
    ],
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Expenses by Date</Text>
      {/* <BarChart
        data={data}
        width={screenWidth - 32}
        height={220}
        fromZero={true}
        showBarTops={false}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffd700',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(255, 255, 255, 0)`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      /> */}
      <FlatList
        data={expenses}
        keyExtractor={(item) => (item.key ? item.key.toString() : "unknown")} // Ensure item.id is not undefined
        renderItem={({ item }) => (<>
            <Text>Date: {item.date || "No expense_date"}</Text>
          <View style={styles.item}>
            <Text>Description: {item.description || "No description"}</Text>
            <Text>Amount: ${item.amount || "0.00"}</Text>
          </View>
          </>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});