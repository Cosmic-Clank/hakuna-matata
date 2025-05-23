// import { ScrollView, StyleSheet, View } from "react-native";
// import React, { useState } from "react";
// import { Button, Text, TextInput, HelperText, Checkbox, ActivityIndicator } from "react-native-paper";
// import { useForm, Controller, SubmitHandler } from "react-hook-form";
// import { en, registerTranslation, DatePickerInput } from "react-native-paper-dates";
// import SelectDropdown from "@/components/SelectDropdown";
// import { registerUser } from "@/api/backend";
// import { router } from "expo-router";
// import { useSnackbar } from "@/context/SnackbarContext";
// import allergies from "@/data/allergies.json";
// import nationalities from "@/data/nationalities.json";
// import countryCodes from "@/data/countryCodes.json";
// import CustomButton from "@/components/CustomButton";
// import ThemedScrollContainer from "@/components/ThemedScrollContainer";
// registerTranslation("en", en);

// type FormData = {
// 	fname: string;
// 	lname: string;
// 	email: string;
// 	mobileNumber: string;
// 	birthDate: Date;
// 	gender: string;
// 	nationality: string;
// 	internationalCode: string;
// 	allergy: string;
// 	terms: boolean;
// };

// const REGEX = {
// 	name: /^[a-z ,.'-]+$/i,
// 	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
// 	mobileNumber: /^(0?5\d{8})$/i,
// };

// const ERROR_MESSAGES = {
// 	REQUIRED: "This Field Is Required",
// 	NAME_INVALID: "Not a Valid Name",
// 	EMAIL_INVALID: "Not a Valid Email",
// 	PHONE_INVALID: "Not a Valid UAE Phone Number",
// 	TERMS: "Terms Must Be Accepted To Continue",
// };

// const GENDERS = [
// 	{ _id: "M", value: "Male" },
// 	{ _id: "F", value: "Female" },
// ];

// const NATIONALITIES = nationalities;

// const ALLERGIES = allergies;

// const INTERNATIONAL_CODES = countryCodes;

// const Register = () => {
// 	const { showSnackbar } = useSnackbar();
// 	const [isLoading, setIsLoading] = useState(false);

// 	const {
// 		control,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm<FormData>();

// 	const onSubmit: SubmitHandler<FormData> = async (data) => {
// 		setIsLoading(true);
// 		const utcBirthDate = new Date(Date.UTC(data.birthDate.getFullYear(), data.birthDate.getMonth(), data.birthDate.getDate()));
// 		// Update the birthDate field in the data object
// 		data.birthDate = utcBirthDate; // Store in ISO string format
// 		const response = await registerUser(data);
// 		if (response.statusCode === 201) {
// 			setIsLoading(false);
// 			showSnackbar("Registration Successful");
// 			setTimeout(() => router.replace("/login"), 1000);
// 		} else if (response.statusCode === 209) {
// 			showSnackbar("User already exists!");
// 			setIsLoading(false);
// 		} else {
// 			showSnackbar("Network Error, please connect to the internet!");
// 			setIsLoading(false);
// 		}
// 	};

// 	return (
// 		<ThemedScrollContainer>
// 			<Text style={styles.title}>Register</Text>

// 			{/* First Name Field */}
// 			<Controller
// 				name='fname'
// 				control={control}
// 				render={({ field: { onChange, onBlur, value } }) => <TextInput label='First Name' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.fname} style={styles.input} left={<TextInput.Icon icon='account' />} />}
// 				rules={{
// 					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
// 					pattern: { message: ERROR_MESSAGES.NAME_INVALID, value: REGEX.name },
// 				}}
// 			/>
// 			{errors.fname && <HelperText type='error'>{errors.fname.message}</HelperText>}

// 			{/* Last Name Field */}
// 			<Controller
// 				name='lname'
// 				control={control}
// 				render={({ field: { onChange, onBlur, value } }) => <TextInput label='Last Name' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.lname} style={styles.input} left={<TextInput.Icon icon='account' />} />}
// 				rules={{
// 					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
// 					pattern: { message: ERROR_MESSAGES.NAME_INVALID, value: REGEX.name },
// 				}}
// 			/>
// 			{errors.lname && <HelperText type='error'>{errors.lname.message}</HelperText>}

// 			{/* Email Field */}
// 			<Controller
// 				name='email'
// 				control={control}
// 				render={({ field: { onChange, onBlur, value } }) => <TextInput label='Email' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.email} style={styles.input} placeholder='example@example.com' left={<TextInput.Icon icon='email' />} />}
// 				rules={{
// 					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
// 					pattern: { message: ERROR_MESSAGES.EMAIL_INVALID, value: REGEX.email },
// 				}}
// 			/>
// 			{errors.email && <HelperText type='error'>{errors.email.message}</HelperText>}

// 			<View style={styles.row}>
// 				{/* International Code Field */}
// 				<Controller defaultValue='+971' name='internationalCode' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Code' options={INTERNATIONAL_CODES} style={styles.internationalCode} value={value} onSelection={onChange} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />

// 				{/* Mobile Number Field */}
// 				<Controller
// 					name='mobileNumber'
// 					control={control}
// 					render={({ field: { onChange, onBlur, value } }) => <TextInput label='Mobile Number' placeholder='05XXXXXXXX' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.mobileNumber} style={styles.input} left={<TextInput.Icon icon='phone' />} />}
// 					rules={{
// 						required: { value: true, message: ERROR_MESSAGES.REQUIRED },
// 						pattern: { message: ERROR_MESSAGES.PHONE_INVALID, value: REGEX.mobileNumber },
// 					}}
// 				/>
// 			</View>
// 			{(errors.internationalCode || errors.mobileNumber) && <HelperText type='error'>{errors.internationalCode?.message || errors.mobileNumber?.message}</HelperText>}

// 			{/* Birthdate Field */}
// 			<Controller name='birthDate' control={control} render={({ field: { onChange, onBlur, value } }) => <DatePickerInput locale='en' label='Birth Date' value={value} onBlur={onBlur} error={!!errors.birthDate} onChange={onChange} inputMode='start' mode='outlined' style={styles.input} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
// 			{errors.birthDate && <HelperText type='error'>{errors.birthDate.message}</HelperText>}

// 			{/* Gender Field */}
// 			<Controller name='gender' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Gender' options={GENDERS} value={value} onSelection={onChange} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
// 			{errors.gender && <HelperText type='error'>{errors.gender.message}</HelperText>}

// 			{/* Nationality Field */}
// 			<Controller name='nationality' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Nationality' options={NATIONALITIES} value={value} onSelection={onChange} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
// 			{errors.nationality && <HelperText type='error'>{errors.nationality.message}</HelperText>}

// 			{/* Allergies Field */}
// 			<Controller defaultValue='' name='allergy' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Allergies (Leave empty for none)' options={ALLERGIES} value={value} onSelection={onChange} mode='outlined' multiEnable={true} />} rules={{}} />
// 			{errors.allergy && <HelperText type='error'>{errors.allergy.message}</HelperText>}

// 			{/* Terms and Conditions */}
// 			<Controller
// 				name='terms'
// 				defaultValue={false}
// 				control={control}
// 				render={({ field: { onChange, value } }) => <Checkbox.Item label='I agree to the terms and conditions' status={value ? "checked" : "unchecked"} onPress={() => onChange(!value)} />}
// 				rules={{
// 					validate: (value) => value === true || ERROR_MESSAGES.TERMS,
// 				}}
// 			/>
// 			{errors.terms && <HelperText type='error'>{errors.terms.message}</HelperText>}

// 			<CustomButton text='Register' onPress={handleSubmit(onSubmit)} style={{ width: "100%" }} />
// 			<ActivityIndicator animating={isLoading} hidesWhenStopped />
// 		</ThemedScrollContainer>
// 	);
// };

// export default Register;

// const styles = StyleSheet.create({
// 	title: {
// 		fontSize: 24,
// 		fontWeight: "bold",
// 		marginBottom: 20,
// 		textAlign: "center",
// 	},
// 	input: {
// 		flex: 5,
// 		marginBottom: 16,
// 	},
// 	internationalCode: {
// 		flex: 2,
// 		marginBottom: 16,
// 	},
// 	messageText: {
// 		textAlign: "center",
// 		marginTop: 10,
// 	},
// 	row: {
// 		flexDirection: "row",
// 		gap: 5,
// 	},
// });
