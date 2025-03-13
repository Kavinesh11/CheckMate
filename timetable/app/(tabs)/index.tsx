import { View, StyleSheet, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

export default function Index() {
  const [tasks] = useState([
    {
      id: 1,
      subject: '23CSE211 (DAA)',
      task: 'Assignment 1 Submission',
      deadline: '2024-03-25 23:59',
      priority: 'high'
    },
    {
      id: 2,
      subject: '23MAT216 (PROB)',
      task: 'Quiz Preparation',
      deadline: '2024-03-27 10:30',
      priority: 'medium'
    },
    {
      id: 3,
      subject: '23CSE213 (COA)',
      task: 'Lab Report',
      deadline: '2024-03-28 15:00',
      priority: 'high'
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      default:
        return '#00C851';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks & Reminders</Text>
        <TouchableOpacity style={styles.addButton}>
          <MaterialIcons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.taskList}>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(task.priority) }]} />
            <View style={styles.taskContent}>
              <Text style={styles.subject}>{task.subject}</Text>
              <Text style={styles.taskText}>{task.task}</Text>
              <Text style={styles.deadline}>Due: {task.deadline}</Text>
            </View>
            <TouchableOpacity style={styles.checkButton}>
              <MaterialIcons name="check-circle-outline" size={24} color="#666" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
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
    color: '#ffffff',
  },
  addButton: {
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 20,
  },
  taskList: {
    flex: 1,
  },
  taskItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  priorityIndicator: {
    width: 4,
    height: '100%',
  },
  taskContent: {
    flex: 1,
    padding: 16,
  },
  subject: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  taskText: {
    fontSize: 14,
    marginBottom: 4,
  },
  deadline: {
    fontSize: 12,
    color: '#666',
  },
  checkButton: {
    padding: 16,
    justifyContent: 'center',
  },
});
