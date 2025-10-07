# 🧮 Simple Calculator - Flutter

A beautiful, extensible calculator app built with Flutter and Material 3 design. Perfect for **Hacktoberfest 2025** contributions! 🎉

[![Flutter](https://img.shields.io/badge/Flutter-3.6.2+-02569B?style=for-the-badge&logo=flutter&logoColor=white)](https://flutter.dev/)
[![Dart](https://img.shields.io/badge/Dart-3.6.2+-0175C2?style=for-the-badge&logo=dart&logoColor=white)](https://dart.dev/)
[![Material 3](https://img.shields.io/badge/Material%203-Enabled-6200EE?style=for-the-badge)](https://m3.material.io/)
[![Hacktoberfest](https://img.shields.io/badge/Hacktoberfest-2025-FF8C00?style=for-the-badge)](https://hacktoberfest.com/)

## 🌟 Features

- ✨ **Material 3 Design**: Beautiful, modern UI following Google's latest design system
- 🧮 **Basic Calculator**: Support for addition, subtraction, multiplication, and division
- 📱 **Responsive Design**: Works perfectly on all screen sizes
- 🔢 **Smart Display**: Auto-formatting with thousands separators and proper decimal handling
- 📚 **Calculation History**: Keep track of your calculations
- 🎨 **Theming Support**: Light and dark themes with easy customization
- ⚡ **Smooth Animations**: Delightful micro-interactions and transitions
- 🔊 **Haptic Feedback**: Tactile button presses for better UX
- 🚫 **Error Handling**: Graceful error messages and recovery
- 📐 **Clean Architecture**: Well-organized, modular code structure

## 🚀 Getting Started

### Prerequisites

- Flutter SDK (3.6.2 or later)
- Dart SDK (3.6.2 or later)
- Android Studio / VS Code with Flutter extensions
- An emulator or physical device for testing

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/simple_calculator.git
   cd simple_calculator
   ```

2. **Install dependencies:**
   ```bash
   flutter pub get
   ```

3. **Run the app:**
   ```bash
   flutter run
   ```

## 🏗️ Project Structure

```
lib/
├── main.dart                           # App entry point
├── models/                             # Data models and business logic
│   ├── calculator_model.dart           # Calculator operations and state
│   ├── history_model.dart             # Calculation history management
│   └── calculator_theme.dart          # Theme configurations and constants
├── screens/                           # App screens
│   └── calculator_screen.dart         # Main calculator interface
└── widgets/                           # Reusable UI components
    ├── calculator_buttons.dart        # Button components (numbers, operators, functions)
    └── calculator_display.dart        # Display components with formatting
```

## 🎯 How to Contribute

We welcome contributions of all levels! Here's how you can get involved:

### 🔰 Good First Issues (Perfect for beginners)

1. **Add More Themes** 🎨
   - Create new color schemes in `calculator_theme.dart`
   - Add seasonal themes (Halloween, Christmas, etc.)
   - Implement high contrast themes for accessibility

2. **Improve Animations** ✨
   - Add button press animations
   - Create number transition effects
   - Add splash animations for operations

3. **Add Sound Effects** 🔊
   - Button press sounds
   - Error notification sounds
   - Success calculation sounds

4. **Enhance Error Messages** 🚨
   - Better error descriptions
   - Multi-language error messages
   - Error animation improvements

### 🚀 Intermediate Features

5. **Scientific Calculator Mode** 🔬
   - Trigonometric functions (sin, cos, tan)
   - Logarithmic functions (log, ln)
   - Power and root operations
   - Constants (π, e)

6. **Unit Converter** 📏
   - Length, weight, temperature conversions
   - Currency converter with API integration
   - Time zone converter

7. **Memory Functions** 💾
   - M+ (Memory Add)
   - M- (Memory Subtract)
   - MR (Memory Recall)
   - MC (Memory Clear)

8. **History Enhancements** 📚
   - Save/load history from storage
   - Search through calculations
   - Export history to files
   - Favorite calculations

### 🔥 Advanced Features

9. **Graph Plotting** 📊
   - Plot mathematical functions
   - Interactive graph manipulation
   - Multiple function overlay

10. **Voice Input/Output** 🗣️
    - Voice command recognition
    - Text-to-speech results
    - Voice-controlled operations

11. **Gesture Support** 👆
    - Swipe gestures for operations
    - Pinch to zoom display
    - Shake to clear

12. **Programmer Calculator** 💻
    - Binary, hexadecimal, octal modes
    - Bitwise operations
    - Number system conversions

### 📝 Contributing Guidelines

1. **Fork the repository** and create your feature branch:
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Follow the coding style:**
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Follow Dart/Flutter conventions
   - Ensure your code is properly formatted (`flutter format .`)

3. **Test your changes:**
   ```bash
   flutter test
   flutter analyze
   ```

4. **Update documentation** if needed:
   - Update this README for new features
   - Add inline code documentation
   - Include screenshots for UI changes

5. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

6. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request** with a clear description of your changes

### 🏷️ Issue Labels

- `good first issue` - Perfect for newcomers
- `enhancement` - New features
- `bug` - Bug fixes needed
- `documentation` - Documentation improvements
- `design` - UI/UX improvements
- `performance` - Performance optimizations
- `accessibility` - Accessibility improvements

## 🧪 Testing

Run the test suite to ensure your changes don't break existing functionality:

```bash
# Run all tests
flutter test

# Run with coverage
flutter test --coverage

# Analyze code
flutter analyze
```

## 📱 Building for Production

### Android
```bash
flutter build apk --release
# or
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

### Web
```bash
flutter build web --release
```

## 🎨 Customization

### Adding New Themes

1. Open `lib/models/calculator_theme.dart`
2. Add your theme to the `CalculatorThemes` class:

```dart
static ThemeData get yourCustomTheme => ThemeData(
  useMaterial3: true,
  colorScheme: ColorScheme.fromSeed(
    seedColor: Colors.yourColor,
    brightness: Brightness.light,
  ),
);
```

3. Update the main app to include your theme

### Adding New Button Types

1. Create your button widget in `lib/widgets/calculator_buttons.dart`:

```dart
class YourCustomButton extends StatelessWidget {
  final String text;
  final VoidCallback onPressed;

  const YourCustomButton({
    super.key,
    required this.text,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: text,
      onPressed: onPressed,
      style: YourButtonStyles.customStyle,
    );
  }
}
```

2. Add it to the calculator layout in `calculator_screen.dart`

## 📚 Resources

- [Flutter Documentation](https://docs.flutter.dev/)
- [Material 3 Design Guidelines](https://m3.material.io/)
- [Dart Language Tour](https://dart.dev/guides/language/language-tour)
- [Flutter Widget Catalog](https://docs.flutter.dev/development/ui/widgets)

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Flutter team for the amazing framework
- Material Design team for the beautiful design system
- All contributors who help make this project better!

## 🌟 Show Your Support

If you found this project helpful, please consider:

- ⭐ Starring the repository
- 🍴 Forking for your own experiments
- 🐛 Reporting bugs you find
- 💡 Suggesting new features
- 📢 Sharing with friends

---

**Happy Calculating! 🧮✨**

Made with ❤️ for Hacktoberfest 2025
