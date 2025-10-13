# JustDoIt - Task Management App 📝

A modern, feature-rich task management application built with React Native and Expo. Transform your ideas into actions with a beautiful, theme-aware interface and smart notifications.

## ✨ Features

### 🎨 **Theme System**
- **Dark/Light Mode**: Automatic theme switching based on device settings
- **Redux Persistence**: Theme preferences saved across app sessions
- **Real-time Switching**: Toggle themes instantly with visual feedback
- **System Sync**: Automatically adapts to your device's color scheme

### 📱 **Task Management**
- **Create Tasks**: Add tasks with titles and optional descriptions
- **Edit Tasks**: Modify existing tasks with intuitive interface
- **Mark Complete**: Check off completed tasks with visual feedback
- **Delete Tasks**: Remove unwanted tasks with confirmation dialogs
- **Persistent Storage**: All tasks saved locally using AsyncStorage

### 🔔 **Smart Notifications**
- **Task Reminders**: Get notified 5 seconds after adding a new task
- **Completion Celebrations**: Celebratory notification when tasks are completed
- **Sound & Vibration**: Rich notification experience with audio and haptic feedback
- **Permission Handling**: Automatic notification permission requests

### 🎯 **User Experience**
- **Loading Screen**: Beautiful animated splash screen with app branding
- **Smooth Animations**: Fluid transitions and micro-interactions
- **Responsive Design**: Optimized for various screen sizes
- **Bottom Tab Navigation**: Easy navigation between Tasks and Settings
- **Modal Interface**: Clean, slide-up modals for task creation/editing

## 🛠️ Technology Stack

### **Frontend Framework**
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation library for screen management

### **State Management**
- **Redux**: Predictable state container
- **Redux Persist**: State persistence across app sessions
- **React Redux**: React bindings for Redux

### **Storage & Data**
- **AsyncStorage**: Local data persistence
- **JSON**: Data serialization format

### **Notifications**
- **Expo Notifications**: Push and local notifications
- **Sound & Vibration**: Rich notification experience

### **UI Components**
- **Expo Checkbox**: Native checkbox component
- **Material Icons**: Icon library
- **Custom Components**: Reusable UI elements

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g @expo/cli`)
- **Expo Go** app on your mobile device (for testing)

## 🚀 Installation & Setup

1. **Clone the Repository**
   ```bash
   git clone <your-repository-url>
   cd justDoIt
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Run on Device**
   - Scan the QR code with Expo Go app (Android)
   - Scan with Camera app (iOS)
   - Or press `a` for Android emulator, `i` for iOS simulator

## 📁 Project Structure

```
justDoIt/
├── assets/                 # App icons and images
│   ├── icon.png
│   ├── splash-icon.png
│   └── ...
├── common/                 # Shared utilities
│   └── colors.js          # Theme color definitions
├── navigation/             # Navigation configuration
│   ├── stackNavigaton.js  # Stack navigator setup
│   └── tabNavigation.js   # Bottom tab navigator
├── redux/                  # State management
│   ├── Action.js          # Redux actions
│   ├── Constant.js        # Action constants
│   ├── RootReducer.js     # Combined reducers
│   ├── Store.js           # Redux store configuration
│   └── ThemeReducer.js    # Theme state reducer
├── ui/                     # Screen components
│   ├── GetStartedScreen.js # Loading/splash screen
│   ├── HomeScreen.js      # Main task management
│   ├── LoadingScreen.js   # Alternative loading screen
│   └── SettingsScreen.js  # App settings
├── App.js                 # Main app component
├── app.json              # Expo configuration
├── index.js              # App entry point
└── package.json          # Dependencies and scripts
```

## 🎮 Usage Guide

### **Adding Tasks**
1. Tap the **+** button in the header
2. Enter task title (required)
3. Add optional description
4. Tap **"Add Task"**
5. Receive notification reminder after 5 seconds

### **Managing Tasks**
- **Complete**: Tap the checkbox to mark as done
- **Edit**: Tap the edit icon to modify task details
- **Delete**: Tap the delete icon and confirm removal

### **Theme Switching**
- **Manual**: Tap the theme toggle in header or settings
- **Automatic**: App syncs with device dark/light mode
- **Persistent**: Theme choice remembered across app sessions

### **Settings**
- Access via bottom tab navigation
- Toggle notifications on/off
- Control sound settings
- View app information

## 🔧 Configuration

### **Notification Settings**
Located in `HomeScreen.js`:
```javascript
// Notification timing (currently 5 seconds)
trigger: { seconds: 5 }

// Notification content
title: "Task Reminder 📝"
body: `Don't forget: ${taskTitle}`
```

### **Storage Keys**
AsyncStorage keys used:
- `@justdoit_todos` - Task data storage
- Redux persist handles theme storage

## 📦 Dependencies

### **Core Dependencies**
```json
{
  "@react-native-async-storage/async-storage": "^2.2.0",
  "@react-navigation/bottom-tabs": "^7.4.2",
  "@react-navigation/native": "^7.1.14",
  "@react-navigation/stack": "^7.4.2",
  "@reduxjs/toolkit": "^2.8.2",
  "expo": "~53.0.20",
  "expo-checkbox": "^4.1.4",
  "expo-notifications": "^0.31.4",
  "react": "19.0.0",
  "react-native": "0.79.5",
  "react-redux": "^9.2.0",
  "redux-persist": "^6.0.0"
}
```

## 🔍 Key Features Explained

### **AsyncStorage Integration**
- All tasks automatically saved to device storage
- Data persists across app restarts
- Efficient JSON serialization

### **Redux State Management**
- Theme state managed globally
- Persistent theme preferences
- Predictable state updates

### **Notification System**
- Local notifications (no server required)
- Smart permission handling
- Rich notification content with emojis

### **Theme System**
- Dynamic color switching
- System theme detection
- Consistent styling across all components

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@dasgajraj](https://github.com/dasgajraj)
- Project: [JustDoIt](https://github.com/dasgajraj/justDoIt)

## 🙏 Acknowledgments

- React Native team for the amazing framework
- Expo team for the development tools
- Redux team for state management solution
- Material Design for the icon library

---

## 📸 Screenshots

### 🌞 Light Theme

<div align="center">

#### Loading Screen
<img width="300" alt="Light Theme - Loading Screen" src="https://github.com/user-attachments/assets/3065e240-7e52-4466-9a91-a77e5482385e" />

*Beautiful animated loading screen with app branding*

#### Home Screen - Task Management
<img width="300" alt="Light Theme - Home Screen" src="https://github.com/user-attachments/assets/679d7b85-07ac-4ee8-a350-5cf3d57a0167" />

*Clean task management interface with intuitive controls*

#### Settings Screen
<img width="300" alt="Light Theme - Settings Screen" src="https://github.com/user-attachments/assets/a6dd2573-22e6-4be6-bb98-80586237c810" />

*Comprehensive settings with theme toggle and preferences*

#### Smart Notifications
<img width="300" alt="Light Theme - Notification" src="https://github.com/user-attachments/assets/a12daf3c-71ff-4833-9869-fe23b18f4fc0" />

*Task reminder notifications with rich content*

</div>

---

### 🌙 Dark Theme

<div align="center">

#### Loading Screen
<img width="300" alt="Dark Theme - Loading Screen" src="https://github.com/user-attachments/assets/ba769367-9c7c-4bc4-9111-bda683b2e1e3" />

*Elegant dark mode loading with smooth animations*

#### Home Screen - Task Management
<img width="300" alt="Dark Theme - Home Screen" src="https://github.com/user-attachments/assets/6d96d8f7-9803-4e5b-aee1-4a153339324f" />

*Dark mode task interface with enhanced readability*

#### Settings Screen
<img width="300" alt="Dark Theme - Settings Screen" src="https://github.com/user-attachments/assets/8bf2b14c-8d05-4b00-b264-48e5c50ddcdd" />

*Dark theme settings with consistent styling*

#### Smart Notifications
<img width="300" alt="Dark Theme - Notification" src="https://github.com/user-attachments/assets/a5417d9c-ee4d-43ad-add5-304e59be052f" />

*Dark mode notifications with completion celebrations*

</div>

---

### ✨ Key Features Showcase

| Feature | Light Mode | Dark Mode |
|---------|------------|-----------|
| **Task Management** | Clean, bright interface | Elegant dark design |
| **Smart Notifications** | 5-second reminders | Completion celebrations |
| **Theme Switching** | Instant toggle | System sync |
| **Data Persistence** | AsyncStorage | Redux persist |

### 🎯 User Experience Highlights

- **🚀 Fast Loading**: Animated splash screen for better UX
- **📱 Intuitive Interface**: Clean task cards with easy actions
- **⚙️ Rich Settings**: Comprehensive configuration options
- **🔔 Smart Alerts**: Timely notifications with sound & vibration
- **🎨 Dynamic Themes**: Seamless light/dark mode switching
- **💾 Auto-Save**: All changes persisted automatically

---

**Made with ❤️ using React Native & Expo**
