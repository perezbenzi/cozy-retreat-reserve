
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters for validation
  const digitsOnly = phone.replace(/\D/g, '');
  // Check if it has 10-15 digits (international phone number range)
  return digitsOnly.length >= 10 && digitsOnly.length <= 15;
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

export const validateDateRange = (checkIn: Date, checkOut: Date): {
  isValid: boolean;
  error?: string;
} => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (checkIn < today) {
    return {
      isValid: false,
      error: 'Check-in date cannot be in the past'
    };
  }
  
  if (checkOut <= checkIn) {
    return {
      isValid: false,
      error: 'Check-out date must be after check-in date'
    };
  }
  
  return { isValid: true };
};
