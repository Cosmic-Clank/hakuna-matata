import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Surface, Text, IconButton } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { router } from "expo-router";

export default function SurfaceIcons() {
	const theme = useTheme(); // Get the current theme colors

	return (
		<View style={styles.surfaceContainer}>
			<Surface style={styles.surface}>
				<TouchableOpacity style={styles.touchable} onPress={() => router.navigate("/home/qrcode")}>
					<IconButton icon='qrcode-scan' size={40} iconColor={theme.colors.primary} />
					<Text style={styles.surfaceText}>QR Code</Text>
				</TouchableOpacity>
			</Surface>

			<Surface style={styles.surface}>
				<TouchableOpacity style={styles.touchable} onPress={() => router.navigate("/home/profile")}>
					<IconButton icon='account' size={40} iconColor={theme.colors.primary} />
					<Text style={styles.surfaceText}>Profile</Text>
				</TouchableOpacity>
			</Surface>

			<Surface style={styles.surface}>
				<TouchableOpacity style={styles.touchable} onPress={() => router.navigate("/home/settings")}>
					<IconButton icon='cog' size={40} iconColor={theme.colors.primary} />
					<Text style={styles.surfaceText}>Settings</Text>
				</TouchableOpacity>
			</Surface>
		</View>
	);
}

const styles = StyleSheet.create({
	surfaceContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		paddingHorizontal: 20,
		marginTop: 20,
	},
	surface: {
		alignItems: "center",
		justifyContent: "center",
		elevation: 4, // Elevation for shadow
		borderRadius: 10,
		width: 100, // Adjust surface size
		height: 100,
	},
	touchable: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	surfaceText: {
		marginTop: 8,
		fontSize: 14,
		opacity: 0.8,
		textAlign: "center",
	},
});
