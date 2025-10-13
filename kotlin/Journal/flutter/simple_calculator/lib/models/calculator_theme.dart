import 'package:flutter/material.dart';

/// Theme configuration for the calculator
/// This makes it easy for contributors to add new themes
class CalculatorThemes {
  /// Default Material 3 theme
  static ThemeData get defaultTheme => ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.light,
        ),
      );

  /// Dark theme
  static ThemeData get darkTheme => ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.blue,
          brightness: Brightness.dark,
        ),
      );

  /// Scientific calculator theme (example for enhancement)
  static ThemeData get scientificTheme => ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.deepPurple,
          brightness: Brightness.light,
        ),
      );

  /// Retro theme (example for enhancement)
  static ThemeData get retroTheme => ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: Colors.orange,
          brightness: Brightness.light,
        ),
      );

  /// TODO: Add more themes
  /// TODO: Custom color schemes
  /// TODO: Font size preferences
  /// TODO: Button shape preferences
  /// TODO: Animation preferences
}

/// Calculator button styles and configurations
class CalculatorButtonStyles {
  /// Number button style
  static ButtonStyle get numberButtonStyle => ElevatedButton.styleFrom(
        elevation: 2,
        padding: const EdgeInsets.all(16),
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      );

  /// Operator button style
  static ButtonStyle get operatorButtonStyle => ElevatedButton.styleFrom(
        elevation: 2,
        padding: const EdgeInsets.all(16),
        backgroundColor: Colors.orange,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      );

  /// Function button style (AC, +/-, %)
  static ButtonStyle get functionButtonStyle => ElevatedButton.styleFrom(
        elevation: 2,
        padding: const EdgeInsets.all(16),
        backgroundColor: Colors.grey.shade300,
        foregroundColor: Colors.black,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      );

  /// Equals button style
  static ButtonStyle get equalsButtonStyle => ElevatedButton.styleFrom(
        elevation: 3,
        padding: const EdgeInsets.all(16),
        backgroundColor: Colors.orange,
        foregroundColor: Colors.white,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      );

  /// TODO: Add animation styles
  /// TODO: Add haptic feedback options
  /// TODO: Add sound effect options
  /// TODO: Add accessibility improvements
}

/// Constants for the calculator
class CalculatorConstants {
  // Button labels
  static const String clearAll = 'AC';
  static const String clearEntry = 'CE';
  static const String backspace = '⌫';
  static const String equals = '=';
  static const String decimal = '.';

  // Operators
  static const String add = '+';
  static const String subtract = '-';
  static const String multiply = '×';
  static const String divide = '÷';
  static const String modulo = '%';

  // Functions
  static const String plusMinus = '+/-';
  static const String squareRoot = '√';
  static const String square = 'x²';

  // Numbers
  static const List<String> numbers = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9'
  ];

  // Display settings
  static const int maxDisplayDigits = 12;
  static const double displayFontSize = 48.0;
  static const double buttonFontSize = 24.0;

  // Animation durations
  static const Duration buttonPressAnimation = Duration(milliseconds: 100);
  static const Duration displayUpdateAnimation = Duration(milliseconds: 200);

  /// TODO: Add more constants for different calculator modes
  /// TODO: Add scientific calculator constants
  /// TODO: Add programmer calculator constants
  /// TODO: Add unit conversion constants
}
