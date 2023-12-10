import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

// Define the API call function signature
interface ApiCallFunction {
  (url: string, method?: string, data?: any, headers?: Record<string, string>): Promise<any>;
}

// Exported function for making API calls
const apiCall: ApiCallFunction = async (url, method = 'get', data = null, headers = {}) => {
  try {
    // Axios configuration
    const config: AxiosRequestConfig = {
      method: method,
      url: url,
      data: data,
      headers: headers,
    };

    // Make the API call
    const response: AxiosResponse = await axios(config);

    // Return the response data
    return response.data;
  } catch (error:any) {
    // Handle errors
    if (axios.isAxiosError(error)) {
      // Axios error
      const axiosError: AxiosError = error;

      if (axiosError.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response error:', axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('No response received:', axiosError.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Request setup error:', axiosError.message);
      }
    } else {
      // Non-Axios error
      console.error('An error occurred:', error.message);
    }

    // Return an error object
    return { error: true, message: 'An error occurred while making the API call.' };
  }
};

// Export the function
export default apiCall;
