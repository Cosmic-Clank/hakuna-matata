import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput, HelperText, Checkbox, ActivityIndicator, Dialog, Portal } from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { sendOtp, registerUser } from "@/api/backend";
import { router } from "expo-router";
import { useSnackbar } from "@/context/SnackbarContext";
import CustomButton from "@/components/CustomButton";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";

type FormData = {
	fname: string;
	lname: string;
	email: string;
	password: string;
	terms: boolean;
};

const REGEX = {
	name: /^[a-z ,.'-]+$/i,
	email: /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i,
	password: /^.{8,20}$/,
};

const ERROR_MESSAGES = {
	REQUIRED: "This Field Is Required",
	NAME_INVALID: "Not a Valid Name",
	EMAIL_INVALID: "Not a Valid Email",
	PASSWORD_INVALID: "Password must be between 8 to 20 characters",
	TERMS: "Terms Must Be Accepted To Continue",
};

const Register = () => {
	const { showSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);
	const [otpDialogVisible, setOtpDialogVisible] = useState(false);
	const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
	const [userOtp, setUserOtp] = useState<string>("");
	const [otpError, setOtpError] = useState<string | null>(null);
	const [data, setData] = useState<FormData | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setData(data);
		setIsLoading(true);
		const otp = String(Math.floor(100000 + Math.random() * 900000));
		setGeneratedOtp(otp);

		const response = await sendOtp(data.email, otp);
		if (response.statusCode === 201) {
			setIsLoading(false);
			showSnackbar(response.message);
			setOtpDialogVisible(true);
		} else if (response.statusCode === 209) {
			showSnackbar(response.message);
			setIsLoading(false);
		} else {
			showSnackbar("Network Error, please connect to the internet!");
			setIsLoading(false);
		}
	};

	const handleOtpVerification = async () => {
		if (userOtp === generatedOtp) {
			setIsLoading(true);
			let response;
			if (data) {
				response = await registerUser(data); // Simulate the registration API
			}
			if (response.statusCode === 201) {
				showSnackbar("Registration successful!");
				setOtpDialogVisible(false);
				router.replace("/signin");
			} else {
				showSnackbar("Error in registration, please try again!");
			}
			setIsLoading(false);
		} else {
			setOtpError("Invalid OTP. Please try again.");
		}
	};

	return (
		<ThemedScrollContainer>
			<Text style={styles.title}>Register</Text>

			{/* First Name Field */}
			<View style={styles.inputArea}>
				<Controller
					name='fname'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput label='First Name' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.fname} style={styles.input} left={<TextInput.Icon icon='account' />} />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						pattern: { message: ERROR_MESSAGES.NAME_INVALID, value: REGEX.name },
					}}
				/>
				{errors.fname && <HelperText type='error'>{errors.fname.message}</HelperText>}
			</View>

			{/* Last Name Field */}
			<View style={styles.inputArea}>
				<Controller
					name='lname'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput label='Last Name' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.lname} style={styles.input} left={<TextInput.Icon icon='account' />} />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						pattern: { message: ERROR_MESSAGES.NAME_INVALID, value: REGEX.name },
					}}
				/>
				{errors.lname && <HelperText type='error'>{errors.lname.message}</HelperText>}
			</View>

			{/* Email Field */}
			<View style={styles.inputArea}>
				<Controller
					name='email'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput label='Email' autoCapitalize='none' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.email} style={styles.input} placeholder='example@example.com' left={<TextInput.Icon icon='email' />} />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						pattern: { message: ERROR_MESSAGES.EMAIL_INVALID, value: REGEX.email },
					}}
				/>
				{errors.email && <HelperText type='error'>{errors.email.message}</HelperText>}
			</View>

			{/* Password Field */}
			<View style={styles.inputArea}>
				<Controller
					name='password'
					control={control}
					render={({ field: { onChange, onBlur, value } }) => <TextInput secureTextEntry autoCapitalize='none' label='Password' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.password} style={styles.input} placeholder='*******' left={<TextInput.Icon icon='lock' />} />}
					rules={{
						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						pattern: { message: ERROR_MESSAGES.PASSWORD_INVALID, value: REGEX.password },
					}}
				/>
				{errors.password && <HelperText type='error'>{errors.password.message}</HelperText>}
			</View>

			{/* Terms and Conditions */}
			<View style={styles.inputArea}>
				<Controller
					name='terms'
					defaultValue={false}
					control={control}
					render={({ field: { onChange, value } }) => <Checkbox.Item label='I agree to the terms and conditions' status={value ? "checked" : "unchecked"} onPress={() => onChange(!value)} />}
					rules={{
						validate: (value) => value === true || ERROR_MESSAGES.TERMS,
					}}
				/>
				{errors.terms && <HelperText type='error'>{errors.terms.message}</HelperText>}
			</View>

			<CustomButton text='Register' onPress={handleSubmit(onSubmit)} style={{ width: "100%" }} />
			<ActivityIndicator animating={isLoading} hidesWhenStopped />

			{/* OTP Dialog */}
			<Portal>
				<Dialog visible={otpDialogVisible} onDismiss={() => setOtpDialogVisible(false)}>
					<Dialog.Title>Enter OTP</Dialog.Title>
					<Dialog.Content>
						<TextInput label='OTP' mode='outlined' value={userOtp} onChangeText={setUserOtp} keyboardType='numeric' style={styles.input} />
						{otpError && <HelperText type='error'>{otpError}</HelperText>}
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setOtpDialogVisible(false)}>Cancel</Button>
						<Button onPress={handleOtpVerification}>Submit</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</ThemedScrollContainer>
	);
};

export default Register;

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
		marginBottom: 10,
	},
	input: {
		marginBottom: 0,
	},
	inputArea: {
		marginBottom: 14,
	},
});
