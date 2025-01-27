import { deleteUser } from "@/api/backend";
import { useSession } from "@/context/AuthContext";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

const Settings = () => {
	const [deleteVisible, setDeleteVisible] = useState(false);

	const { session, signOut } = useSession();

	const showDeleteDialog = () => setDeleteVisible(true);
	const hideDeleteDialog = () => setDeleteVisible(false);

	const confirmDelete = async () => {
		// Logic to handle data deletion
		const response = await deleteUser(session.CUST_CODE);
		if (response.statusCode === 200) {
			console.log("All data deleted.");
			hideDeleteDialog();
			signOut();
			router.replace("/");
		} else {
			console.error("Error deleting data:", response);
		}
	};

	return (
		<>
			<Button mode='contained' onPress={showDeleteDialog} style={styles.deleteButton}>
				Delete All Data
			</Button>

			<Portal>
				<Dialog visible={deleteVisible} onDismiss={hideDeleteDialog}>
					<Dialog.Title>ℹ️ Confirm Deletion</Dialog.Title>
					<Dialog.Content>
						<Paragraph>If you proceed, all data will be permanently removed and your account cannot be recreated. Are you sure you want to continue?</Paragraph>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={hideDeleteDialog}>Cancel</Button>
						<Button onPress={confirmDelete}>Delete</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</>
	);
};

export default Settings;

const styles = StyleSheet.create({
	deleteButton: {
		marginTop: 16,
		backgroundColor: "#c82333", // A deep red to indicate danger
	},
});
