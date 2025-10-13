# Journal

A lightweight Android Journal app built with Jetpack Compose and Kotlin. It lets users create, edit, tag, and view journal entries. The app uses Room for local persistence and follows a simple MVVM pattern with Compose navigation.

## Features

- Create, edit and delete journal entries.
- Tagging and simple tag-based filtering.
- Rich-text-like inline formatting: `**bold**`,` _italic_`, and `~underline~` (simple parser + preview).
- List view with card previews and a detail view for each entry.
- Local persistence using Room (Room Database, DAO, Repository).
- Navigation using Jetpack Compose Navigation.

## Tech stack

- Kotlin
- Jetpack Compose
- Room

## Project structure

- `app/src/main/java/com/example/journal/MainActivity.kt` - App entry point; creates the database and repository and sets up the Compose host.
- `app/src/main/java/com/example/journal/data/JournalEntry.kt` - Room `@Entity` data class for a journal entry.
- `app/src/main/java/com/example/journal/data/JournalDao.kt` - Room DAO with queries for observing, searching, upserting and deleting entries.
- `app/src/main/java/com/example/journal/data/JournalDatabase.kt` - Room database singleton.
- `app/src/main/java/com/example/journal/data/JournalRepository.kt` - Simple repository wrapping DAO operations.
- `app/src/main/java/com/example/journal/ui/JournalViewModels.kt` - `ListViewModel` for the home list and `EditViewModel` for creating/editing entries.
- `app/src/main/java/com/example/journal/ui/navigation/NavGraph.kt` - Compose `NavHost` wiring the three main routes and providing view models.
- `app/src/main/java/com/example/journal/ui/screens/HomeScreen.kt` - List screen with tag chips and add button.
- `app/src/main/java/com/example/journal/ui/screens/EditScreen.kt` - Editor screen with toolbar (wrap selection with tokens), tag selection, save/delete.
- `app/src/main/java/com/example/journal/ui/screens/DetailScreen.kt` - Detail screen for viewing and deleting an entry.
- `app/src/main/java/com/example/journal/ui/richtext/RichText.kt` - Small parser `parseSimpleMarkdown` that converts tokens (** _ ~) into styled `AnnotatedString` spans.
- `app/src/main/java/com/example/journal/ui/theme/` - Theme, colors and typography for the app (Material3 styling).

## Configuration & constants

- Database file: `journal.db` (set in `JournalDatabase`).
- Default tags: `ListViewModel` initializes tags with `listOf("All", "Temp", "Winter Arc")` — change in `ListViewModel` if you want different defaults.

## Contribution suggestions

Ideas for contributions or improvements:
- Add search UI state preservation and search suggestions.
- Add export/import for entries (JSON/Markdown/PDF) and backup/restore.
- Add unit tests for `parseSimpleMarkdown` and ViewModel logic.
- Add dark mode support and theme toggles.
- Add graphs, drawing, checklists, Voice-to-Text, attachments, etc.
- Calendar view for streaks.
- Mood tracking using emojis.
- Move recently deleted to Trash Bin before permanently deleting.
- Improve editor selection handling and add undo/redo.

When submitting changes, open a pull request and describe the feature or bugfix. Keep changes small and focused.
