import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Text, TextInput, HelperText, ActivityIndicator } from "react-native-paper";
import { useForm, Controller, SubmitHandler, set } from "react-hook-form";
import { useSession } from "@/context/AuthContext";
import { loginUser } from "@/api/backend";
import { useSnackbar } from "@/context/SnackbarContext"; // Import SnackbarContext for global snackbar
import { router } from "expo-router";
import CustomButton from "@/components/CustomButton";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";

type FormData = {
	email: string;
	password: string;
};

const REGEX = {
	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
};

const ERROR_MESSAGES = {
	REQUIRED: "This Field Is Required",
	EMAIL_INVALID: "Not a Valid Email",
};

const Login = () => {
	const { signIn } = useSession();
	const { showSnackbar } = useSnackbar(); // Use the snackbar from context
	const [isLoading, setIsLoading] = useState(false);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setIsLoading(true);
		const response = await loginUser(data);
		if (response.statusCode === 200) {
			signIn(response.data);
			setIsLoading(false);
			router.replace("/");
		} else if (response.statusCode === 401) {
			showSnackbar("Invalid Credentials!"); // Show snackbar message
		} else if (response.statusCode === 404) {
			showSnackbar("User not found!"); // Show snackbar message
		} else {
			showSnackbar("Network Error, please connect to the internet!"); // Show snackbar message
		}
		setIsLoading(false);
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

				{/* Password Field */}
				<Controller
					name='password'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput label='Password' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.password} style={styles.input} left={<TextInput.Icon icon='lock' />} secureTextEntry />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
					}}
				/>
				{errors.password && <HelperText type='error'>{errors.password.message}</HelperText>}

				<CustomButton text='Login' onPress={handleSubmit(onSubmit)} style={{ width: "100%" }} />
				<ActivityIndicator animating={isLoading} hidesWhenStopped />
			</View>
		</ThemedScrollContainer>
	);
};

export default Login;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		justifyContent: "center",
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	inputContainer: {
		marginBottom: 20,
	},
	input: {
		marginBottom: 12,
	},
});
