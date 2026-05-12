import { createSlice } from '@reduxjs/toolkit';

const getStoredToken = () => {
  const token = localStorage.getItem('token');
  return token && token !== 'undefined' && token !== 'null' ? token : null;
};

const getStoredUser = () => {
  const storedUser = localStorage.getItem('user');
  if (!storedUser || storedUser === 'undefined' || storedUser === 'null') {
    return null;
  }

  try {
    return JSON.parse(storedUser);
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: getStoredToken(),
    user: getStoredUser(),
  },
  reducers: {
    loginUser(state, action) {
      const data = action.payload ?? {};

      if (data.token) {
        state.token = data.token;
        localStorage.setItem('token', data.token);
      }

      if (data.user) {
        state.user = data.user;
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    },
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    updateUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
  },
});

export const { loginUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
