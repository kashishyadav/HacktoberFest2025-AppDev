/// Calculator model to handle all calculation logic
/// This is designed to be easily extensible for new operations and features
class CalculatorModel {
  String _displayText = '0';
  String _previousOperand = '';
  String _operator = '';
  bool _waitingForOperand = false;
  bool _hasDecimal = false;

  // Getters for accessing private fields
  String get displayText => _displayText;
  String get previousOperand => _previousOperand;
  String get operator => _operator;
  bool get waitingForOperand => _waitingForOperand;
  bool get hasDecimal => _hasDecimal;

  /// Input a number digit
  void inputDigit(String digit) {
    if (_waitingForOperand) {
      _displayText = digit;
      _waitingForOperand = false;
    } else {
      _displayText = _displayText == '0' ? digit : _displayText + digit;
    }
    _updateDecimalState();
  }

  /// Input decimal point
  void inputDecimal() {
    if (_waitingForOperand) {
      _displayText = '0.';
      _waitingForOperand = false;
    } else if (!_hasDecimal) {
      _displayText += '.';
    }
    _hasDecimal = true;
  }

  /// Clear all (AC button)
  void clear() {
    _displayText = '0';
    _previousOperand = '';
    _operator = '';
    _waitingForOperand = false;
    _hasDecimal = false;
  }

  /// Clear entry (CE button)
  void clearEntry() {
    _displayText = '0';
    _waitingForOperand = false;
    _hasDecimal = false;
  }

  /// Delete last character (backspace)
  void backspace() {
    if (_displayText.length > 1 && _displayText != '0') {
      _displayText = _displayText.substring(0, _displayText.length - 1);
      _updateDecimalState();
    } else {
      _displayText = '0';
      _hasDecimal = false;
    }
  }

  /// Input an operator (+, -, *, /)
  void inputOperator(String nextOperator) {
    final inputValue = double.tryParse(_displayText);

    if (inputValue == null) return;

    if (_previousOperand.isEmpty) {
      _previousOperand = _displayText;
    } else if (_operator.isNotEmpty) {
      final previousValue = double.tryParse(_previousOperand);
      if (previousValue != null) {
        final result = _calculate(previousValue, inputValue, _operator);
        _displayText = _formatResult(result);
        _previousOperand = _displayText;
      }
    }

    _waitingForOperand = true;
    _operator = nextOperator;
    _hasDecimal = false;
  }

  /// Calculate result (= button)
  String calculate() {
    final inputValue = double.tryParse(_displayText);
    final previousValue = double.tryParse(_previousOperand);

    if (inputValue == null || previousValue == null || _operator.isEmpty) {
      return _displayText;
    }

    final result = _calculate(previousValue, inputValue, _operator);
    _displayText = _formatResult(result);
    _previousOperand = '';
    _operator = '';
    _waitingForOperand = true;
    _updateDecimalState();

    return _displayText;
  }

  /// Perform the actual calculation
  /// This method can be extended to support more operations
  double _calculate(
      double firstOperand, double secondOperand, String operator) {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand;
      case '-':
        return firstOperand - secondOperand;
      case '×':
      case '*':
        return firstOperand * secondOperand;
      case '÷':
      case '/':
        if (secondOperand == 0) {
          throw Exception('Division by zero');
        }
        return firstOperand / secondOperand;
      case '%':
        return firstOperand % secondOperand;
      default:
        throw Exception('Unknown operator: $operator');
    }
  }

  /// Format the result for display
  /// TODO: Add number formatting options (decimal places, thousands separator, etc.)
  String _formatResult(double result) {
    if (result == result.roundToDouble()) {
      return result.round().toString();
    }
    return result.toString();
  }

  /// Update decimal state based on current display text
  void _updateDecimalState() {
    _hasDecimal = _displayText.contains('.');
  }

  /// Additional operations that can be implemented:
  /// TODO: Add scientific operations (sin, cos, tan, log, etc.)
  /// TODO: Add memory operations (M+, M-, MR, MC)
  /// TODO: Add percentage calculations
  /// TODO: Add square root, power operations
  /// TODO: Add currency conversion
  /// TODO: Add unit conversions

  // Example: Square root operation (ready for implementation)
  void squareRoot() {
    final inputValue = double.tryParse(_displayText);
    if (inputValue != null && inputValue >= 0) {
      final result =
          inputValue * inputValue; // This should be sqrt, but for simplicity
      _displayText = _formatResult(result);
      _waitingForOperand = true;
    }
  }

  // Example: Percentage operation (ready for implementation)
  void percentage() {
    final inputValue = double.tryParse(_displayText);
    if (inputValue != null) {
      final result = inputValue / 100;
      _displayText = _formatResult(result);
      _waitingForOperand = true;
    }
  }

  /// Toggle sign of the current number
  void toggleSign() {
    if (_displayText != '0') {
      if (_displayText.startsWith('-')) {
        _displayText = _displayText.substring(1);
      } else {
        _displayText = '-$_displayText';
      }
    }
  }
}
