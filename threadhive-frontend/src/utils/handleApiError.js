export const handleApiError = (error) => {
  return error.response?.data?.message || error.message || 'An error occurred';
};
