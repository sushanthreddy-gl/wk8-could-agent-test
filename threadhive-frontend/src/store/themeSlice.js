import { createSlice } from '@reduxjs/toolkit';

const getInitialDarkMode = () => {
  try {
    return localStorage.getItem('darkMode') === 'true';
  } catch {
    return false;
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    darkMode: getInitialDarkMode(),
  },
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem('darkMode', String(state.darkMode));
    },
  },
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;
