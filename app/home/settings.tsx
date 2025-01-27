import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Surface, Text, List, Divider, Switch, Dialog, Portal, Paragraph, Avatar } from "react-native-paper";
import { router } from "expo-router";
import { useSession } from "@/context/AuthContext";
import { useTheme } from "react-native-paper";
import ThemedScrollContainer from "@/components/ThemedScrollContainer";
import { useThemeContext } from "@/context/ThemeContext";
import DeleteDataButton from "@/components/DeleteDataButton";

const Settings = () => {
	const { session, signOut } = useSession();
	const { isDarkTheme, toggleTheme } = useThemeContext(); // For dark theme toggle
	const [notificationsEnabled, setNotificationsEnabled] = useState(true); // For notifications toggle
	const [signOutVisible, setSignOutVisible] = useState(false); // For the sign-out confirmation dialog

	const toggleNotifications = () => setNotificationsEnabled(!notificationsEnabled);

	const showSignOutDialog = () => setSignOutVisible(true);
	const hideSignOutDialog = () => setSignOutVisible(false);

	const confirmSignOut = () => {
		hideSignOutDialog();
		signOut();
		router.replace("/");
	};

	return (
		<ThemedScrollContainer style={styles.container}>
			{/* Profile Section */}
			<Surface style={styles.profileSection}>
				<Avatar.Icon size={80} icon='account' />
				<Text style={styles.profileText}>Hello, {session?.CUST_FNAME || "User"}</Text>
				<Button mode='outlined' onPress={() => router.navigate("/home/profile")} style={styles.profileButton}>
					View Profile
				</Button>
			</Surface>

			<Divider style={styles.divider} />

			{/* Settings Options */}
			<List.Section>
				<List.Item title='Dark Theme' description='Enable dark mode' left={() => <List.Icon icon='theme-light-dark' />} right={() => <Switch value={isDarkTheme} onValueChange={toggleTheme} />} />
				<Divider />
				<List.Item title='Notifications' description='Enable or disable notifications' left={() => <List.Icon icon='bell' />} right={() => <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />} />
				<Divider />
				<List.Item title='App Info' description='SEJJELAT Business Solutions L.L.C | Dubai | UAE' left={() => <List.Icon icon='information-outline' />} />
				<Divider />
			</List.Section>

			{/* Sign-out Section */}
			<Button mode='contained' onPress={showSignOutDialog} style={styles.signOutButton}>
				Sign Out
			</Button>
			<DeleteDataButton />

			{/* Confirmation Dialog */}
			<Portal>
				<Dialog visible={signOutVisible} onDismiss={hideSignOutDialog}>
					<Dialog.Title>Confirm Sign Out</Dialog.Title>
					<Dialog.Content>
						<Paragraph>Are you sure you want to sign out?</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideSignOutDialog}>Cancel</Button>
						<Button onPress={confirmSignOut}>Sign Out</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</ThemedScrollContainer>
	);
};

export default Settings;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	profileSection: {
		padding: 16,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 16,
	},
	profileText: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 8,
	},
	profileButton: {
		marginTop: 8,
	},
	divider: {
		marginVertical: 10,
	},
	signOutButton: {
		marginTop: 16,
		backgroundColor: "#c82333", // A nice red for sign-out
	},
});
