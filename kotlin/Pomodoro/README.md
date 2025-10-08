# Pomodoro

A simple Pomodoro timer Android app built with Jetpack Compose and Kotlin. The app provides a circular timer with start/pause/reset controls, editable work and break durations, and a minimal Material 3 theme.

## Features

- Circular timer UI showing remaining time for Focus (work) and Break sessions.
- Start / Pause / Reset controls.
- Editable Work and Break durations (minutes) with input validation.
- Automatic mode switching between Work and Break when a timer completes.
- Uses a single ViewModel (`PomodoroViewModel`) with StateFlow for UI state.
- Material 3 theme with light/dark support (dynamic color on Android 12+).

## Tech stack

- Kotlin
- Jetpack Compose

## Project structure

- `app/src/main/java/com/example/pomodoro/MainActivity.kt` - App entry point. Sets up Compose and wires the `PomodoroScreen` with `PomodoroViewModel`.
- `app/src/main/java/com/example/pomodoro/ui/PomodoroViewModel.kt` - ViewModel that holds `TimerState` and the timer logic (start/pause/reset, ticking coroutine, mode switching).
- `app/src/main/java/com/example/pomodoro/ui/PomodoroScreen.kt` - Main Composable UI. Shows the circular timer, controls (play/pause/reset), and labeled number fields for configuring work/break minutes. Contains `CircularTimer` and `LabeledNumberField` composables.
- `app/src/main/java/com/example/pomodoro/ui/theme/` - Theme files:
  - `Theme.kt` - Material 3 theme setup and dynamic color handling.
  - `Color.kt` - Color definitions used by the theme.
  - `Type.kt` - Typography definitions.
- `app/build.gradle.kts` - App Gradle configuration and dependencies.

## Configuration & constants

The default timer settings are defined in `PomodoroViewModel` (see `app/src/main/java/com/example/pomodoro/ui/PomodoroViewModel.kt`):

- Default work minutes: 25 (field: `workMinutes` in `TimerState`).
- Default break minutes: 5 (field: `breakMinutes` in `TimerState`).
- Initial remaining seconds: `workMinutes * 60` (the ViewModel resets `remainingSeconds` appropriately when changing modes or resetting).

You can change these defaults by editing `TimerState` in `PomodoroViewModel.kt`.

## Contribution

Suggested small improvements that make good first PRs:

- Persist timer settings across app restarts (DataStore or Preferences).
- Streaks, summary, analytics page.
- Make Widgets.
- Add notification / foreground service support so the timer continues when the app is backgrounded.
- Add sounds or haptic feedback when a session completes.
- Add theming options (manual dark mode toggle, custom accent colors).
- Add a history or session statistics screen (completed sessions, total focus time).

When submitting changes, open a pull request and describe the feature or bugfix. Keep changes small and focused.
