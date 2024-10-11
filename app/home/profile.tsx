import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Avatar, List, Divider, useTheme, Text, IconButton, ActivityIndicator } from "react-native-paper";
import { useSession } from "@/context/AuthContext"; // Assuming you get user data from session
import NATIONALITIES from "@/data/nationalities.json"; // Import list of nationalities
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
import CustomButton from "@/components/CustomButton";
import { updateUserAllergies, updateUserBirthDate } from "@/api/backend";
import { useSnackbar } from "@/context/SnackbarContext";
import { router } from "expo-router";

const Profile = () => {
	const { session, isLoading, signIn } = useSession(); // Fetch user data and loading state
	const theme = useTheme(); // Access theme colors
	const { showSnackbar } = useSnackbar(); // Access snackbar context
	const [madeChanges, setMadeChanges] = React.useState(false); // State to track changes
	const [birthDate, setBirthDate] = useState(session?.birthDate ? new Date(session.birthDate) : new Date()); // State to store date
	const [allergies, setAllergies] = useState(session?.allergy || ""); // State to store allergies
	const [nationality, setNationality] = useState(session?.nationality || ""); // State to store
	const [showActivityIndicator, setShowActivityIndicator] = useState(false); // State to show activity indicator

	// Show loading spinner if session is still loading
	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color={theme.colors.primary} />
				<Text>Loading profile...</Text>
			</View>
		);
	}

	// Fallback if session is not available
	if (!session) {
		return (
			<View style={styles.loadingContainer}>
				<Text>No user data available</Text>
			</View>
		);
	}

	const edit = () => {
		router.navigate("/edit");
	};

	const saveChanges = async () => {
		// Implement your save changes logic here
		setShowActivityIndicator(true);
		try {
			// Call API to update user allergies
			await updateUserAllergies(session.id, allergies);
			signIn({ ...session, allergy: allergies });
			showSnackbar("Changes saved successfully");
			setMadeChanges(false);
		} catch (error) {
			console.error(error);
			showSnackbar("An error occurred while saving allergies");
		}
		try {
			const dateString = birthDate.toLocaleDateString();
			const [month, day, year] = dateString.split("/"); // Split the string into month, day, and year
			const dateObject = new Date(Number(year), Number(month) - 1, Number(day));
			await updateUserBirthDate(session.id, dateObject.toISOString());
			signIn({ ...session, birthDate: dateObject.toISOString() });
			showSnackbar("Changes saved successfully");
			setMadeChanges(false);
		} catch (error) {
			console.error(error);
			showSnackbar("An error occurred while saving Birthdate");
		}
		setShowActivityIndicator(false);
	};
	// Function to handle edit actions
	const handleNationalityChange = (value: string) => {
		setMadeChanges(true);
		setNationality(value);
		console.log("Nationality changed to", value);
	};

	const handleAllergyChange = (value: string) => {
		setMadeChanges(true);
		setAllergies(value);
		console.log("Allergy changed to", value);
	};

	const handleDateChange = (date: Date | undefined) => {
		setMadeChanges(true);
		setBirthDate(date || new Date());
		console.log("Date changed to", date);
	};

	return (
		<ThemedScrollContainer style={styles.container}>
			{/* Avatar */}
			<View style={styles.avatarContainer}>
				<Avatar.Icon size={80} icon='account' />
				<Text style={styles.name}>
					{session.fname} {session.lname}
				</Text>
			</View>

			{/* User Information */}
			<Divider style={styles.divider} />
			<List.Section>
				<List.Item title='Email' description={session.email} left={() => <List.Icon icon='email' />} />
				<Divider />
				<List.Item title='Mobile Number' description={session.mobileNumber} left={() => <List.Icon icon='phone' />} />
				<Divider />
				<List.Item title='Nationality' description={NATIONALITIES.filter((item) => item._id === session.nationality)[0]?.value} left={() => <List.Icon icon='earth' />} />
				<Divider />
				<List.Item title='Allergies' description={session.allergy} left={() => <List.Icon icon='allergy' />} />
				<Divider />
				<List.Item title='Gender' description={session.gender} left={() => <List.Icon icon='account' />} />
				<Divider />
				<List.Item title='Birthdate' description={new Date(session.birthDate).toDateString()} left={() => <List.Icon icon='cake' />} />
				{/* <SelectDropdown label='Allergies (Leave empty for none)' options={ALLERGIES} value={allergies} onSelection={handleAllergyChange} mode='outlined' multiEnable={true} />
				<Divider />
				{/* {<Text>{JSON.stringify(session)}</Text>} */}
				<Divider />
			</List.Section>
			<CustomButton style={styles.button} text='Edit' onPress={edit} />
		</ThemedScrollContainer>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
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
	button: {
		width: "100%",
		marginTop: 20,
	},
});
