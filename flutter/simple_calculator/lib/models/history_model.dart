/// History model to track calculator operations
/// This can be extended to save/load history from storage
class CalculatorHistory {
  final List<HistoryItem> _history = [];

  List<HistoryItem> get history => List.unmodifiable(_history);

  /// Add a calculation to history
  void addCalculation(String expression, String result) {
    final item = HistoryItem(
      expression: expression,
      result: result,
      timestamp: DateTime.now(),
    );
    _history.insert(0, item); // Add to beginning for recent-first order

    // Limit history size (configurable for enhancement)
    if (_history.length > 50) {
      _history.removeLast();
    }
  }

  /// Clear all history
  void clearHistory() {
    _history.clear();
  }

  /// Remove specific history item
  void removeItem(int index) {
    if (index >= 0 && index < _history.length) {
      _history.removeAt(index);
    }
  }

  /// Get history as formatted strings for display
  List<String> getFormattedHistory() {
    return _history
        .map((item) => '${item.expression} = ${item.result}')
        .toList();
  }

  /// TODO: Save history to local storage
  /// TODO: Load history from local storage
  /// TODO: Export history to file
  /// TODO: Search through history
  /// TODO: Favorite calculations
}

/// Represents a single calculation in history
class HistoryItem {
  final String expression;
  final String result;
  final DateTime timestamp;

  const HistoryItem({
    required this.expression,
    required this.result,
    required this.timestamp,
  });

  /// Convert to JSON for storage
  /// TODO: Implement JSON serialization
  Map<String, dynamic> toJson() {
    return {
      'expression': expression,
      'result': result,
      'timestamp': timestamp.toIso8601String(),
    };
  }

  /// Create from JSON
  /// TODO: Implement JSON deserialization
  factory HistoryItem.fromJson(Map<String, dynamic> json) {
    return HistoryItem(
      expression: json['expression'] as String,
      result: json['result'] as String,
      timestamp: DateTime.parse(json['timestamp'] as String),
    );
  }
}
