function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  // Password must be at least 6 characters long
  return password.length >= 6;
}

function validateNumber(value) {
  const regEx = /^-?\d+(\.\d+)?$/;
  return regEx.test(value) && value !== 0;
}

function validationAlphaNumeric(value) {
  const regEx = /^[A-Za-z0-9 ._-]+$/;
  return regEx.test(value) && value.trim() !== '';
}

export {
  validateEmail,
  validatePassword,
  validateNumber,
  validationAlphaNumeric,
};
