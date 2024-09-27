import axios from "axios";

// Create an instance of Axios with base URL and common headers
const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_BASEURL, // Your backend URL
	timeout: 5000,
});

export default axiosInstance;
