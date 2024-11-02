import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, Text, TextInput, HelperText, Checkbox, ActivityIndicator } from "react-native-paper";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { en, registerTranslation, DatePickerInput } from "react-native-paper-dates";
import SelectDropdown from "@/components/SelectDropdown";
import { registerUser, updateProfile } from "@/api/backend";
import { router } from "expo-router";
import { useSnackbar } from "@/context/SnackbarContext";
import allergies from "@/data/allergies.json";
import nationalities from "@/data/nationalities.json";
import countryCodes from "@/data/countryCodes.json";
import CustomButton from "@/components/CustomButton";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
import { useSession } from "@/context/AuthContext";
registerTranslation("en", en);

type FormData = {
	fname: string;
	lname: string;
	birthDate: Date;
	gender: string;
	allergy: string;
	mobileNumber: string;
};

const REGEX = {
	name: /^[a-z ,.'-]+$/i,
	email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
	mobileNumber: /^(0?5\d{8})$/i,
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

const EditProfile = () => {
	const { showSnackbar } = useSnackbar();
	const [isLoading, setIsLoading] = useState(false);
	const { session, signIn } = useSession();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log("sending data to update profile", data);

		setIsLoading(true);
		if (session) {
			try {
				const response = await updateProfile(session.id, data);
				if (response.statusCode === 200) {
					showSnackbar("Profile updated successfully");
					signIn({ ...session, ...data, birthDate: data.birthDate.toISOString() });
					router.replace("/home/profile");
				} else {
					showSnackbar("An error occurred while updating profile");
				}
			} catch (error) {
				showSnackbar("An network error occurred while updating, please try again");
			} finally {
				setIsLoading(false);
			}
		}
	};

	return (
		<ThemedScrollContainer>
			<Text style={styles.title}>Edit Profile</Text>

			{/* First Name Field */}
			<Controller
				name='fname'
				defaultValue={session?.fname ? session.fname : ""}
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
				defaultValue={session?.lname ? session.lname : ""}
				control={control}
				render={({ field: { onChange, onBlur, value } }) => <TextInput label='Last Name' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.lname} style={styles.input} left={<TextInput.Icon icon='account' />} />}
				rules={{
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
					pattern: { message: ERROR_MESSAGES.NAME_INVALID, value: REGEX.name },
				}}
			/>
			{errors.lname && <HelperText type='error'>{errors.lname.message}</HelperText>}

			{/* Birthdate Field */}
			<Controller name='birthDate' control={control} defaultValue={session?.birthDate ? new Date(session.birthDate) : new Date()} render={({ field: { onChange, onBlur, value } }) => <DatePickerInput locale='en' label='Birth Date' value={value} onBlur={onBlur} error={!!errors.birthDate} onChange={onChange} inputMode='start' mode='outlined' style={styles.input} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
			{errors.birthDate && <HelperText type='error'>{errors.birthDate.message}</HelperText>}

			{/* Gender Field */}
			<Controller name='gender' defaultValue={session?.gender} control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Gender' options={GENDERS} value={value} onSelection={onChange} />} rules={{ required: { value: true, message: ERROR_MESSAGES.REQUIRED } }} />
			{errors.gender && <HelperText type='error'>{errors.gender.message}</HelperText>}

			{/* Allergies Field */}
			<Controller defaultValue={session?.allergy} name='allergy' control={control} render={({ field: { onChange, value } }) => <SelectDropdown label='Allergies (Leave empty for none)' options={ALLERGIES} value={value} onSelection={onChange} mode='outlined' multiEnable={true} defaultValue={session?.allergy ? ALLERGIES.filter((allergy) => session.allergy.split(", ").includes(allergy.value)) : []} />} rules={{}} />
			{errors.allergy && <HelperText type='error'>{errors.allergy.message}</HelperText>}

			{/* Mobile Field */}
			<Controller
				name='mobileNumber'
				defaultValue={session?.mobileNumber ? session.mobileNumber : ""}
				control={control}
				render={({ field: { onChange, onBlur, value } }) => <TextInput label='Mobile Number' mode='outlined' onBlur={onBlur} onChangeText={onChange} value={value} error={!!errors.mobileNumber} style={styles.input} left={<TextInput.Icon icon='phone' />} />}
				rules={{
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
					pattern: { message: ERROR_MESSAGES.PHONE_INVALID, value: REGEX.mobileNumber },
				}}
			/>
			{errors.mobileNumber && <HelperText type='error'>{errors.mobileNumber.message}</HelperText>}

			<CustomButton text='Save' onPress={handleSubmit(onSubmit)} style={{ width: "100%" }} />
			<ActivityIndicator animating={isLoading} hidesWhenStopped />
		</ThemedScrollContainer>
	);
};

export default EditProfile;

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
