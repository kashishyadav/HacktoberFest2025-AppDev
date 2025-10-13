//HomeScreens

import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import React, {
  useState,
  useEffect
} from "react";
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from "expo-checkbox";
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { colors } from '../common/colors';
import { toggleTheme as toggleThemeAction } from '../redux/Action';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
  // Redux theme management
  const { isDarkMode } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const theme = isDarkMode ? colors.dark : colors.light;

  // ToDo state management
  const [toDo, setToDo] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedToDo, setSelectedToDo] = useState(null);

  // AsyncStorage key
  const STORAGE_KEY = '@justdoit_todos';

  // Load todos from AsyncStorage
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedTodos !== null) {
        setToDo(JSON.parse(storedTodos));
      } else {
        // Initialize with mock data if no stored data
        const mockData = [
          {
            id: 1,
            title: "Complete React Native App",
            description: "Finish building the ToDo app with Redux integration",
            created_at: new Date().toISOString(),
            status: "pending"
          },
          {
            id: 2,
            title: "Test Theme Switching",
            description: "Make sure light and dark themes work properly",
            created_at: new Date().toISOString(),
            status: "completed"
          }
        ];
        setToDo(mockData);
        await saveTodos(mockData);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load todos");
      console.log('Error loading todos:', error);
    }
  };

  // Save todos to AsyncStorage
  const saveTodos = async (todosToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todosToSave));
    } catch (error) {
      Alert.alert("Error", "Failed to save todos");
      console.log('Error saving todos:', error);
    }
  };

  // Schedule notification for a task
  const scheduleTaskNotification = async (taskTitle) => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
          Alert.alert('Permission required', 'Please enable notifications to get task reminders');
          return;
        }
      }

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Reminder 📝",
          body: `Don't forget: ${taskTitle}`,
          sound: 'default',
          vibrate: [0, 250, 250, 250],
        },
        trigger: { seconds: 5 }, // 5 seconds after adding
      });
    } catch (error) {
      console.log('Error scheduling notification:', error);
    }
  };

  // Show completion notification
  const showCompletionNotification = async (taskTitle) => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Task Completed! 🎉",
          body: `Great job completing: ${taskTitle}`,
          sound: 'default',
          vibrate: [0, 250, 250, 250],
        },
        trigger: { seconds: 1 },
      });
    } catch (error) {
      console.log('Error showing completion notification:', error);
    }
  };

  const addToDo = async () => {
    if (!newTitle.trim()) {
      Alert.alert("Required", "Please enter a title");
      return;
    }
    try {
      const newTodo = {
        id: Date.now(),
        title: newTitle,
        description: newDescription,
        created_at: new Date().toISOString(),
        status: "pending",
      };

      const updatedTodos = [...toDo, newTodo];
      setToDo(updatedTodos);
      await saveTodos(updatedTodos);
      
      // Schedule notification for 5 seconds
      await scheduleTaskNotification(newTitle);
      
      Alert.alert("Success", "Task added successfully!");
      clearFormAndCloseModal();
    } catch (err) {
      Alert.alert("Error", "An error occurred");
      console.log(err);
    }
  };

  const updateToDo = async () => {
    if (!selectedToDo || !newTitle.trim()) {
      Alert.alert("Required", "Please enter a title");
      return;
    }
    try {
      const updatedTodos = toDo.map(todo =>
        todo.id === selectedToDo.id
          ? { ...todo, title: newTitle, description: newDescription }
          : todo
      );
      
      setToDo(updatedTodos);
      await saveTodos(updatedTodos);
      
      Alert.alert("Success", "Task updated successfully!");
      clearFormAndCloseModal();
    } catch (err) {
      Alert.alert("Error", "An error occurred");
      console.log(err);
    }
  };

  const toggleStatus = async (todo) => {
    try {
      const newStatus = todo.status === "pending" ? "completed" : "pending";
      const updatedTodos = toDo.map(t =>
        t.id === todo.id ? { ...t, status: newStatus } : t
      );
      
      setToDo(updatedTodos);
      await saveTodos(updatedTodos);
      
      // Show completion notification if task is being completed
      if (newStatus === "completed") {
        await showCompletionNotification(todo.title);
      }
    } catch (err) {
      Alert.alert("Error", "Failed to update status");
      console.log(err);
    }
  };

  const deleteToDo = async (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const updatedTodos = toDo.filter(todo => todo.id !== id);
            setToDo(updatedTodos);
            await saveTodos(updatedTodos);
          } catch (err) {
            Alert.alert("Error", "An error occurred");
            console.log(err);
          }
        },
      },
    ]);
  };

  const clearFormAndCloseModal = () => {
    setNewTitle("");
    setNewDescription("");
    setModalVisible(false);
    setIsEditing(false);
    setSelectedToDo(null);
  };

  const handleEdit = (todo) => {
    setSelectedToDo(todo);
    setNewTitle(todo.title);
    setNewDescription(todo.description);
    setIsEditing(true);
    setModalVisible(true);
  };

  const toggleTheme = () => {
    dispatch(toggleThemeAction());
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <View style={styles(theme, isDarkMode).card}>
        <View style={styles(theme, isDarkMode).cardHeader}>
          <View style={styles(theme, isDarkMode).checkboxContainer}>
            <Checkbox
              value={item.status === "completed"}
              onValueChange={() => toggleStatus(item)}
              color={item.status === "completed" ? "#4CAF50" : undefined}
              style={styles(theme, isDarkMode).checkbox}
            />
            <Text
              style={[
                styles(theme, isDarkMode).title,
                item.status === "completed" && styles(theme, isDarkMode).completedText,
              ]}
            >
              {item.title}
            </Text>
          </View>
          <View style={styles(theme, isDarkMode).actionButtons}>
            <TouchableOpacity
              onPress={() => handleEdit(item)}
              style={styles(theme, isDarkMode).iconButton}
            >
              <MaterialIcons name="edit" size={22} color={theme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteToDo(item.id)}
              style={styles(theme, isDarkMode).iconButton}
            >
              <MaterialIcons name="delete" size={22} color="#f44336" />
            </TouchableOpacity>
          </View>
        </View>

        {item.description ? (
          <Text style={styles(theme, isDarkMode).description}>{item.description}</Text>
        ) : null}

        <View style={styles(theme, isDarkMode).cardFooter}>
          <Text style={styles(theme, isDarkMode).date}>
            {new Date(item.created_at).toLocaleDateString()}
          </Text>
          <View
            style={[
              styles(theme, isDarkMode).statusBadge,
              item.status === "completed"
                ? styles(theme, isDarkMode).completedBadge
                : styles(theme, isDarkMode).pendingBadge,
            ]}
          >
            <Text style={styles(theme, isDarkMode).statusText}>
              {item.status === "completed" ? "Completed" : "Pending"}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles(theme, isDarkMode).container}>
      <View style={styles(theme, isDarkMode).header}>
        <Text style={styles(theme, isDarkMode).headerTitle}>My Tasks</Text>
        <View style={styles(theme, isDarkMode).headerActions}>
          <TouchableOpacity
            style={styles(theme, isDarkMode).themeToggle}
            onPress={toggleTheme}
          >
            <MaterialIcons
              name={isDarkMode ? "light-mode" : "dark-mode"}
              size={24}
              color={theme.textColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles(theme, isDarkMode).addButton}
            onPress={() => setModalVisible(true)}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={toDo}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles(theme, isDarkMode).listContainer}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={clearFormAndCloseModal}
      >
        <View style={styles(theme, isDarkMode).modalContainer}>
          <View style={styles(theme, isDarkMode).modalContent}>
            <View style={styles(theme, isDarkMode).modalHeader}>
              <Text style={styles(theme, isDarkMode).modalTitle}>
                {isEditing ? "Edit Task" : "New Task"}
              </Text>
              <TouchableOpacity
                onPress={clearFormAndCloseModal}
                style={styles(theme, isDarkMode).closeButton}
              >
                <MaterialIcons name="close" size={24} color={theme.textColor} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles(theme, isDarkMode).input}
              placeholder="Task title"
              value={newTitle}
              onChangeText={setNewTitle}
              placeholderTextColor={theme.textSecondary}
            />

            <TextInput
              style={[styles(theme, isDarkMode).input, styles(theme, isDarkMode).textArea]}
              placeholder="Description (optional)"
              value={newDescription}
              onChangeText={setNewDescription}
              multiline
              numberOfLines={4}
              placeholderTextColor={theme.textSecondary}
            />

            <TouchableOpacity
              style={[
                styles(theme, isDarkMode).submitButton,
                !newTitle.trim() && styles(theme, isDarkMode).disabledButton,
              ]}
              onPress={isEditing ? updateToDo : addToDo}
              disabled={!newTitle.trim()}
            >
              <Text style={styles(theme, isDarkMode).submitButtonText}>
                {isEditing ? "Update Task" : "Add Task"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;

const styles = (theme, isDarkMode) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: theme.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: theme.primary + '20',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.textColor,
  },
  themeToggle: {
    marginRight: 8,
    padding: 8,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    backgroundColor: theme.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkbox: {
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: theme.textColor,
    flex: 1,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: theme.textSecondary,
    opacity: 0.7,
  },
  description: {
    marginTop: 8,
    color: theme.textSecondary,
    fontSize: 14,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  date: {
    fontSize: 12,
    color: theme.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  completedBadge: {
    backgroundColor: isDarkMode ? "#1b5e20" : "#E8F5E9",
  },
  pendingBadge: {
    backgroundColor: isDarkMode ? "#e65100" : "#FFF3E0",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
    color: theme.textColor,
  },
  actionButtons: {
    flexDirection: "row",
  },
  iconButton: {
    padding: 8,
  },
  addButton: {
    backgroundColor: theme.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: theme.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.textColor,
  },
  closeButton: {
    padding: 4,
  },
  input: {
    backgroundColor: isDarkMode ? "#333333" : "#f5f5f5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    color: theme.textColor,
    borderWidth: 1,
    borderColor: theme.primary + '20',
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: theme.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: isDarkMode ? "#333333" : "#cccccc",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});