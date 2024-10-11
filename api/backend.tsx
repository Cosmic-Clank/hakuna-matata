import axiosInstance from "./axiosConfig";

export const getUserById = async (id: number) => {
	try {
		const response = await axiosInstance.get(`/get-user-by-id/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

type FormData = {
	fname: string;
	lname: string;
	email: string;
	mobileNumber: string;
	birthDate: Date;
	gender: string;
	nationality: string;
	internationalCode: string;
	allergy: string;
	terms: boolean;
};

export const registerUser = async (data: FormData) => {
	try {
		console.log("Registering using", data);
		const response = await axiosInstance.post("/register", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const loginUser = async (data: { email: string; mobileNumber: string }) => {
	try {
		console.log("Logging in using", data);
		const response = await axiosInstance.post("/login", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return error;
	}
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

export const updateUserAllergies = async (id: string, allergies: string) => {
	try {
		const response = await axiosInstance.put(`/update-user-allergies/${id}`, { allergies });
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateUserBirthDate = async (id: string, birthDate: string) => {
	console.log("Updating birthDate", birthDate);

	try {
		const response = await axiosInstance.put(`/update-user-birthdate/${id}`, { birthDate });
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getSalesCounter = async (id: string) => {
	try {
		const response = await axiosInstance.get(`/get-sales-counter/${id}`);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateProfile = async (id: string, data: any) => {
	try {
		const response = await axiosInstance.put(`/update-user-profile/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
