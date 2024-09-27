import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput, HelperText, useTheme } from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useSession } from "@/context/AuthContext";
import { loginUser } from "@/api/backend";
import { useSnackbar } from "@/context/SnackbarContext"; // Import SnackbarContext for global snackbar
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import ThemedContainer from "@/components/ThemedContainer";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";

type FormData = {
	email: string;
	mobileNumber: string;
};

const REGEX = {
	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	mobileNumber: /^05\d{8}$/i,
};

const ERROR_MESSAGES = {
	REQUIRED: "This Field Is Required",
	EMAIL_INVALID: "Not a Valid Email",
	PHONE_INVALID: "Not a Valid UAE Phone Number",
};

const Login = () => {
	const { signIn } = useSession();
	const { showSnackbar } = useSnackbar(); // Use the snackbar from context
	const theme = useTheme();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		try {
			const response = await loginUser(data);
			if (response.statusCode !== 200) {
				showSnackbar(response.message || "Login Failed"); // Show snackbar message
				return;
			} else {
				signIn(response.data);
				router.replace("/");
			}
		} catch (error) {
			showSnackbar("Connect to the internet"); // Show snackbar for error
		}
	};

	return (
		<ThemedScrollContainer contentContainerStyle={styles.container}>
			<Text style={styles.title}>Login</Text>

			<View style={styles.inputContainer}>
				{/* Email Field */}
				<Controller
					name='email'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput label='Email' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.email} style={styles.input} left={<TextInput.Icon icon='email' />} />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						pattern: { message: ERROR_MESSAGES.EMAIL_INVALID, value: REGEX.email },
					}}
				/>
				{errors.email && <HelperText type='error'>{errors.email.message}</HelperText>}

				{/* Mobile Number Field */}
				<Controller
					name='mobileNumber'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput label='Mobile Number' placeholder='05XXXXXXXX' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.mobileNumber} style={styles.input} left={<TextInput.Icon icon='phone' />} />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						pattern: { message: ERROR_MESSAGES.PHONE_INVALID, value: REGEX.mobileNumber },
					}}
				/>
				{errors.mobileNumber && <HelperText type='error'>{errors.mobileNumber.message}</HelperText>}

				<CustomButton text='Login' onPress={handleSubmit(onSubmit)} style={{ width: "100%" }} />
			</View>
		</ThemedScrollContainer>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: "#fff",
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		color: "#333",
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		marginBottom: 12,
	},
});
