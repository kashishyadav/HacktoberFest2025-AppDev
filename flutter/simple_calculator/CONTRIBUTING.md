# Contributing to Simple Calculator

Thank you for your interest in contributing to Simple Calculator! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to see if the problem has already been reported. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots or GIFs if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and explain which behavior you expected to see instead**
- **Explain why this enhancement would be useful**

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Setup

1. Ensure you have Flutter installed (3.6.2+)
2. Clone your fork of the repository
3. Run `flutter pub get` to install dependencies
4. Run `flutter analyze` to check for any issues
5. Run `flutter test` to run the test suite

## Style Guide

### Dart Style Guide

- Follow the official [Dart Style Guide](https://dart.dev/guides/language/effective-dart/style)
- Use `flutter format .` to format your code
- Use meaningful variable and function names
- Add documentation comments for public APIs
- Keep functions small and focused

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### Flutter/Dart Conventions

- Use `const` constructors where possible
- Prefer `final` over `var` where possible
- Use trailing commas in parameter lists and collection literals
- Organize imports: dart libraries, package libraries, relative imports
- Use `late` keyword appropriately for non-nullable variables

## Project Structure Guidelines

When adding new features, please follow the existing project structure:

- **Models** (`lib/models/`): Data models and business logic
- **Screens** (`lib/screens/`): Full-screen widgets
- **Widgets** (`lib/widgets/`): Reusable UI components
- **Utils** (`lib/utils/`): Utility functions and helpers (if needed)

## Testing Guidelines

- Write tests for new functionality
- Maintain existing test coverage
- Use descriptive test names
- Test edge cases and error conditions

## Documentation Guidelines

- Update the README.md for new features
- Add inline code documentation for complex logic
- Include examples in documentation where helpful
- Keep documentation up to date with code changes

## Good First Issues

Look for issues labeled `good first issue` if you're new to the project. These are typically:

- Adding new themes
- Improving animations
- Adding sound effects
- Enhancing error messages
- Improving documentation

## Feature Requests

We welcome feature requests! Some ideas for contributions:

### Beginner Friendly
- New color themes
- Button animations
- Sound effects
- Improved error messages
- Unit tests

### Intermediate
- Scientific calculator functions
- Memory operations (M+, M-, MR, MC)
- History enhancements
- Unit conversions
- Settings screen

### Advanced
- Graph plotting
- Voice input/output
- Gesture support
- Custom keyboard shortcuts
- Advanced mathematical functions

## Questions?

Don't hesitate to ask questions by creating an issue with the `question` label. We're here to help!

## Recognition

Contributors will be recognized in our README and release notes. Thank you for making this project better! 🚀