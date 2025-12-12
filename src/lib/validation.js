/**
 * Validation utilities for password reset flow
 */

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email address
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid
 */
export const isValidEmail = (email) => {
  return emailRegex.test(email);
};

/**
 * Password validation rules
 */
export const passwordRules = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
];

/**
 * Validates password against rules
 * @param {string} password - Password to validate
 * @returns {Array<{label: string, passed: boolean}>} - Array of rule results
 */
export const validatePassword = (password) => {
  return passwordRules.map((rule) => ({
    ...rule,
    passed: rule.test(password),
  }));
};

/**
 * Gets password strength level
 * @param {string} password - Password to check
 * @returns {{level: string, label: string}} - Strength level and label
 */
export const getPasswordStrength = (password) => {
  if (!password) return { level: "none", label: "" };
  
  const passedRules = passwordRules.filter((rule) => rule.test(password)).length;
  
  if (passedRules < 2) return { level: "weak", label: "Weak" };
  if (passedRules < 4) return { level: "medium", label: "Medium" };
  return { level: "strong", label: "Strong" };
};

/**
 * Validates OTP format (4 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean} - True if valid
 */
export const isValidOTP = (otp) => {
  return /^\d{4}$/.test(otp);
};

