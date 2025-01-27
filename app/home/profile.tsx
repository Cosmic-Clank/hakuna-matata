import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, List, Divider, useTheme, Text, IconButton, Card } from "react-native-paper";
import { useSession } from "@/context/AuthContext";
import NATIONALITIES from "@/data/nationalities.json";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
import EditDialog from "@/components/EditDialog";
import { updateProfile } from "@/api/backend";
import { useSnackbar } from "@/context/SnackbarContext";
import { Link } from "expo-router";

const Profile = () => {
	const { session, signIn } = useSession();
	const theme = useTheme();

	const [dialogVisible, setDialogVisible] = useState(false);
	const [selectedField, setSelectedField] = useState("");
	const [selectedKey, setSelectedKey] = useState("");
	const [selectedValue, setSelectedValue] = useState("");
	const { showSnackbar } = useSnackbar(); // Use the snackbar from context

	// Handle edit button press
	const handleEdit = (field: string, key: string, value: any) => {
		setSelectedField(field);
		setSelectedKey(key);
		setSelectedValue(value);
		setDialogVisible(true);
	};

	// Utility function to check if a field is null
	const isEditable = (value: any) => value === null || value === "";

	const getLocalDateFormatted = (dateString: string | undefined) => {
		const date = new Date(dateString || "");

		const options: Intl.DateTimeFormatOptions = {
			timeZone: "Asia/Dubai", // Adjust for desired timezone (UTC+4)
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		};

		const localDate = date.toLocaleDateString("en-CA", options); // en-CA gives yyyy-mm-dd format
		return localDate;
	};

	const onSave = async (newValue: string) => {
		if (selectedKey === "CUST_BIRTHDATE") {
			newValue = getLocalDateFormatted(newValue);
		}
		const response = await updateProfile(session.CUST_CODE, { selectedKey, newValue });
		if (response.statusCode === 200) {
			// Update the session data
			const updatedSession = { ...session, [selectedKey]: newValue };
			signIn(updatedSession);
			showSnackbar("Profile Updated Successfully");
		} else {
			showSnackbar("Failed to update profile");
		}
	};

	return (
		<>
			<ThemedScrollContainer style={styles.container}>
				{/* Avatar and User Info */}
				<View style={styles.avatarContainer}>
					<Avatar.Icon size={80} icon='account' />
					<Text style={styles.name}>
						{session?.CUST_FNAME} {session?.CUST_LNAME}
					</Text>
				</View>

				{/* User Information Section */}
				<Divider style={styles.divider} />
				<List.Section>
					<List.Item title='Mobile Number' description={session?.CUST_MobileNo || "Not Provided"} left={() => <List.Icon icon='phone' />} right={() => isEditable(session?.CUST_MobileNo) && <IconButton icon='pencil' onPress={() => handleEdit("Mobile Number", "CUST_MobileNo", session?.CUST_MobileNo)} />} />
					<Divider />

					<List.Item title='Nationality' description={session?.CUST_NATIONALITY || "Not Provided"} left={() => <List.Icon icon='earth' />} right={() => isEditable(session?.CUST_NATIONALITY) && <IconButton icon='pencil' onPress={() => handleEdit("Nationality", "CUST_NATIONALITY", session?.CUST_NATIONALITY)} />} />
					<Divider />

					<List.Item title='Allergies' description={session?.CUST_ALERGY || "None"} left={() => <List.Icon icon='allergy' />} right={() => isEditable(session?.CUST_ALERGY) && <IconButton icon='pencil' onPress={() => handleEdit("Allergies", "CUST_ALERGY", session?.CUST_ALERGY)} />} />
					<Divider />

					<List.Item title='Gender' description={session?.CUST_GENDER || "Not Provided"} left={() => <List.Icon icon='account' />} right={() => isEditable(session?.CUST_GENDER) && <IconButton icon='pencil' onPress={() => handleEdit("Gender", "CUST_GENDER", session?.CUST_GENDER)} />} />
					<Divider />

					<List.Item title='Birthdate' description={session?.CUST_BIRTHDATE ? new Date(session.CUST_BIRTHDATE).toDateString() : "Not Provided"} left={() => <List.Icon icon='cake' />} right={() => isEditable(session?.CUST_BIRTHDATE) && <IconButton icon='pencil' onPress={() => handleEdit("Birthdate", "CUST_BIRTHDATE", session?.CUST_BIRTHDATE)} />} />
					<Divider />
				</List.Section>

				{/* Info Box - Cannot Edit After Submission */}
				<Card style={styles.infoCard}>
					<Card.Content>
						<Text style={styles.infoText}>
							⚠️ Please note that once the data is submitted, it cannot be edited. Ensure all information is correct before saving. If you would like to delete your data, please erase data from settings. For more information contact us{" "}
							<Link href='https://sejjelat.com/Home/Contact' style={{ textDecorationLine: "underline", fontWeight: "bold" }}>
								HERE
							</Link>
							.
						</Text>
					</Card.Content>
				</Card>
			</ThemedScrollContainer>

			{/* Edit Dialog */}
			<EditDialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} fieldName={selectedField} fieldKey={selectedKey} currentValue={selectedValue} onSave={onSave} />
		</>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	avatarContainer: {
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 20,
	},
	name: {
		fontSize: 24,
		fontWeight: "bold",
		marginTop: 10,
	},
	divider: {
		marginVertical: 10,
	},
	infoCard: {
		marginTop: 20,
		marginHorizontal: 16,
		backgroundColor: "#fff8e1", // Light yellow for attention
		borderRadius: 8,
		elevation: 2,
	},
	infoText: {
		fontSize: 14,
		color: "#d84315", // Orange-red to signify caution
		textAlign: "center",
	},
});
