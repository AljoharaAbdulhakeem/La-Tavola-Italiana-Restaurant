import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';
import { useNavigation } from '@react-navigation/native';

function TodoList() {
  const [task, setTask] = useState('');
  const [time, setTime] = useState(''); // State for time
  const [priority, setPriority] = useState(''); // State for priority
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null); // Track task being edited
  const navigation = useNavigation(); // Navigation object

  // Load tasks from AsyncStorage
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks) {
          setTasks(JSON.parse(savedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks', error);
      }
    };
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage
  const saveTasksToStorage = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  const addTask = () => {
    if (task.trim() !== '' && time.trim() !== '' && priority.trim() !== '') {
      let updatedTasks;
      const newTask = {
        id: Date.now().toString(),
        text: task,
        time,
        priority,
        completed: false,
      };

      if (editingTaskId) {
        updatedTasks = tasks.map(t => (t.id === editingTaskId ? newTask : t));
        setEditingTaskId(null);
      } else {
        updatedTasks = [...tasks, newTask];
      }

      setTasks(updatedTasks);
      saveTasksToStorage(updatedTasks);
      setTask('');
      setTime('');
      setPriority('');

      navigation.navigate('Schedule', { tasks: updatedTasks }); // Pass tasks to Schedule
    } else {
      Alert.alert('Error', 'Please enter a task, time, and priority');
    }
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    saveTasksToStorage(updatedTasks);
    navigation.navigate('Schedule', { tasks: updatedTasks }); // Update Schedule screen
  };

  const editTask = (taskId) => {
    const taskToEdit = tasks.find(t => t.id === taskId);
    if (taskToEdit) {
      setTask(taskToEdit.text);
      setTime(taskToEdit.time);
      setPriority(taskToEdit.priority);
      setEditingTaskId(taskId);
    }
  };

  const renderTask = ({ item }) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
          <View style={[styles.circle, item.completed && styles.completedCircle]}>
            {item.completed && <Icon name="checkmark" size={18} color="#fff" />}
          </View>
        </TouchableOpacity>
        <Text style={[styles.taskText, item.completed && styles.completedTaskText]}>
          {item.text} 
        </Text>
        <Menu>
          <MenuTrigger>
            <Icon name="ellipsis-vertical" size={24} color="#000" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => editTask(item.id)} text="Edit" />
            <MenuOption onSelect={() => deleteTask(item.id)} text="Delete" />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  const handleLogout = () => {
    navigation.navigate('Welcome'); // Navigate to Welcome screen
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out" size={30} color="#C290ED" />
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Name Task"
          value={task}
          onChangeText={setTask}
        />
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time}
          onChangeText={setTime}
        />
        <TextInput
          style={styles.input}
          placeholder="Priority"
          value={priority}
          onChangeText={setPriority}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Icon name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#C290ED',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoutButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
  },
  circle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#C290ED',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  completedCircle: {
    backgroundColor: '#6200ee',
  },
  completedTaskText: {
    textDecorationLine: 'line-through',
    color: '#C290ED',
  },
});

export default TodoList;
