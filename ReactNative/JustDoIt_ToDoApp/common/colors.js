const lightTheme = {
  backgroundColor: "#f5f5f5",
  cardBackground: "white",
  textColor: "#333",
  textSecondary: "#666",
  borderColor: "#e0e0e0",
  primary: "#2196F3",
  success: "#4CAF50",
  warning: "#FF9800",
  error: "#F44336",
  surface: "#ffffff",
  shadow: "#000000",
  
  background: "#f5f5f5",
  card: "white",
  text: "#333",
  subtext: "#666",
  border: "#e0e0e0",
};

const darkTheme = {
  backgroundColor: "#121212",
  cardBackground: "#1e1e1e",
  textColor: "#ffffff",
  textSecondary: "#a0a0a0",
  borderColor: "#333333",
  primary: "#64b5f6",
  success: "#66BB6A",
  warning: "#FFB74D",
  error: "#EF5350",
  surface: "#2c2c2c",
  shadow: "#000000",
  
  background: "#121212",
  card: "#1e1e1e",
  text: "#ffffff",
  subtext: "#a0a0a0",
  border: "#333333",
};

export const colors = {
  light: lightTheme,
  dark: darkTheme,
};

export const useThemeColors = (isDarkMode) => {
  return isDarkMode ? darkTheme : lightTheme;
};