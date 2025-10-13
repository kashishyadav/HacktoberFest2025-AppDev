import 'package:flutter/material.dart';
import 'models/calculator_theme.dart';
import 'screens/calculator_screen.dart';

void main() {
  runApp(const SimpleCalculatorApp());
}

class SimpleCalculatorApp extends StatelessWidget {
  const SimpleCalculatorApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Simple Calculator',
      debugShowCheckedModeBanner: false,
      theme: CalculatorThemes.defaultTheme,
      darkTheme: CalculatorThemes.darkTheme,
      themeMode: ThemeMode.system,
      home: const CalculatorScreen(),
    );
  }
}
