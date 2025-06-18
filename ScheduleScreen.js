import React from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';

function ScheduleScreen({ route }) {
  const { tasks = [] } = route.params || {}; // Default to an empty array if tasks aren't passed

  // Group tasks based on priority
  const highPriorityTasks = tasks.filter(task => task.priority === 'High');
  const lowPriorityTasks = tasks.filter(task => task.priority === 'Low');

  const renderTask = ({ item }) => (
    <View style={styles.taskContainer}>
      <Text style={styles.taskText}>
        {item.text} (Time: {item.time}, Priority: {item.priority})
      </Text>
    </View>
  );

  const renderSection = (title, data) => (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={<Text style={styles.noTasksText}>No {title.toLowerCase()} priority tasks</Text>}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        <>
          {renderSection('High Priority', highPriorityTasks)}
          {renderSection('Low Priority', lowPriorityTasks)}
        </>
      ) : (
        <Text style={styles.noTasksText}>No tasks available</Text> // Message when no tasks
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6200ee',
  },
  taskContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  noTasksText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#999',
    marginVertical: 10,
  },
});

export default ScheduleScreen;