import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { Task } from './components/Task';
import { useState } from 'react';

export default function App() {

  const [task, setTask] = useState();
  const [taskList, setTaskList] = useState([]);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskList([...taskList, task]);
    setTask(undefined);
  };

  const handleRemoveTask = (index) => {
    const tasksCopy = [...taskList]
    tasksCopy.splice(index, 1)
    setTaskList(tasksCopy);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWraper}>
        <Text style={styles.sectionTitle}>To jest tytuł naszej listy</Text>
      </View>
      <View style={styles.tasks}>
        {
          taskList.map((item, index) => (<TouchableOpacity key={index} onPress={() => handleRemoveTask(index)}><Task key={index} text={item} /></TouchableOpacity>))
        }
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={`Write a task`} value={task} onChangeText={text => setTask(text)}></TextInput>
        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  tasksWraper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  tasks: {
    marginTop: 30,
    paddingLeft: 15,
    paddingRight: 15,
  },
  addText: {
    fontSize: 30
  },
});
