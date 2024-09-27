import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Button, TextInput, HelperText, Checkbox } from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { en, registerTranslation, DatePickerInput } from "react-native-paper-dates";
import SelectDropdown from "@/components/SelectDropdown";
import { registerUser } from "@/api/backend";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";
import { useSnackbar } from "@/context/SnackbarContext";
import allergies from "@/data/allergies.json";
import nationalities from "@/data/nationalities.json";
import CustomButton from "@/components/CustomButton";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
registerTranslation("en", en);

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

const REGEX = {
	name: /^[a-z ,.'-]+$/i,
	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	mobileNumber: /^05\d{8}$/i,
};

const ERROR_MESSAGES = {
	REQUIRED: "This Field Is Required",
	NAME_INVALID: "Not a Valid Name",
	EMAIL_INVALID: "Not a Valid Email",
	PHONE_INVALID: "Not a Valid UAE Phone Number",
	TERMS: "Terms Must Be Accepted To Continue",
};

const GENDERS = [
	{ _id: "M", value: "Male" },
	{ _id: "F", value: "Female" },
];

const NATIONALITIES = nationalities;

const ALLERGIES = allergies;

const Register = () => {
	const { showSnackbar } = useSnackbar();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log(data);
		const response = await registerUser(data);
		if (response.statusCode === 201) {
			showSnackbar("Registration Successful");
			setTimeout(() => router.replace("/login"), 1000);
		} else {
			showSnackbar("Network Error");
		}
	};

	return (
		<ThemedScrollContainer>
			{/* First Name Field */}
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

			{/* Last Name Field */}
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

			{/* Email Field */}
			<Controller
				name='email'
				control={control}
				render={({ field: { onChange, onBlur, value } }) => <TextInput label='Email' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.email} style={styles.input} placeholder='example@example.com' left={<TextInput.Icon icon='email' />} />}
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

			{/* International Code Field */}
			<Controller
				name='internationalCode'
				control={control}
				render={({ field: { onChange, onBlur, value } }) => <TextInput label='International Code' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.internationalCode} style={styles.input} left={<TextInput.Icon icon='earth' />} />}
				rules={{
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
				}}
			/>
			{errors.internationalCode && <HelperText type='error'>{errors.internationalCode.message}</HelperText>}

			{/* Birthdate Field */}
			<Controller name='birthdate' control={control} render={({ field: { onChange, onBlur, value } }) => <DatePickerInput locale='en' label='Birth Date' value={value} onBlur={onBlur} error={!!errors.birthdate} onChange={onChange} inputMode='start' mode='outlined' style={styles.input} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
			{errors.birthdate && <HelperText type='error'>{errors.birthdate.message}</HelperText>}

			{/* Gender Field */}
			<Controller name='gender' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Gender' options={GENDERS} value={value} onSelection={onChange} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
			{errors.gender && <HelperText type='error'>{errors.gender.message}</HelperText>}

			{/* Nationality Field */}
			<Controller name='nationality' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Nationality' options={NATIONALITIES} value={value} onSelection={onChange} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
			{errors.nationality && <HelperText type='error'>{errors.nationality.message}</HelperText>}

			{/* Allergies Field */}
			<Controller defaultValue='' name='allergy' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Allergies (Leave empty for none)' options={ALLERGIES} value={value} onSelection={onChange} mode='outlined' multiEnable={true} />} rules={{}} />
			{errors.allergy && <HelperText type='error'>{errors.allergy.message}</HelperText>}

			{/* Terms and Conditions */}
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

			<CustomButton text='Register' onPress={handleSubmit(onSubmit)} style={{ width: "100%" }} />
		</ThemedScrollContainer>
	);
};

export default Register;

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	input: {
		marginBottom: 16,
	},
	messageText: {
		textAlign: "center",
		marginTop: 10,
	},
});
