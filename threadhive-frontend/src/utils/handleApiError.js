import store from '../store';
import { logout } from '../store/authSlice';

export const handleApiError = (error) => {
  if (error.response?.status === 401) {
    store.dispatch(logout());
  }

  return error.response?.data?.message || error.message || 'An error occurred';
};
