/**
 * Unit tests for validation utilities
 */

import {
  isValidEmail,
  validatePassword,
  getPasswordStrength,
  isValidOTP,
} from "../validation";

describe("Email Validation", () => {
  test("should validate correct email addresses", () => {
    expect(isValidEmail("test@example.com")).toBe(true);
    expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
    expect(isValidEmail("user+tag@example.org")).toBe(true);
  });

  test("should reject invalid email addresses", () => {
    expect(isValidEmail("invalid")).toBe(false);
    expect(isValidEmail("invalid@")).toBe(false);
    expect(isValidEmail("@example.com")).toBe(false);
    expect(isValidEmail("test@")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("Password Validation", () => {
  test("should validate password rules", () => {
    const weakPassword = "weak";
    const mediumPassword = "Medium1";
    const strongPassword = "StrongPass123";

    const weakChecks = validatePassword(weakPassword);
    const mediumChecks = validatePassword(mediumPassword);
    const strongChecks = validatePassword(strongPassword);

    expect(weakChecks.filter((r) => r.passed).length).toBeLessThan(2);
    expect(mediumChecks.filter((r) => r.passed).length).toBeGreaterThanOrEqual(2);
    expect(strongChecks.filter((r) => r.passed).length).toBe(4);
  });

  test("should check all password requirements", () => {
    const checks = validatePassword("Test1234");
    
    expect(checks[0].passed).toBe(true); // 8+ chars
    expect(checks[1].passed).toBe(true); // uppercase
    expect(checks[2].passed).toBe(true); // lowercase
    expect(checks[3].passed).toBe(true); // number
  });
});

describe("Password Strength", () => {
  test("should return weak for weak passwords", () => {
    expect(getPasswordStrength("weak")).toEqual({ level: "weak", label: "Weak" });
    expect(getPasswordStrength("12345678")).toEqual({ level: "weak", label: "Weak" });
  });

  test("should return medium for medium passwords", () => {
    expect(getPasswordStrength("Medium1")).toEqual({ level: "medium", label: "Medium" });
    expect(getPasswordStrength("Test123")).toEqual({ level: "medium", label: "Medium" });
  });

  test("should return strong for strong passwords", () => {
    expect(getPasswordStrength("StrongPass123")).toEqual({ level: "strong", label: "Strong" });
    expect(getPasswordStrength("Test1234")).toEqual({ level: "strong", label: "Strong" });
  });

  test("should return none for empty password", () => {
    expect(getPasswordStrength("")).toEqual({ level: "none", label: "" });
  });
});

describe("OTP Validation", () => {
  test("should validate 4-digit OTP", () => {
    expect(isValidOTP("1234")).toBe(true);
    expect(isValidOTP("0000")).toBe(true);
    expect(isValidOTP("9999")).toBe(true);
  });

  test("should reject invalid OTP formats", () => {
    expect(isValidOTP("123")).toBe(false); // too short
    expect(isValidOTP("12345")).toBe(false); // too long
    expect(isValidOTP("abcd")).toBe(false); // non-numeric
    expect(isValidOTP("12 34")).toBe(false); // spaces
    expect(isValidOTP("")).toBe(false); // empty
  });
});

