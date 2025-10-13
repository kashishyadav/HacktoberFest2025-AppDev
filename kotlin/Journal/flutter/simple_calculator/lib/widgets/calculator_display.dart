import 'package:flutter/material.dart';
import '../models/calculator_theme.dart';

/// Calculator display widget that shows current input and results
class CalculatorDisplay extends StatefulWidget {
  final String displayText;
  final String? previousOperand;
  final String? operator;
  final bool showHistory;
  final VoidCallback? onHistoryTap;

  const CalculatorDisplay({
    super.key,
    required this.displayText,
    this.previousOperand,
    this.operator,
    this.showHistory = false,
    this.onHistoryTap,
  });

  @override
  State<CalculatorDisplay> createState() => _CalculatorDisplayState();
}

class _CalculatorDisplayState extends State<CalculatorDisplay>
    with SingleTickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: CalculatorConstants.displayUpdateAnimation,
      vsync: this,
    );
    _fadeAnimation = Tween<double>(
      begin: 0.7,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void didUpdateWidget(CalculatorDisplay oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.displayText != widget.displayText) {
      _animationController.reset();
      _animationController.forward();
    }
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: theme.colorScheme.surface,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(24),
          bottomRight: Radius.circular(24),
        ),
        boxShadow: [
          BoxShadow(
            color: theme.shadowColor.withOpacity(0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        children: [
          // History button
          if (widget.showHistory)
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton(
                  onPressed: widget.onHistoryTap,
                  icon: Icon(
                    Icons.history,
                    color: theme.colorScheme.onSurface.withOpacity(0.6),
                  ),
                  tooltip: 'History',
                ),
                const Spacer(),
              ],
            ),

          // Previous calculation (small text)
          if (widget.previousOperand != null && widget.operator != null)
            Padding(
              padding: const EdgeInsets.only(bottom: 8),
              child: Text(
                '${widget.previousOperand} ${widget.operator}',
                style: theme.textTheme.bodyLarge?.copyWith(
                  color: theme.colorScheme.onSurface.withOpacity(0.6),
                ),
                textAlign: TextAlign.end,
              ),
            ),

          // Main display
          AnimatedBuilder(
            animation: _fadeAnimation,
            builder: (context, child) {
              return Opacity(
                opacity: _fadeAnimation.value,
                child: _buildMainDisplay(theme),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildMainDisplay(ThemeData theme) {
    return Container(
      width: double.infinity,
      constraints: const BoxConstraints(minHeight: 80),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        reverse: true, // Start from the right
        child: Text(
          _formatDisplayText(widget.displayText),
          style: theme.textTheme.displayLarge?.copyWith(
            fontSize: _calculateFontSize(widget.displayText),
            fontWeight: FontWeight.w300,
            color: theme.colorScheme.onSurface,
          ),
          textAlign: TextAlign.end,
        ),
      ),
    );
  }

  /// Format the display text for better readability
  String _formatDisplayText(String text) {
    // Handle error states
    if (text.toLowerCase().contains('error') ||
        text.toLowerCase().contains('infinity')) {
      return text;
    }

    // Parse the number
    final number = double.tryParse(text);
    if (number == null) return text;

    // Format large numbers with commas (can be enhanced)
    if (number.abs() >= 1000 && number == number.roundToDouble()) {
      return _addThousandsSeparator(number.round().toString());
    }

    // Limit decimal places for very small numbers
    if (number.abs() < 0.000001 && number != 0) {
      return number.toStringAsExponential(2);
    }

    // Limit total length
    if (text.length > CalculatorConstants.maxDisplayDigits) {
      return number.toStringAsExponential(2);
    }

    return text;
  }

  /// Add thousands separator (can be customized for different locales)
  String _addThousandsSeparator(String numberString) {
    final regExp = RegExp(r'\B(?=(\d{3})+(?!\d))');
    return numberString.replaceAllMapped(regExp, (match) => ',');
  }

  /// Calculate font size based on text length for responsive display
  double _calculateFontSize(String text) {
    const baseFontSize = CalculatorConstants.displayFontSize;
    final length = text.length;

    if (length <= 6) return baseFontSize;
    if (length <= 8) return baseFontSize * 0.9;
    if (length <= 10) return baseFontSize * 0.8;
    if (length <= 12) return baseFontSize * 0.7;
    return baseFontSize * 0.6;
  }
}

/// Secondary display for showing calculation progress
class CalculationProgressDisplay extends StatelessWidget {
  final String expression;
  final bool isVisible;

  const CalculationProgressDisplay({
    super.key,
    required this.expression,
    this.isVisible = true,
  });

  @override
  Widget build(BuildContext context) {
    if (!isVisible || expression.isEmpty) {
      return const SizedBox.shrink();
    }

    final theme = Theme.of(context);

    return AnimatedOpacity(
      opacity: isVisible ? 1.0 : 0.0,
      duration: const Duration(milliseconds: 200),
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
        child: Text(
          expression,
          style: theme.textTheme.bodyMedium?.copyWith(
            color: theme.colorScheme.onSurface.withOpacity(0.7),
          ),
          textAlign: TextAlign.end,
        ),
      ),
    );
  }
}

/// Error display widget for calculation errors
class ErrorDisplay extends StatefulWidget {
  final String errorMessage;
  final VoidCallback onDismiss;

  const ErrorDisplay({
    super.key,
    required this.errorMessage,
    required this.onDismiss,
  });

  @override
  State<ErrorDisplay> createState() => _ErrorDisplayState();
}

class _ErrorDisplayState extends State<ErrorDisplay>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -1),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    ));

    _controller.forward();

    // Auto-dismiss after 3 seconds
    Future.delayed(const Duration(seconds: 3), () {
      if (mounted) {
        _controller.reverse().then((_) => widget.onDismiss());
      }
    });
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return SlideTransition(
      position: _slideAnimation,
      child: Container(
        margin: const EdgeInsets.all(16),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: theme.colorScheme.errorContainer,
          borderRadius: BorderRadius.circular(12),
          boxShadow: [
            BoxShadow(
              color: theme.shadowColor.withOpacity(0.2),
              blurRadius: 8,
              offset: const Offset(0, 2),
            ),
          ],
        ),
        child: Row(
          children: [
            Icon(
              Icons.error_outline,
              color: theme.colorScheme.onErrorContainer,
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                widget.errorMessage,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onErrorContainer,
                ),
              ),
            ),
            IconButton(
              onPressed: () =>
                  _controller.reverse().then((_) => widget.onDismiss()),
              icon: Icon(
                Icons.close,
                color: theme.colorScheme.onErrorContainer,
                size: 20,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

/// TODO: Additional display enhancements
/// - Graph display for function plotting
/// - Unit conversion display
/// - Currency conversion rates display
/// - Scientific notation formatting options
/// - Custom number formatting (locale-specific)
/// - Voice input/output display
/// - Accessibility improvements (screen reader support)
/// - Custom display themes and colors
