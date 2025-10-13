# HydrationTracker

A simple Android app (Jetpack Compose + Kotlin) that helps users track daily water intake. The app displays a glass illustration that fills as the user logs drinks, shows the number of glasses consumed, and keeps persistence across app restarts using DataStore.

## Features

- Visual glass illustration with smooth animation showing progress toward the daily hydration goal.
- Increment / decrement buttons to add or remove a glass of water (default glass size 250ml).
- Daily goal tracking (default 5.0 L) with a progress bar and current liters displayed.

## Tech stack

- Kotlin
- Jetpack Compose

## Project structure

- `app/src/main/java/com/example/hydratrack/MainActivity.kt` - App entry point and main Composable screen wiring.
- `app/src/main/java/com/example/hydratrack/IntakeViewModel.kt` - ViewModel that manages UI state and business logic (increase/decrease).
- `app/src/main/java/com/example/hydratrack/data/IntakeDataStore.kt` - Simple DataStore wrapper.
- `app/src/main/java/com/example/hydratrack/ui/GlassComposable.kt` - Custom Compose Canvas that draws and animates the glass filling.
- `app/src/main/java/com/example/hydratrack/ui/theme/` - Theme and typography for Material 3 styling.

## Configuration & constants

- Default glass size: 0.25 L (250 ml) - defined as `GLASS_SIZE` in `IntakeViewModel`.
- Daily goal: 5.0 L - defined as `GOAL_LITERS` in `IntakeViewModel`.

These can be changed in `IntakeViewModel.kt` if you want different defaults.

## Contribution

Suggested features to contribute:
- Add Dark Mode.
- Add settings to customize glass size and daily goal.
- Add notifications/reminders to log water periodically.
- Summary Section.
- Streak Page.
- Haptic or Sound feedback.
- Goal Widget.
 
When submitting changes, open a pull request and describe the feature or bugfix. Keep changes small and focused.
