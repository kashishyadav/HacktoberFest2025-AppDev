import { Theme } from "./Constant";

const initialState = {
    isDarkMode: false,
}

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case Theme:
      return {
        ...state,
        isDarkMode: action.data !== undefined ? action.data : !state.isDarkMode
      };
    default:
      return state;
  }
};
