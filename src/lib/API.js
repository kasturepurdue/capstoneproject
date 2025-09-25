// api.js
const API_BASE_URL = 'https://your-api-gateway-url.com';

export const apiClient = {
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  },
  

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
  
  // Add other methods (PUT, DELETE, etc.) as needed
