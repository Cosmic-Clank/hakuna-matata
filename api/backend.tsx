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
	birthdate: Date;
	gender: string;
	nationality: string;
	internationalCode: string;
	allergy: string;
	terms: boolean;
};

export const registerUser = async (data: FormData) => {
	try {
		const response = await axiosInstance.post("/register", data);
		return response.data;
	} catch (error) {
		console.error(error);
		return error;
	}
};

export const loginUser = async (data: { email: string; mobileNumber: string }) => {
	try {
		console.log(data);
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
		return error;
	}
};
