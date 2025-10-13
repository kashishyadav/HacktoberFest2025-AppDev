import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../models/calculator_theme.dart';

/// Base calculator button widget that other button types extend
class CalculatorButton extends StatefulWidget {
  final String text;
  final VoidCallback onPressed;
  final ButtonStyle? style;
  final Color? textColor;
  final double? fontSize;
  final bool isEnabled;

  const CalculatorButton({
    super.key,
    required this.text,
    required this.onPressed,
    this.style,
    this.textColor,
    this.fontSize,
    this.isEnabled = true,
  });

  @override
  State<CalculatorButton> createState() => _CalculatorButtonState();
}

class _CalculatorButtonState extends State<CalculatorButton>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: CalculatorConstants.buttonPressAnimation,
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  void _handleTapDown(TapDownDetails details) {
    _animationController.forward();
    // Add haptic feedback
    HapticFeedback.lightImpact();
  }

  void _handleTapUp(TapUpDetails details) {
    _animationController.reverse();
  }

  void _handleTapCancel() {
    _animationController.reverse();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _scaleAnimation,
      builder: (context, child) {
        return Transform.scale(
          scale: _scaleAnimation.value,
          child: GestureDetector(
            onTapDown: widget.isEnabled ? _handleTapDown : null,
            onTapUp: widget.isEnabled ? _handleTapUp : null,
            onTapCancel: widget.isEnabled ? _handleTapCancel : null,
            child: ElevatedButton(
              onPressed: widget.isEnabled ? widget.onPressed : null,
              style: widget.style ?? CalculatorButtonStyles.numberButtonStyle,
              child: Text(
                widget.text,
                style: TextStyle(
                  fontSize:
                      widget.fontSize ?? CalculatorConstants.buttonFontSize,
                  color: widget.textColor,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

/// Number button (0-9)
class NumberButton extends StatelessWidget {
  final String number;
  final VoidCallback onPressed;

  const NumberButton({
    super.key,
    required this.number,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: number,
      onPressed: onPressed,
      style: CalculatorButtonStyles.numberButtonStyle,
    );
  }
}

/// Operator button (+, -, ×, ÷)
class OperatorButton extends StatelessWidget {
  final String operator;
  final VoidCallback onPressed;
  final bool isSelected;

  const OperatorButton({
    super.key,
    required this.operator,
    required this.onPressed,
    this.isSelected = false,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: operator,
      onPressed: onPressed,
      style: isSelected
          ? CalculatorButtonStyles.operatorButtonStyle.copyWith(
              backgroundColor: WidgetStateProperty.all(Colors.orange.shade700),
            )
          : CalculatorButtonStyles.operatorButtonStyle,
    );
  }
}

/// Function button (AC, CE, +/-, %)
class FunctionButton extends StatelessWidget {
  final String function;
  final VoidCallback onPressed;

  const FunctionButton({
    super.key,
    required this.function,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: function,
      onPressed: onPressed,
      style: CalculatorButtonStyles.functionButtonStyle,
    );
  }
}

/// Equals button with special styling
class EqualsButton extends StatelessWidget {
  final VoidCallback onPressed;

  const EqualsButton({
    super.key,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: CalculatorConstants.equals,
      onPressed: onPressed,
      style: CalculatorButtonStyles.equalsButtonStyle,
      fontSize: 28,
    );
  }
}

/// Decimal point button
class DecimalButton extends StatelessWidget {
  final VoidCallback onPressed;
  final bool isEnabled;

  const DecimalButton({
    super.key,
    required this.onPressed,
    this.isEnabled = true,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: CalculatorConstants.decimal,
      onPressed: onPressed,
      style: CalculatorButtonStyles.numberButtonStyle,
      isEnabled: isEnabled,
    );
  }
}

/// Backspace button
class BackspaceButton extends StatelessWidget {
  final VoidCallback onPressed;

  const BackspaceButton({
    super.key,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: CalculatorConstants.backspace,
      onPressed: onPressed,
      style: CalculatorButtonStyles.functionButtonStyle,
    );
  }
}

/// TODO: Advanced buttons for future enhancements
/// - ScientificButton (sin, cos, tan, log, etc.)
/// - MemoryButton (M+, M-, MR, MC)
/// - ProgrammerButton (AND, OR, XOR, etc.)
/// - UnitConversionButton
/// - CurrencyButton

/// Example: Scientific function button (ready for implementation)
class ScientificButton extends StatelessWidget {
  final String function;
  final VoidCallback onPressed;

  const ScientificButton({
    super.key,
    required this.function,
    required this.onPressed,
  });

  @override
  Widget build(BuildContext context) {
    return CalculatorButton(
      text: function,
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        elevation: 2,
        padding: const EdgeInsets.all(16),
        backgroundColor: Colors.deepPurple.shade100,
        foregroundColor: Colors.deepPurple.shade700,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      fontSize: 18,
    );
  }
}

/// Button grid layout helper
class ButtonGridLayout extends StatelessWidget {
  final List<List<Widget>> buttons;
  final double spacing;

  const ButtonGridLayout({
    super.key,
    required this.buttons,
    this.spacing = 8.0,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: buttons.map((row) {
        return Expanded(
          child: Padding(
            padding: EdgeInsets.symmetric(vertical: spacing / 2),
            child: Row(
              children: row.map((button) {
                return Expanded(
                  child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: spacing / 2),
                    child: button,
                  ),
                );
              }).toList(),
            ),
          ),
        );
      }).toList(),
    );
  }
}
