/**
 * Authentication Service for managing admin credentials
 */

// Define the data structure
export interface AuthData {
  username: string;
  password: string;
  whatsappNumber: string;
}

// Default data
const defaultAuth: AuthData = {
  username: "carlospiquet",
  password: "P@iquet415263",
  whatsappNumber: "5521977434614",
};

// Get auth data from localStorage or use default
export const getAuthData = (): AuthData => {
  try {
    const savedData = localStorage.getItem("adminAuthData");
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error("Error retrieving auth data:", error);
  }
  return defaultAuth;
};

// Save auth data to localStorage
export const saveAuthData = (data: AuthData): boolean => {
  try {
    localStorage.setItem("adminAuthData", JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Error saving auth data:", error);
    return false;
  }
};

// Reset auth data to default
export const resetAuthData = (): boolean => {
  try {
    localStorage.setItem("adminAuthData", JSON.stringify(defaultAuth));
    return true;
  } catch (error) {
    console.error("Error resetting auth data:", error);
    return false;
  }
};

// Validate credentials
export const validateCredentials = (
  username: string,
  password: string,
): boolean => {
  const authData = getAuthData();
  return username === authData.username && password === authData.password;
};

// Get WhatsApp number
export const getWhatsAppNumber = (): string => {
  const authData = getAuthData();
  return authData.whatsappNumber;
};
