export const apiEndPoint = () => {
  return 'http://localhost:5000';
};

export const configHeader = () => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return config;
};
