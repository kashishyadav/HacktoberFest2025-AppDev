# FEATURES & ROADMAP

This file lists the current features of the Pokémon Dictionary App and a prioritized roadmap for improvements, enhancements, and Hacktoberfest-friendly contributions. If you'd like to work on any item, please open an issue or comment on an existing one to let maintainers know.

---

## Current (implemented) features
- Search for Pokémon by name (basic search input).
- View Pokémon details including:
  - Name
  - Front and back sprites (tap image to toggle view)
  - Height and weight
  - List of abilities
- Loading indicators during API calls.
- Basic error handling for failed requests.


## Short-term improvements (good first issues)
- Add case-insensitive search and trim input whitespace before querying the API.
- Add input debounce to avoid excessive API calls while typing.
- Improve error messages with suggestions (e.g., "Did you mean 'pikachu'?").
- Add unit tests for the search and API-fetching logic (Jest + react-test-renderer).
- Extract API client into a reusable module and add error handling wrappers.
- Add screenshot(s) to `README.md` showing the app UI.


## Medium-term features (help wanted)
- Add caching for fetched Pokémon to reduce API calls and improve responsiveness.
- Add offline support (cache last viewed Pokémon) using AsyncStorage.
- Implement favorite Pokémon list (local persistence).
- Add infinite scrolling / paginated list of Pokémon.
- Add accessibility improvements (labels, proper roles, larger touch targets).


## Long-term / stretch goals
- Add user authentication and remote sync for favorites.
- Add localization (i18n) support for multiple languages.
- Add animations for navigation and sprite toggles.
- Add a web-friendly responsive layout for the same codebase (Expo Web).


## Contribution guidance
- Look for issues labeled `good first issue` or `help wanted`.
- Follow the contribution checklist in `README.md` when opening PRs.
- Include tests for logic-level changes and UI snapshots where appropriate.


## How to propose a feature
1. Open an issue describing what you want to add and why.
2. Include a short design or UX mockup if possible.
3. Optionally propose the implementation approach and any breaking changes.


---

If you'd like, I can also create starter issues for some of the "good first issue" items and add simple templates for PRs and issues. Let me know which items you'd like prioritized for Hacktoberfest and I will create issues and starter tasks.