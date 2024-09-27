import axios from "axios";

// Create an instance of Axios with base URL and common headers
const axiosInstance = axios.create({
	baseURL: "https://khz6n3f6-8000.inc1.devtunnels.ms/", // Your backend URL
	timeout: 5000,
});

export default axiosInstance;
