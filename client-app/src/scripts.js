function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
    // Password must be at least 6 characters long
    return password.length >= 6;
}

export { validateEmail, validatePassword };