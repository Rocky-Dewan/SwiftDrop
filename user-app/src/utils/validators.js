export const isPhoneValid = (phone) => {
  // simple check: 11 digits for BD typical numbers
  return /^\d{11}$/.test(phone);
};

export const isNotEmpty = (s) => !!s && s.trim().length > 0;
