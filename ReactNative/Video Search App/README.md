# Video Search App

A mobile application built using React Native that provides a YouTube-like interface for searching and viewing video content. It fetches your queries using the YouTube Data API and presents results in a clean, intuitive list view.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Third-Party APIs](#third-party-apis)
- [Installation](#installation)
- [Usage](#usage)
- [Tutorial](#tutorial)

## Overview
Video Search App is a lightweight, responsive mobile application that allows users to search for videos using YouTube's extensive database. It's built with React Native, making it compatible with both iOS and Android platforms while maintaining a native feel.

## Features
- Real-time video search functionality
- Clean and intuitive user interface
- Responsive design for various screen sizes
- Video thumbnail previews
- Search results in a scrollable list format
- Native performance on both iOS and Android

## Architecture
The application follows a modern React Native architecture:

```
video_search_app/
├── src/
│   ├── apis/          # API configurations and endpoints
│   │   ├── key.js     # API key configuration
│   │   └── youtube.js # YouTube API setup
│   └── components/    # Reusable UI components
│       └── ListItem.js # Video list item component
├── App.js            # Main application component
└── assets/          # Static assets
```

### Key Technologies
- **React Native**: Core framework for mobile development
- **React Hooks**: For state management (useState)
- **Axios**: For API requests
- **YouTube Data API**: For fetching video data

## Third-Party APIs
- **YouTube Data API v3**
  - Used for searching videos
  - Provides video metadata including titles, thumbnails, and descriptions
  - Requires API key configuration

## Installation
1. Clone the repository:
```bash
git clone https://github.com/Daksh2356/video_search_app.git
```

2. Install dependencies:
```bash
cd video_search_app
npm install
```

3. Configure YouTube API:
   - Create a project in Google Cloud Console
   - Enable YouTube Data API v3
   - Create API credentials
   - Copy the template file for API key:
     ```bash
     cp src/apis/key.template.js src/apis/key.js
     ```
   - Open `src/apis/key.js` and replace `YOUR_YOUTUBE_API_KEY` with your actual YouTube Data API key
   
   > **Security Note**: The `key.js` file is gitignored to prevent accidentally committing your API key.
   > Never commit your actual API keys to version control.
   > The template file `key.template.js` is provided as a reference for the required format.

4. Install Expo CLI globally (if not already installed):
```bash
npm install -g expo-cli
```

5. Start the application:

### Using Expo (Recommended for Development)
```bash
npx expo start
```
This will open the Expo Developer Tools in your browser. From here you can:
- Press `w` to open in web browser
- Press `a` to open in Android emulator/device
- Press `i` to open in iOS simulator
- Scan the QR code with your phone's camera to open in Expo Go app

### Using React Native CLI

For Android:
```bash
# Generate android folder if it doesn't exist
npx react-native eject
# Build and run on Android
npx react-native run-android
```

For iOS:
```bash
cd ios
# Install pods if running first time
pod install
cd ..
# Build and run on iOS
npx react-native run-ios
```

For Web:
```bash
# Install web dependencies
npm install react-native-web react-dom
# Start web server
npx expo start --web
```

### Build for Production

For Android:
```bash
cd android
./gradlew assembleRelease
```
The APK will be available at `android/app/build/outputs/apk/release/app-release.apk`

For iOS:
1. Open `ios/video_search_app.xcworkspace` in Xcode
2. Select `Product > Archive` from the menu
3. Follow the distribution steps in Xcode

For Web:
```bash
npx expo export:web
```
The web build will be available in the `web-build` directory.

## Usage
1. Launch the application
2. Enter your search query in the search bar
3. Tap the red "Search" button
4. Browse through the list of video results

## Tutorial
[Watch the Video Tutorial](https://drive.google.com/file/d/1Te3PcEqcWcpghIDqVkKq7B4SQMAM6gJ2/view?usp=sharing)

---
Built with ❤️ by Daksh Makhija