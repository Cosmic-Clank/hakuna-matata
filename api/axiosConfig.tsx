import axios from "axios";

// Create an instance of Axios with base URL and common headers
export const axiosInstance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_BACKEND_BASEURL, // Your backend URL
	timeout: 5000,
});

// Generic API request handler
export const handleApiRequest = async (url: string, method: "get" | "post" | "put" | "delete", data: object = {}, config: object = {}): Promise<any> => {
	try {
		const response = await axiosInstance({
			url,
			method,
			data,
			...config,
		});
		return response.data;
	} catch (error) {
		console.error(`Error in API request to ${url}:`, error);
		if (axios.isAxiosError(error)) {
			return error.response?.data || "An error occurred";
		}
		return "Unexpected error";
	}
};
