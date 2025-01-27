import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Portal, Dialog, Button, Text, TextInput, HelperText } from "react-native-paper";
import { DatePickerInput } from "react-native-paper-dates";
import SelectDropdown from "@/components/SelectDropdown";
import allergies from "@/data/allergies.json";
import nationalities from "@/data/nationalities.json";
import { useForm, Controller } from "react-hook-form";

interface EditDialogProps {
	visible: boolean;
	onDismiss: () => void;
	fieldName: string;
	fieldKey: string;
	currentValue: any;
	onSave: (value: any) => void;
}

const GENDERS = [
	{ _id: "M", value: "Male" },
	{ _id: "F", value: "Female" },
];

const REGEX = {
	mobileNumber: /^(0?5\d{8})$/i,
};

const ERROR_MESSAGES = {
	REQUIRED: "This Field Is Required",
	INVALID_PHONE: "Invalid UAE Phone Number",
	INVALID_NAME: "Invalid Name",
};

const EditDialog: React.FC<EditDialogProps> = ({ visible, onDismiss, fieldName, fieldKey, currentValue, onSave }) => {
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue: setFormValue,
		reset,
	} = useForm({
		defaultValues: {
			input: currentValue || "",
		},
	});

	// Reset value when dialog is opened
	useEffect(() => {
		if (visible) {
			reset({ input: currentValue || "" });
		}
	}, [visible, currentValue, reset]);

	// Handle Save
	const onSubmit = (data: any) => {
		onSave(data.input);
		onDismiss();
	};

	// Dynamic Validation Rules
	const getValidationRules = () => {
		switch (fieldKey) {
			case "CUST_MobileNo":
				return {
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
					pattern: { value: REGEX.mobileNumber, message: ERROR_MESSAGES.INVALID_PHONE },
				};
			case "CUST_FNAME":
			case "CUST_LNAME":
				return {
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
					pattern: { value: /^[A-Za-z\s]+$/, message: ERROR_MESSAGES.INVALID_NAME },
				};
			case "CUST_BIRTHDATE":
				return {
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
				};
			default:
				return {
					required: { value: true, message: ERROR_MESSAGES.REQUIRED },
				};
		}
	};

	// Render input based on the field type
	const renderInputField = () => {
		switch (fieldKey) {
			case "CUST_ALERGY":
				return (
					<Controller
						control={control}
						name='input'
						rules={getValidationRules()}
						render={({ field: { onChange, value } }) => (
							<>
								<SelectDropdown
									label='Select Allergies'
									options={allergies}
									value={value}
									onSelection={(selected) => {
										onChange(selected);
										setFormValue("input", selected);
									}}
									multiEnable={true}
								/>
								{errors.input && <HelperText type='error'>{String(errors.input.message)}</HelperText>}
							</>
						)}
					/>
				);
			case "CUST_NATIONALITY":
				return (
					<Controller
						control={control}
						name='input'
						rules={getValidationRules()}
						render={({ field: { onChange, value } }) => (
							<>
								<SelectDropdown
									label='Select Nationality'
									options={nationalities}
									value={value}
									onSelection={(selected) => {
										onChange(selected);
										setFormValue("input", selected);
									}}
								/>
								{errors.input && <HelperText type='error'>{String(errors.input.message)}</HelperText>}
							</>
						)}
					/>
				);
			case "CUST_GENDER":
				return (
					<Controller
						control={control}
						name='input'
						rules={{
							required: { value: true, message: ERROR_MESSAGES.REQUIRED },
						}}
						render={({ field: { onChange, value } }) => (
							<>
								<SelectDropdown
									label='Gender'
									options={GENDERS}
									value={value}
									onSelection={(selected) => {
										onChange(selected);
										setFormValue("input", selected);
									}}
								/>
								{errors.input && <HelperText type='error'>{String(errors.input.message)}</HelperText>}
							</>
						)}
					/>
				);

			case "CUST_BIRTHDATE":
				return (
					<Controller
						control={control}
						name='input'
						rules={getValidationRules()}
						render={({ field: { onChange, value } }) => (
							<>
								<View style={styles.dateContainer}>
									<DatePickerInput
										locale='en'
										label='Birth Date'
										value={value ? new Date(value) : new Date()}
										onChange={(date) => {
											onChange(date?.toISOString());
											setFormValue("input", date?.toISOString());
										}}
										mode='outlined'
										style={styles.datePicker}
										inputMode={"end"}
									/>
								</View>
								{errors.input && <HelperText type='error'>{String(errors.input.message)}</HelperText>}
							</>
						)}
					/>
				);
			default:
				return (
					<Controller
						control={control}
						name='input'
						rules={getValidationRules()}
						render={({ field: { onChange, value } }) => (
							<>
								<TextInput
									label={`Enter ${fieldName}`}
									value={value}
									onChangeText={(text) => {
										onChange(text);
										setFormValue("input", text);
									}}
									mode='outlined'
									style={styles.input}
									error={!!errors.input}
								/>
								{errors.input && <HelperText type='error'>{String(errors.input.message)}</HelperText>}
							</>
						)}
					/>
				);
		}
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Edit {fieldName}</Dialog.Title>
				<Dialog.Content>{renderInputField()}</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={onDismiss}>Cancel</Button>
					<Button mode='contained' onPress={handleSubmit(onSubmit)}>
						Save
					</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
};

export default EditDialog;

const styles = StyleSheet.create({
	input: {
		marginVertical: 20,
	},
	dateContainer: {
		paddingVertical: 20,
	},
	datePicker: {
		width: "100%",
		marginBottom: 10,
	},
});
