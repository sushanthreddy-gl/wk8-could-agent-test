import { useDispatch, useSelector } from 'react-redux';
import { loginUser, logout, updateUser } from './authSlice';
import { toggleDarkMode } from './themeSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  return {
    token,
    user,
    loginUser: (data) => dispatch(loginUser(data)),
    logout: () => dispatch(logout()),
    updateUser: (updatedUser) => dispatch(updateUser(updatedUser)),
  };
};

export const useTheme = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return {
    darkMode,
    toggleDarkMode: () => dispatch(toggleDarkMode()),
  };
};
