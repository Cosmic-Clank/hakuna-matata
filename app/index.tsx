import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Divider, Button } from "react-native-paper";
import { router, Redirect } from "expo-router";
import { healthCheck } from "@/api/backend";
import { useSession } from "@/context/AuthContext";
import { useSnackbar } from "@/context/SnackbarContext";
import { useTheme } from "react-native-paper";
import CustomButton from "@/components/CustomButton";

const Authentication = () => {
	const { session, isLoading } = useSession();
	const { showSnackbar } = useSnackbar(); // Snackbar for messages
	const theme = useTheme(); // Access theme colors

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size='large' color={theme.colors.primary} />
			</View>
		);
	}

	if (session) {
		return <Redirect href='/home' />;
	}

	return (
		<View style={styles.container}>
			{/* App Logo */}
			<Image source={require("../assets/images/logo-sticker.png")} style={styles.logo} />

			{/* Log In Button */}
			<CustomButton text='Log In' onPress={() => router.push("/login")} />

			{/* Divider */}
			<Divider style={styles.divider} />

			{/* Register Button */}
			<CustomButton text='Register' isOutlined onPress={() => router.push("/register")} />

			{/* Forgot Password Button */}

			{/* Backend Check Button */}
			{/* <TouchableOpacity
				style={[styles.button, { backgroundColor: theme.colors.primary }]}
				onPress={async () => {
					try {
						const response = await healthCheck();
						showSnackbar(`Backend is ${response.status ? "working" : "down"}`);
					} catch (error) {
						showSnackbar("Unable to connect to backend");
					}
				}}>
				<Text style={styles.buttonText}>Check Backend</Text>
			</TouchableOpacity> */}
		</View>
	);
};

export default Authentication;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#FFF", // White background
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	logo: {
		width: 150, // Set the width of your logo
		height: 150, // Set the height of your logo
		marginBottom: 40, // Add margin to push buttons below
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 30,
		color: "#333",
	},
	button: {
		width: "80%",
		paddingVertical: 12,
		borderRadius: 8,
		marginVertical: 10,
		alignItems: "center",
	},
	outlinedButton: {
		width: "80%",
		paddingVertical: 12,
		borderWidth: 2, // Border for the outline
		borderRadius: 8,
		marginVertical: 10,
		alignItems: "center",
	},
	divider: {
		width: "80%",
		marginVertical: 20,
	},
	buttonText: {
		color: "#FFF",
		fontSize: 16,
		fontWeight: "bold",
	},
});
