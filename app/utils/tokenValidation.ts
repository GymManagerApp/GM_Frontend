// Helper function to check if token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    // Decode JWT token to get expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Check if token has exp field and if it's expired
    if (payload.exp && payload.exp < currentTime) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat invalid tokens as expired
  }
};
