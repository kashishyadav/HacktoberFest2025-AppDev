# FEATURES & ROADMAP

This file lists the current features of the JustDoIt Todo App and a prioritized roadmap for improvements, enhancements, and Hacktoberfest-friendly contributions. If you'd like to work on any item, please open an issue or comment on an existing one to let maintainers know.

---

## Current (implemented) features
- Basic todo/task management with Redux state management.
- Navigation between screens using React Navigation.
- Theme support and settings screen.
- Onboarding and loading screens for better UX.
- Getting started flow for new users.

## Known issues (good first issues)
- **Notifications not working** - Task reminders and notifications need fixing.
- **Missing quick add button** - No floating action button (FAB) for quick task creation.

## Short-term improvements (good first issues)
- Fix notification permissions and local notification scheduling.
- Add floating action button (FAB) on home screen for quick task creation.
- Add task validation (non-empty title, proper formatting).
- Improve error handling for failed operations.
- Add unit tests for Redux actions and reducers.
- Extract common components and add prop validation.

## Medium-term features (help wanted)
- **Priority flags** - Add high/moderate/normal priority levels for tasks.
- **Due dates and reminders** - Add date/time picker and notification scheduling.
- **Subtasks** - Allow breaking down tasks into smaller checklist items.
- Add task filtering and sorting (by priority, due date, completion status).
- Add search functionality to find specific tasks.
- Implement swipe-to-delete and long-press-to-edit gestures.
- Add offline support with local persistence (AsyncStorage).

## Long-term / stretch goals
- Add user authentication and cloud sync for tasks.
- Add task categories and tags for better organization.
- Add collaborative features (shared task lists).
- Add dark/light theme toggle with system preference detection.
- Add accessibility improvements (screen reader support, larger touch targets).
- Add animations for task interactions and navigation.

## Contribution guidance
- Look for issues labeled `good first issue` or `help wanted`.
- Each PR should focus on a single feature or fix (keep changes small).
- Include tests for new Redux actions and UI components where appropriate.
- Follow existing code patterns in `redux/` and `ui/` folders.

## Technical details for contributors
**Key files to understand:**
- `redux/Action.js`, `redux/RootReducer.js` - State management
- `ui/HomeScreen.js` - Main task list interface  
- `navigation/stackNavigaton.js`, `navigation/tabNavigation.js` - App navigation
- `components/` - Reusable UI components

**Useful libraries to consider:**
- `react-native-push-notification` or `notifee` for notifications
- `@react-native-community/datetimepicker` for date/time selection
- `react-native-paper` for Material Design components (FAB, etc.)

## How to propose a feature
1. Open an issue describing what you want to add and why.
2. Include a short design or UX mockup if possible.
3. Reference which files you plan to modify.
4. Ask maintainers for feedback before starting work on large features.

---

If you'd like to work on any specific feature or fix, please comment on the related issue or create a new one. For Hacktoberfest participants, start with the "good first issues" for the best contribution experience!
