import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const [groups, setGroups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const fetchGroups = async () => {
    try {
      const response = await fetch('http://192.168.100.7:8000/api/groups/?format=json');
      const json = await response.json();
      setGroups(json.results);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchGroups();
    setRefreshing(false);
  };

  const handleGroupPress = (groupKey) => {
    navigation.navigate('Item', { groupKey });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Evenly</Text>
        <Button title="Add" onPress={() => alert('Button Pressed!')} />
      </View>

      <FlatList
        data={groups}
        keyExtractor={(item) => item.key.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleGroupPress(item.key)}>
            <View style={styles.item}>
              <Text>Group Name: {item.group_name}</Text>
              <Text>Currency: {item.currency}</Text>
              <Text>Information: {item.group_information}</Text>
              <Text>Participants:</Text>
              {item.participants.map((participant) => (
                <Text key={participant.key}>- {participant.name}</Text>
              ))}
            </View>
          </TouchableOpacity>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#9Bd35A', '#689F38']}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  item: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
