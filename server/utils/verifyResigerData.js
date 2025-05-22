const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password) => {
  const passwordRegex = /^[a-zA-Z0-9]+$/;
  return passwordRegex.test(String(password));
};

module.exports = { isValidEmail, isValidPassword };
