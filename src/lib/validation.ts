// Phone number validation for Kenyan format
export const validatePhoneNumber = (phone: string): boolean => {
  // Accept formats like: 254712345678, +254712345678, 0712345678
  const phoneRegex = /^(?:\+254|0)[17]\d{8}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
};

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push("Password must be at least 8 characters");
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  if (!/[!@#$%^&*()_+=\[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push("Password must contain at least one special character (!@#$%^&*, etc.)");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

// Format phone number to standard format
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/[\s-]/g, "");
  if (cleaned.startsWith("0")) {
    return "254" + cleaned.slice(1);
  }
  if (cleaned.startsWith("+254")) {
    return cleaned.replace("+", "");
  }
  return cleaned;
};

// Check if email format is university-friendly
export const isUniversityEmail = (email: string): boolean => {
  return email.includes("@maseno.ac.ke") || email.includes("@maseno.university");
};