import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";
import { Avatar, List, Divider, useTheme, Text } from "react-native-paper";
import { useSession } from "@/context/AuthContext"; // Assuming you get user data from session
import nationalities from "@/data/nationalities.json"; // Import list of nationalities
import ThemedScrollContainer from "@/components/ThemedScrollContainer";

const Profile = () => {
	const { session, isLoading } = useSession(); // Fetch user data and loading state
	const theme = useTheme(); // Access theme colors

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

	// Destructure user data from session
	const { fname, lname, email, mobileNumber, nationality, allergy, birthDate } = session;

	return (
		<ThemedScrollContainer style={styles.container}>
			{/* Avatar */}
			<View style={styles.avatarContainer}>
				<Avatar.Icon size={80} icon='account' />
				<Text style={styles.name}>
					{fname} {lname}
				</Text>
			</View>

			{/* User Information */}
			<Divider style={styles.divider} />
			<List.Section>
				<List.Item title='Mobile Number' description={email} left={() => <List.Icon icon='email' />} />
				<Divider />
				<List.Item title='Mobile Number' description={mobileNumber} left={() => <List.Icon icon='phone' />} />
				<Divider />
				<List.Item title='Nationality' description={nationalities.find((item) => item._id === "8")?.value} left={() => <List.Icon icon='flag' />} />
				<Divider />
				<List.Item title='Allergies' description={allergy === "" ? "None" : allergy} left={() => <List.Icon icon='alert-circle' />} />
				<Divider />
				<List.Item title='Birthdate' description={new Date(birthDate).toLocaleDateString()} left={() => <List.Icon icon='calendar' />} />
				<Divider />
			</List.Section>
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
});
