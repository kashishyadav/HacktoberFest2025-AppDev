# Pokémon Dictionary App

## Overview
This is a practice project created to get familiar with API integration in React Native. The app is a simple Pokémon dictionary that allows users to search for Pokémon by name and view their basic information.

## Purpose
This project was built to practice:
- Fetching data from external APIs
- Handling API responses and errors
- TypeScript interfaces for API data structures
- State management with React hooks
- Conditional rendering based on API responses
- Building a clean mobile UI with React Native

## Features
# Pokémon Dictionary App (PokeApi)

A lightweight React Native app (Expo) that lets users search for Pokémon and view basic details fetched from the public PokeAPI. This repository is prepared for Hacktoberfest contributions — see the Contribution section and `FEATURES.md` for ideas and roadmap.

## Quick links
- Repository: local Expo / React Native app
- Main entry: `app/` (routes and UI)
- Package manager: npm (see `package.json`)

## Table of contents
- Overview
- Features (also in `FEATURES.md`)
- Screenshots
- Tech stack
- Getting started (setup & run)
- Development workflow
- Testing & linting
- Contributing (Hacktoberfest friendly)
- Project structure
- API & data model
- Roadmap
- License & Code of Conduct

## Overview
This project demonstrates integrating the public PokeAPI (https://pokeapi.co/) into a React Native app built with Expo. Users can search for a Pokémon by name and see details like sprites, height, weight, and abilities.

The repository is intentionally small and focused, making it a good candidate for first-time contributors and Hacktoberfest participants.

## Features
Primary app features are listed and maintained in `FEATURES.md`. Example features include:
- Search Pokémon by name
- View front/back sprite (tap to toggle)
- Height, weight, and abilities
- Loading and error states

## Screenshots
Add screenshots or animated GIFs in the `assets/images/` folder and reference them here to help contributors see the UI.

## Tech stack
- React Native + Expo
- TypeScript
- Expo Router
- React Navigation (bottom tabs)
- PokeAPI (https://pokeapi.co/)

## Prerequisites
- Node.js (recommended LTS)
- npm (bundled with Node) or yarn (if you prefer)
- Expo CLI (optional, can use npx)

## Getting started — run locally
1. Clone the repo:

```bash
git clone <your-repo-url>
cd PokeApi
```

2. Install dependencies:

```bash
npm install
```

3. Start the Expo dev server:

```bash
npm start
# or
expo start
```

4. Run on a device or emulator
- For Android: press `a` in the Expo CLI or run `npm run android`
- For iOS (macOS only): press `i` in the Expo CLI or run `npm run ios`
- For web: press `w` or run `npm run web`

Notes:
- If you don't have Expo CLI installed globally, use `npx expo start`.

## Development workflow
- Branch from `main` for new features or fixes. Use topic branches named like `feat/add-sprites-toggle` or `fix/search-debounce`.
- Open a PR with a clear title and description describing the change and why it helps the app.
- Assign reviewers and reference any related issue(s).

### Recommended commits
- Use conventional commits or a clear, consistent style. Example prefixes: `feat:`, `fix:`, `chore:`, `docs:`

## Testing & linting
- Run tests (if any):

```bash
npm test
```

- Run the project's linter (Expo + ESLint):

```bash
npm run lint
```

## Contribution guidelines (Hacktoberfest-friendly)
We welcome contributions! Here's how to get started:

1. Read `FEATURES.md` for ideas and current roadmap.
2. Look for issues labeled `good first issue` or `help wanted`.
3. Comment on the issue you'd like to work on so maintainers know you're working on it.
4. Create a branch from `main` and implement your change.
5. Add or update tests and documentation when relevant.
6. Open a pull request. Use a clear title and include screenshots or steps to verify the change.

Pull request checklist:
- [ ] Branch from `main`
- [ ] Tests added or updated (if applicable)
- [ ] Linted code
- [ ] Updated documentation (if applicable)
- [ ] Description explains intent and steps to verify

Maintainers will review and merge. If your PR needs changes, maintainers will request changes — please update the PR accordingly.

## Project structure
High-level layout (important files / directories):

- `app/` - application routes and UI entry (Expo Router)
- `assets/` - images, fonts, icons
- `package.json` - scripts and dependencies
- `README.md`, `FEATURES.md` - docs for contributors

## API & data model
This app uses the PokeAPI endpoint:

```
GET https://pokeapi.co/api/v2/pokemon/{name}
```

Example TypeScript interface used in the app:

```ts
interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default?: string;
    back_default?: string;
  };
  abilities: Array<{ ability: { name: string } }>;
}
```

Edge cases to consider when contributing:
- Network errors and API rate limits
- Missing sprite images for some Pokémon
- Case-insensitive search

## Roadmap
See `FEATURES.md` for an ordered roadmap. If you'd like to propose or sponsor a feature, open an issue describing the idea and expected behavior.

## Code of Conduct
This project follows a Code of Conduct. Be respectful and constructive when interacting in issues and PRs. By participating, you agree to follow the project's code of conduct.

## License
Specify a license in the repository (for Hacktoberfest it's recommended to use an OSI-approved license like MIT). If you haven't chosen one yet, consider adding a `LICENSE` file.

---
If you'd like, I can also add issue templates, a `CONTRIBUTING.md`, or a `CODE_OF_CONDUCT.md` to make the repo fully Hacktoberfest-ready.

Thank you for preparing this project for contributors!
