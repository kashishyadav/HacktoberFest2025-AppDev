import {
  Theme,
} from './Constant'

export function setTheme(isDarkMode) {
  return {
    type: Theme,
    data: isDarkMode
  };
}

export function toggleTheme() {
  return {
    type: Theme,
  };
}