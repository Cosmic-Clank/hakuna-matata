import { handleApiRequest, axiosInstance } from "./axiosConfig";

export const getUserDataByCode = async (code: number) => {
	console.log("Getting user data for", code);
	return handleApiRequest(`/get-user-data/${code}`, "get");
};

export const registerUser = async (data: { fname: string; lname: string; email: string; password: string; terms: boolean }) => {
	console.log("Registering using", data);
	return handleApiRequest("/register", "post", data);
};

export const sendOtp = async (email: string, otp: string) => {
	console.log("Sending OTP to", email);
	return handleApiRequest("/send-otp", "post", { email, otp });
};

export const loginUser = async (data: { email: string; password: string }) => {
	console.log("Logging in using", data);
	return handleApiRequest("/login", "post", data);
};

export const healthCheck = async () => {
	try {
		const response = await axiosInstance.get("/");
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteUser = async (id: string) => {
	console.log("Deleting user", id);
	return handleApiRequest(`/delete-user/${id}`, "delete");
};

export const updateProfile = async (id: string, data: any) => {
	console.log("Updating profile", data);
	return handleApiRequest(`/update-user-profile/${id}`, "put", data);
};
