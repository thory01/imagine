import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// The base URL for API
const BASE_URL = 'https://api.astria.ai';

//custom Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_ASTRIA_API_KEY}`,
  },
});

// Define your API response type
interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Generic GET request
export const get = async <T>(url: string, params?: object): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.get(url, { params });
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// Generic POST request
export const post = async <T>(url: string, data: object): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await apiClient.post(url, data);
    return {
      data: response.data,
      status: response.status,
      statusText: response.statusText,
    };
  } catch (error) {
    handleApiError(error as AxiosError);
    throw error;
  }
};

// Error handling function
const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    console.error('API Error:', error.response.status, error.response.data);
  } else if (error.request) {
    console.error('No response received:', error.request);
  } else {
    console.error('Error:', error.message);
  }
};

// Export the API client
export { apiClient };