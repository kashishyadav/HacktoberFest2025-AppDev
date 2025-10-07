import 'package:flutter/material.dart';
import '../models/calculator_model.dart';
import '../models/history_model.dart';
import '../models/calculator_theme.dart';
import '../widgets/calculator_display.dart';
import '../widgets/calculator_buttons.dart';

/// Main calculator screen with Material 3 design
class CalculatorScreen extends StatefulWidget {
  const CalculatorScreen({super.key});

  @override
  State<CalculatorScreen> createState() => _CalculatorScreenState();
}

class _CalculatorScreenState extends State<CalculatorScreen> {
  late CalculatorModel _calculator;
  late CalculatorHistory _history;
  String? _errorMessage;

  @override
  void initState() {
    super.initState();
    _calculator = CalculatorModel();
    _history = CalculatorHistory();
  }

  /// Handle number input
  void _onNumberPressed(String number) {
    setState(() {
      _calculator.inputDigit(number);
      _errorMessage = null;
    });
  }

  /// Handle operator input
  void _onOperatorPressed(String operator) {
    setState(() {
      _calculator.inputOperator(operator);
      _errorMessage = null;
    });
  }

  /// Handle equals button
  void _onEqualsPressed() {
    try {
      final expression = _buildExpression();
      final result = _calculator.calculate();

      if (expression.isNotEmpty) {
        _history.addCalculation(expression, result);
      }

      setState(() {
        _errorMessage = null;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Error: ${e.toString()}';
      });
    }
  }

  /// Handle decimal point
  void _onDecimalPressed() {
    setState(() {
      _calculator.inputDecimal();
      _errorMessage = null;
    });
  }

  /// Handle clear all
  void _onClearPressed() {
    setState(() {
      _calculator.clear();
      _errorMessage = null;
    });
  }

  /// Handle clear entry
  void _onClearEntryPressed() {
    setState(() {
      _calculator.clearEntry();
      _errorMessage = null;
    });
  }

  /// Handle backspace
  void _onBackspacePressed() {
    setState(() {
      _calculator.backspace();
      _errorMessage = null;
    });
  }

  /// Handle sign toggle
  void _onSignTogglePressed() {
    setState(() {
      _calculator.toggleSign();
      _errorMessage = null;
    });
  }

  // TODO: Add percentage functionality
  // void _onPercentagePressed() {
  //   setState(() {
  //     _calculator.percentage();
  //     _errorMessage = null;
  //   });
  // }

  /// Build expression string for history
  String _buildExpression() {
    if (_calculator.previousOperand.isNotEmpty &&
        _calculator.operator.isNotEmpty) {
      return '${_calculator.previousOperand} ${_calculator.operator} ${_calculator.displayText}';
    }
    return '';
  }

  /// Show history dialog
  void _showHistory() {
    showDialog(
      context: context,
      builder: (context) => _HistoryDialog(
        history: _history,
        onClearHistory: () {
          setState(() {
            _history.clearHistory();
          });
        },
        onSelectCalculation: (expression, result) {
          // TODO: Allow users to reload calculations
          Navigator.of(context).pop();
        },
      ),
    );
  }

  /// Dismiss error message
  void _dismissError() {
    setState(() {
      _errorMessage = null;
    });
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Scaffold(
      backgroundColor: theme.colorScheme.surface,
      body: SafeArea(
        child: Stack(
          children: [
            Column(
              children: [
                // Display section (takes up about 1/3 of screen)
                Expanded(
                  flex: 2,
                  child: CalculatorDisplay(
                    displayText: _calculator.displayText,
                    previousOperand: _calculator.previousOperand.isNotEmpty
                        ? _calculator.previousOperand
                        : null,
                    operator: _calculator.operator.isNotEmpty
                        ? _calculator.operator
                        : null,
                    showHistory: true,
                    onHistoryTap: _showHistory,
                  ),
                ),

                // Button section (takes up about 2/3 of screen)
                Expanded(
                  flex: 3,
                  child: Container(
                    padding: const EdgeInsets.all(16),
                    child: _buildButtonLayout(),
                  ),
                ),
              ],
            ),

            // Error display overlay
            if (_errorMessage != null)
              Positioned(
                top: 0,
                left: 0,
                right: 0,
                child: ErrorDisplay(
                  errorMessage: _errorMessage!,
                  onDismiss: _dismissError,
                ),
              ),
          ],
        ),
      ),
    );
  }

  /// Build the calculator button layout
  Widget _buildButtonLayout() {
    return ButtonGridLayout(
      buttons: [
        // Row 1: AC, CE, ⌫, ÷
        [
          FunctionButton(
            function: CalculatorConstants.clearAll,
            onPressed: _onClearPressed,
          ),
          FunctionButton(
            function: CalculatorConstants.clearEntry,
            onPressed: _onClearEntryPressed,
          ),
          BackspaceButton(onPressed: _onBackspacePressed),
          OperatorButton(
            operator: CalculatorConstants.divide,
            onPressed: () => _onOperatorPressed(CalculatorConstants.divide),
            isSelected: _calculator.operator == CalculatorConstants.divide,
          ),
        ],

        // Row 2: 7, 8, 9, ×
        [
          NumberButton(number: '7', onPressed: () => _onNumberPressed('7')),
          NumberButton(number: '8', onPressed: () => _onNumberPressed('8')),
          NumberButton(number: '9', onPressed: () => _onNumberPressed('9')),
          OperatorButton(
            operator: CalculatorConstants.multiply,
            onPressed: () => _onOperatorPressed(CalculatorConstants.multiply),
            isSelected: _calculator.operator == CalculatorConstants.multiply,
          ),
        ],

        // Row 3: 4, 5, 6, -
        [
          NumberButton(number: '4', onPressed: () => _onNumberPressed('4')),
          NumberButton(number: '5', onPressed: () => _onNumberPressed('5')),
          NumberButton(number: '6', onPressed: () => _onNumberPressed('6')),
          OperatorButton(
            operator: CalculatorConstants.subtract,
            onPressed: () => _onOperatorPressed(CalculatorConstants.subtract),
            isSelected: _calculator.operator == CalculatorConstants.subtract,
          ),
        ],

        // Row 4: 1, 2, 3, +
        [
          NumberButton(number: '1', onPressed: () => _onNumberPressed('1')),
          NumberButton(number: '2', onPressed: () => _onNumberPressed('2')),
          NumberButton(number: '3', onPressed: () => _onNumberPressed('3')),
          OperatorButton(
            operator: CalculatorConstants.add,
            onPressed: () => _onOperatorPressed(CalculatorConstants.add),
            isSelected: _calculator.operator == CalculatorConstants.add,
          ),
        ],

        // Row 5: +/-, 0, ., =
        [
          FunctionButton(
            function: CalculatorConstants.plusMinus,
            onPressed: _onSignTogglePressed,
          ),
          NumberButton(number: '0', onPressed: () => _onNumberPressed('0')),
          DecimalButton(
            onPressed: _onDecimalPressed,
            isEnabled: !_calculator.hasDecimal,
          ),
          EqualsButton(onPressed: _onEqualsPressed),
        ],
      ],
    );
  }
}

/// History dialog widget
class _HistoryDialog extends StatelessWidget {
  final CalculatorHistory history;
  final VoidCallback onClearHistory;
  final void Function(String expression, String result) onSelectCalculation;

  const _HistoryDialog({
    required this.history,
    required this.onClearHistory,
    required this.onSelectCalculation,
  });

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return AlertDialog(
      title: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'History',
            style: theme.textTheme.headlineSmall,
          ),
          if (history.history.isNotEmpty)
            TextButton(
              onPressed: () {
                onClearHistory();
                Navigator.of(context).pop();
              },
              child: const Text('Clear'),
            ),
        ],
      ),
      content: SizedBox(
        width: double.maxFinite,
        height: 400,
        child: history.history.isEmpty
            ? Center(
                child: Text(
                  'No calculations yet',
                  style: theme.textTheme.bodyLarge?.copyWith(
                    color: theme.colorScheme.onSurface.withOpacity(0.6),
                  ),
                ),
              )
            : ListView.builder(
                itemCount: history.history.length,
                itemBuilder: (context, index) {
                  final item = history.history[index];
                  return ListTile(
                    title: Text(item.expression),
                    subtitle: Text(
                      '= ${item.result}',
                      style: theme.textTheme.bodyLarge?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    trailing: Text(
                      _formatTimestamp(item.timestamp),
                      style: theme.textTheme.bodySmall,
                    ),
                    onTap: () =>
                        onSelectCalculation(item.expression, item.result),
                  );
                },
              ),
      ),
      actions: [
        TextButton(
          onPressed: () => Navigator.of(context).pop(),
          child: const Text('Close'),
        ),
      ],
    );
  }

  String _formatTimestamp(DateTime timestamp) {
    final now = DateTime.now();
    final difference = now.difference(timestamp);

    if (difference.inDays > 0) {
      return '${difference.inDays}d ago';
    } else if (difference.inHours > 0) {
      return '${difference.inHours}h ago';
    } else if (difference.inMinutes > 0) {
      return '${difference.inMinutes}m ago';
    } else {
      return 'Just now';
    }
  }
}

/// TODO: Enhancement ideas for contributors
/// 1. Add scientific calculator mode with advanced operations
/// 2. Add unit converter functionality
/// 3. Add currency converter with live exchange rates
/// 4. Add themes and customization options
/// 5. Add voice input/output
/// 6. Add gesture support (swipe to delete, pinch to zoom)
/// 7. Add graph plotting for functions
/// 8. Add equation solver
/// 9. Add statistics calculator
/// 10. Add programmer calculator (hex, binary, octal)
/// 11. Add memory functions (M+, M-, MR, MC)
/// 12. Add calculation export/sharing
/// 13. Add keyboard shortcuts
/// 14. Add accessibility improvements
/// 15. Add landscape mode with extended features
